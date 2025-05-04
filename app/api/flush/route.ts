import { prisma } from "@/db";
import { Status } from ".prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../library/helpers";

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

    if (type == "applications") {
        await prisma.applicationDetails.deleteMany();
        await prisma.application.deleteMany();
    }

    if (type == "users") {
        await prisma.user.deleteMany();
    }

    if (type == "newadmin") {
        await prisma.user.create({
            data: {
                email: "admin@gmail.com",
                password: hashPassword("admin"),
                type: "ADMIN"
            }
        })
    }
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}