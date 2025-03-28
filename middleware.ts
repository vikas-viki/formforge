import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CONSTANTS } from "./app/library/constants";
import { getUserId } from "./app/library/helpers";
import { prisma } from "./db";
import { UserType } from "@prisma/client";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(CONSTANTS.server.cookies.SESSION_TOKEN);
    const pathName = request.nextUrl.pathname;
    const url = new URL("/", request.url);

    // if it starts with '/' or '/login' let it be. 
    // For all endpoints other than this, check if 'session_token' exists and if not, redirect to login page.
    if (pathName != "/" && !pathName.includes(".") && pathName != "/login") {
        console.log({ sessionToken, pathName });

        if (!sessionToken) {
            return NextResponse.redirect(url);
        } else {
            var userId = getUserId(sessionToken.value);
            const user = await prisma.user.findFirst({
                where: { userId }
            });

            if (!user || (
                (user.type == UserType.ADMIN && pathName.startsWith("/user")) ||
                (user.type == UserType.USER && pathName.startsWith("/admin"))
            )) {
                cookieStore.delete(CONSTANTS.server.cookies.SESSION_TOKEN);
                return NextResponse.redirect(url);
            }

            const response = NextResponse.next();
            response.headers.set(CONSTANTS.server.headers.userId, userId);
            return response;
        }
    }

    return NextResponse.next();
}