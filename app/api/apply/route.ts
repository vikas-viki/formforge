import { prisma } from "@/db";
import { ApplicationType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "up & running" });
}

type Body = {
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

    const body: Body = await req.json();

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