import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../library/constatns";
import { prisma } from "@/db";
import { Profile } from ".prisma/client";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user && !session?.user.id) {
            return new NextResponse(null, { status: 401 });
        }

        const profileDetails = await prisma.profile.findUnique({
            where: {
                userId: session.user.id
            },
            include: {
                user: false
            }
        });

        var profile = {};

        if (profileDetails) {
            profile = Object.fromEntries(Object.entries(profileDetails).filter(([key, value]) => key != "id" && key != "userId"));
        }

        return NextResponse.json({
            profile
        }, { status: 200 });
    } catch (e: unknown) {
        console.log(e)
        return new NextResponse(null, { status: 500 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user && !session?.user.id) {
            return new NextResponse(null, { status: 401 });
        }

        const body: Profile = (await req.json()).details;

        console.log("profile body: ", body);

        await prisma.profile.update({
            where: {
                userId: session.user.id
            },
            data: {
                ...body,
                dateOfAdmission: { set: new Date(body.dateOfAdmission as Date)?.toISOString() },
                dateOfBirth: { set: new Date(body.dateOfBirth as Date)?.toISOString() },
                dateOfLeaving: { set: new Date(body.dateOfLeaving as Date)?.toISOString() }
            }
        });

        return new NextResponse(null, { status: 200 });

    } catch (e: unknown) {
        console.log(e)
        return new NextResponse(null, { status: 500 });
    }
}