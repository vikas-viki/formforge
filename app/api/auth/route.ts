import bcrypt from 'bcrypt';
import { createToken, hash } from "@/app/library/helpers";
import { AuthBody } from "@/app/library/types";
import { authBody } from "@/app/library/zod";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

enum AuthAction {
    LOGIN = 'login',
    SIGNUP = "signup"
}

// passwords are always hashed in server

export async function POST(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const body = await req.json();
    const validatedData = authBody.safeParse(body);
    const action = url.searchParams.get('action') as AuthAction;

    console.log({ action, validatedData, action1: Object.values(AuthAction) });

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

        if (body.rememberMe) {
            (await cookies()).set({
                name: "session_token",
                value: createToken(user.userId),
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                path: "/",
                maxAge: 7 * 24 * 60 * 60,
                priority: "high"
            });
        }

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

        if (body.rememberMe) {
            (await cookies()).set({
                name: "session_token",
                value: createToken(user.userId),
                httpOnly: true,
                secure: process.env.NODE_ENV == "production",
                path: "/",
                maxAge: 7 * 24 * 60 * 60,
                priority: "high"
            });
        }

        return new NextResponse(null, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: (e as Error).message }, { status: 400 });
    }
}