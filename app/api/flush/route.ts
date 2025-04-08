import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    // await prisma.applicationDetails.deleteMany();
    // await prisma.application.deleteMany();
    // await prisma.user.deleteMany();
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}