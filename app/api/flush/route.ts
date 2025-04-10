import { hashPassword } from "@/app/library/helpers";
import { prisma } from "@/db";
import { UserType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    // await prisma.user.delete({
    //     where: {
    //         email: "admin@gmail.com"
    //     }
    // })
    // await prisma.user.create({   
    //     data: {
    //         email: "admin@gmail.com",
    //         password: hashPassword("admin"),
    //         type: UserType.ADMIN
    //     }
    // })
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}