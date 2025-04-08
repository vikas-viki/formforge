"use client";

import DashboardContent from "@/app/components/Content";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { poppins } from "@/app/library/font";
import { userDetailsAtom } from "@/app/store/atoms";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Dashboard() {
    const { data: session, status } = useSession();

    const setUserDetails = useSetRecoilState(userDetailsAtom);

    console.log(session, status);

    if ((status == "authenticated" && session && !session.user.id) || status == "unauthenticated") {
        return redirect("/");
    }

    useEffect(() => {
        if (session)
            setUserDetails(session!.user);
    }, []);

    return (
        <div className={`flex w-full h-screen overflow-hidden ${poppins.className}`}>
            <Sidebar />
            <div className="flex flex-col w-full h-full">
                <Topbar />
                <DashboardContent />
            </div>
        </div>
    )
}