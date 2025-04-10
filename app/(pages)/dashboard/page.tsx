"use client";

import DashboardContent from "@/app/components/Content";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { poppins } from "@/app/library/font";
import { activeTabAtom, applicationsAtom, userDetailsAtom } from "@/app/store/atoms";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const setApplications = useSetRecoilState(applicationsAtom);
    const setUserDetails = useSetRecoilState(userDetailsAtom);
    const activeTab = useRecoilValue(activeTabAtom);

    if ((status == "authenticated" && session && !session.user.id) || status == "unauthenticated") {
        return redirect("/");
    }

    const getApplications = async () => {
        const response = await axios.get("/api/applications", { withCredentials: true });
        console.log("got applications: ", response.data.application);
        setApplications(response.data.applications);
    }

    useEffect(() => {
        if (session) {
            setUserDetails(session!.user);
            getApplications();
        }
    }, [session, activeTab]);

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