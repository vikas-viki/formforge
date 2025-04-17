import { prisma } from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/library/constatns";
import { redirect } from "next/navigation";
import { ApplicationName, NewApplicationBody, StatusUpdateBody } from "@/app/library/types";

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
        return new NextResponse(null, { status: 500 });
    }
}

// must be admin
export async function PATCH(req: NextRequest) {
    try {
        const body = (await req.json()) as StatusUpdateBody;

        await prisma.application.update({
            where: {
                applicationId: body.applicationId
            },
            data: {
                status: body.status
            }
        });

        // add certificate generation here.

        return new NextResponse("status updated", { status: 200 });
    } catch (e: any) {
        return new NextResponse(null, { status: 500 });
    }
}