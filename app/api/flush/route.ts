import { prisma } from "@/db";
import { Status } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../library/helpers";

export async function GET(req: NextRequest) {
    const searchParams = new URL(req.url);
    const type = searchParams.searchParams.get("type");

    if (type == "getpending") {
        const pendingApplications = await prisma.application.findMany({
            where: {
                status: Status.PENDING
            }
        });
        return NextResponse.json(pendingApplications);
    }

    if (type == "applications") {
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