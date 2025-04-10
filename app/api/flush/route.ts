import { prisma } from "@/db";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = new URL(req.url);
    const type = searchParams.searchParams.get("type");

    if (type == "pending") {
        const pendingApplications = await prisma.application.findMany({
            where: {
                status: Status.PENDING
            }
        });

        await prisma.applicationDetails.deleteMany({
            where: {
                applicationId: {
                    in: pendingApplications.map(p => p.applicationId)
                }
            }
        });

        await prisma.application.deleteMany({
            where: {
                status: Status.PENDING
            }
        })
    }
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}