import puppeteer from 'puppeteer';
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/library/constatns";
import { redirect } from "next/navigation";
import { ApplicationName, NewApplicationBody, StatusUpdateBody } from "@/app/library/types";
import path from "path"
import fs from "fs";
import { UPLOAD_OBJECT } from "../library/objectStore";
import { ApplicationDetails, ApplicationType } from ".prisma/client";

// must be authenticated
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            redirect("/login");
        }

        var applications = [];
        if (session.user.type == "USER") {
            applications = await prisma.application.findMany({
                where: {
                    userId: session.user.id
                },
                include: {
                    details: true
                }
            });
        } else {
            applications = await prisma.application.findMany({
                include: {
                    details: true
                }
            });
        }
        const structuredApplications = [];
        applications.forEach(a => {
            structuredApplications.push({
                name: ApplicationName[a.type],
                date: (new Date(a.createdAt)),
                type: a.type,
                status: a.status,
                details: {
                    ...a.details
                }
            })
        })

        return NextResponse.json({ applications });
    } catch (e: any) {
        return new NextResponse(null, { status: 500 });
    }
}

// must be authenticated
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!req.body || !session || !session.user.id) return;
        const body: NewApplicationBody = await req.json();

        const userId = session.user.id;
        const type = body.type;
        const details = body.details;

        if (details.passingYear)
            details.passingYear = Number(details.passingYear);

        const application = await prisma.application.create({
            data: {
                userId,
                type
            }
        })

        const applicationDetails = await prisma.applicationDetails.create({
            data: {
                ...details,
                applicationId: application.applicationId
            }
        })

        await prisma.application.update({
            where: {
                applicationId: application.applicationId
            },
            data: {
                details: {
                    connect: applicationDetails
                }
            }
        })

        return NextResponse.json(await prisma.user.findMany(), { status: 200 });
    } catch (e: any) {
        console.log(e)
        return new NextResponse(null, { status: 500 });
    }
}

// must be admin
export async function PATCH(req: NextRequest) {
    try {
        const body = (await req.json()) as StatusUpdateBody;

        const details = await prisma.application.update({
            where: {
                applicationId: body.applicationId
            },
            data: {
                status: body.status
            },
            include: {
                details: true
            }
        });

        if (details)
            await generateCertificate(details.details as ApplicationDetails, details.createdAt, details.type);

        return new NextResponse("status updated", { status: 200 });
    } catch (e: any) {
        console.log(e);
        return new NextResponse(null, { status: 500 });
    }
}

async function generateCertificate(details: ApplicationDetails, createdAt: Date, type: ApplicationType) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const html = fs.readFileSync(path.join(process.cwd(), "public/templates/TC.html"), "utf-8");

    await page.setContent(
        html,
        {
            waitUntil: "networkidle0"
        }
    );

    await page.evaluate((details, createdAt) => {
        const elements = {
            name: details.name,
            gender: details.gender,
            religion: details.religion,
            scst: details.scst,
            father_name: details.fatherName,
            mother_name: details.motherName,
            dob: details.dateOfBirth,
            date_of_admission: details.dateOfAdmission,
            date_of_leaving: details.dateOfLeaving,
            course: details.course,
            tc_application_date: new Date(createdAt).toLocaleDateString(),
            tc_issue_date: new Date().toLocaleDateString()
        }

        Object.entries(elements).forEach(([id, val])=> {
            let ele = document.getElementById(id);
            if(ele && val){
                ele.innerText = val.toString();
            }
        })
    }, details, createdAt);

    const pdfBytes = await page.pdf({
        path: path.join(process.cwd(), "public/templates/TC_output.pdf"),
        format: "A4",
        printBackground: true
    });

    await browser.close();

    await UPLOAD_OBJECT(details.applicationId, pdfBytes);
}