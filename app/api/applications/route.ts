import { prisma } from "@/db";
import { ApplicationType, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { ApplicationName } from "@/app/library/types";

export async function GET() {
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
}

type NewApplicationBody = {
    userId: string;
    type: ApplicationType,
    details: {
        name: string,
        rollNo: string,
        course: string,
        semister: string,
        reason: string
    }
}
export async function POST(req: NextRequest) {
    if (!req.body) return;

    const body: NewApplicationBody = await req.json();

    const userId = body.userId;
    const type = body.type;
    const details = body.details;


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
}

type StatusUpdateBody = {
    applicationId: string,
    status: Status
}

export async function PATCH(req: NextRequest) {
    console.log("update req");
    const body = (await req.json()) as StatusUpdateBody;


    await prisma.application.update({
        where: {
            applicationId: body.applicationId
        },
        data: {
            status: body.status
        }
    });

    return new NextResponse("status updated", { status: 200 });
}