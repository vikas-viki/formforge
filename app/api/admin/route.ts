import { hashPassword } from "@/app/api/library/helpers";
import { NewAdminBody } from "@/app/library/types";
import { prisma } from "@/db";
import { UserType } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// must be admin
export async function POST(req: NextRequest) {
    const body: NewAdminBody = await req.json();

    await prisma.user.create({
        data: {
            type: UserType.ADMIN,
            email: body.email,
            password: hashPassword(body.password),
            name: body.name
        }
    });

    return new NextResponse(null, { status: 200 });
}