import { getServerSession } from "next-auth";
import { authOptions } from "../library/constatns";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { FETCH_OBJECT } from "../library/objectStore";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            redirect("/login");
        }

        const applicationId = (new URL(req.url)).searchParams.get("applicationId");

        console.log({ applicationId });

        if (!applicationId) {
            return new NextResponse(null, { status: 400 });
        }

        const url = await FETCH_OBJECT(applicationId);

        console.log({ url });

        return NextResponse.json({ url }, { status: 200 });
    } catch (e: unknown) {
        console.log(e);
        return new NextResponse(null, { status: 500 });
    }
}