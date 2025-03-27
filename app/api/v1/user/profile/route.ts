import { CONSTANTS } from "@/app/library/constants";
import { Profile, ProfileBody } from "@/app/library/types";
import { profileBody } from "@/app/library/zod";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const userId = res.headers.get(CONSTANTS.server.headers.userId) || " ";
    const body: Profile = await req.json();
    const validatedData = profileBody.safeParse(body);

    if (!validatedData.success) {
        return new NextResponse(null, { status: 400 });
    }

    const user = await prisma.user.findFirst({
        where: {
            userId
        },
        include: {
            profile: true,
        }
    });

    if (!user) {
        return new NextResponse(null, { status: 404 });
    }

    const profileInfo: ProfileBody = validatedData.data;

    if (!user.profile) {
        await prisma.profile.create({
            data: {
                userId: user.userId,
                ...profileInfo
            }
        })
    } else {
        await prisma.profile.update({
            data: {
                userId,
                ...profileInfo
            },
            where: {
                userId
            }
        })
    }

    return new NextResponse(null, { status: 200 });

}

export async function GET(req: NextRequest) {

}