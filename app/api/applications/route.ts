import puppeteer from 'puppeteer';
import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/library/constatns";
import { redirect } from "next/navigation";
import { ApplicationsResponse, NewApplicationBody, Status, StatusUpdateBody } from "@/app/library/types";
import path from "path"
import fs from "fs";
import { UPLOAD_OBJECT } from "../library/objectStore";
import { ApplicationType, Profile } from ".prisma/client";

// must be authenticated
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            redirect("/login");
        }

        const selection = {
            type: true,
            createdAt: true,
            status: true,
            applicationId: true,
            updatedAt: true,
            reason: true,
            user: {
                select: {
                    createdAt: false,
                    name: false,
                    password: false,
                    type: false,
                    userId: false,
                    profile: true
                },

            }
        };

        var applications: ApplicationsResponse = [];
        if (session.user.type == "USER") {
            applications = await prisma.application.findMany({
                where: {
                    userId: session.user.id
                },
                select: selection
            }) as ApplicationsResponse;
        } else {
            applications = await prisma.application.findMany({
                select: selection
            }) as ApplicationsResponse;
        }

        applications = applications.map(a => {
            a.details = {
                ...a.user?.profile!,
                reason: a.reason || ""
            };
            a.details!.userId = "";
            delete a.user;
            return a;
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

        await prisma.application.create({
            data: {
                userId,
                type,
                reason: body.reason
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
                user: true
            }
        });

        const profile = await prisma.profile.findFirst({
            where: {
                userId: details.userId
            }
        })

        if (details && body.status == Status.approved)
            await generateCertificate(profile as Profile, details.createdAt, details.type, details.applicationId);

        return new NextResponse("status updated", { status: 200 });
    } catch (e: any) {
        console.log(e);
        return new NextResponse(null, { status: 500 });
    }
}

async function generateCertificate(details: Profile, createdAt: Date, type: ApplicationType, applicationId: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let template;
    if (type == ApplicationType.TRANSFER_CERTIFICATE) {
        template = "TC.html";
    } else if (type == ApplicationType.CONDUCT_CERTIFICATE) {
        template = "CONDUCT.html";
    } else if (type == ApplicationType.NO_DUES_CERTIFICATE) {
        template = "DUES.html";
    } else if (type == ApplicationType.COURSE_CERTIFICATE) {
        template = "COURSE.html";
    } else if (type == ApplicationType.STUDY_CERTIFICATE) {
        template = "STUDY.html";
    }
    
    const html = fs.readFileSync(path.join(process.cwd(), `public/templates/${template}`), "utf-8");

    await page.setContent(
        html,
        {
            waitUntil: "networkidle0"
        }
    );

    await page.evaluate((details, createdAt) => {
        const elements: any = {
            name: details.name,
            gender: details.gender,
            religion: details.religion,
            scst: details.scst,
            father_name: details.fatherName,
            mother_name: details.motherName,
            dob: new Date(details.dateOfBirth!).toLocaleDateString(),
            date_of_admission: new Date(details.dateOfAdmission!).toLocaleDateString(),
            date_of_leaving: new Date(details.dateOfLeaving!).toLocaleDateString(),
            course: details.course,
            tc_application_date: new Date(createdAt).toLocaleDateString(),
            tc_issue_date: new Date().toLocaleDateString(),
            relationship: "",
            time_period: `${details.dateOfAdmission}-${details.dateOfLeaving ? new Date(details.dateOfLeaving).getFullYear() : "N/A"}`
        }

        if (details.gender == "Male") {
            elements.relationship = " S/o ";
        } else {
            elements.relationship == " D/o "
        }

        Object.entries(elements).forEach(([id, val]) => {
            let ele = document.getElementById(id);
            if (ele && val) {
                ele.innerText = val.toString();
            }
        })
    }, details, createdAt);

    const pdfBytes = await page.pdf({
        // path: path.join(process.cwd(), "public/templates/TC_output.pdf"),
        format: "A4",
        printBackground: true
    });

    await browser.close();

    await UPLOAD_OBJECT(applicationId, pdfBytes);
}