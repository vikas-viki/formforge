import { CONSTANTS } from "@/app/library/constants";
import { ApplicationDataMap, ApplicationType } from "@/app/library/types";
// import { UserApplicationBody } from "@/app/library/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    // const applicationDetails: UserApplicationBody = req.json();
    // const userId = res.headers.get(CONSTANTS.server.headers.userId);

    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    if (!type || !(type in ApplicationType)) {
        return new NextResponse(null, { status: 400 });
    }

    const applicationType = type as ApplicationType;
    type RequestBody = ApplicationDataMap[typeof applicationType];
}