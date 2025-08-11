import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@/prisma/client";

export async function middleware(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (req.method === "PATCH" && token.type !== UserType.ADMIN) {
            return NextResponse.json({ error: "Forbidden - Admins only" }, { status: 403 });
        }

        return NextResponse.next();
    } catch (err) {
        console.error("Middleware error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const config = {
    matcher: ["/api/admin", "/api/applications"],
};
