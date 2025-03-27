import bcrypt from 'bcrypt';
import { createToken, hash } from "@/app/library/helpers";
import { AuthBody } from "@/app/library/types";
import { authBody } from "@/app/library/zod";
import { prisma } from '@/db';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { CONSTANTS } from '@/app/library/constants';

enum AuthAction {
    LOGIN = 'login',
    SIGNUP = "signup"
}

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const body = await req.json();
    const validatedData = authBody.safeParse(body);
    const action = url.searchParams.get('action') as AuthAction;

    if (!action || !validatedData.success || !Object.values(AuthAction).includes(action as AuthAction)) {
        return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    }

    if (action == AuthAction.LOGIN) {
        return loginHandler(validatedData.data as AuthBody);
    } else if (action == AuthAction.SIGNUP) {
        return signupHandler(validatedData.data as AuthBody);
    }
}

async function loginHandler(body: AuthBody) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            throw Error("USER_NOT_FOUND");
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            throw Error("INVALID_CREDENTIALS");
        }

        (await cookies()).set({
            name: CONSTANTS.server.cookies.SESSION_TOKEN,
            value: createToken(user.userId),
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            path: "/",
            maxAge: (body.rememberMe ? 7 : 1) * 24 * 60 * 60,
            priority: "high"
        });

        return NextResponse.json({ userId: user.userId, type: user.type });
    } catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}

async function signupHandler(body: AuthBody) {
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (userExists) {
            throw Error("USER_ALREADY_EXISTS");
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: await hash(body.password)
            }
        });
        await prisma.profile.create({
            data: {
                userId: user.userId,
                email: user.email
            }
        });

        (await cookies()).set({
            name: CONSTANTS.server.cookies.SESSION_TOKEN,
            value: createToken(user.userId),
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            path: "/",
            maxAge: (body.rememberMe ? 7 : 1) * 24 * 60 * 60,
            priority: "high"
        });

        return new NextResponse(null, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}