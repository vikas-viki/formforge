"use client";

import DashboardContent from "@/app/components/dashboard/Content";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";
import { poppins } from "@/app/library/font";
import { activeTabAtom, applicationsAtom, profileAtom, userDetailsAtom } from "@/app/store/atoms";
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
    const setProfileDetails = useSetRecoilState(profileAtom);

    if ((status == "authenticated" && session && !session.user.id) || status == "unauthenticated") {
        return redirect("/");
    }

    useEffect(() => {
        if (session) {
            setUserDetails(session!.user);
            getApplications();
            getProfile();
        }
    }, [session, activeTab]);

    if (status == "loading") {
        return (
            <div className="flex w-full h-[100vh] bg-slate-100 justify-center items-center">
                <div className="loader"><div></div><div></div></div>
            </div>
        )
    }

    const getApplications = async () => {
        const response = await axios.get("/api/applications", { withCredentials: true });
        console.log("got applications: ", response.data.application);
        setApplications(response.data.applications);
    }

    const getProfile = async () => {
        const response = await axios.get("/api/profile", { withCredentials: true });
        console.log("got user profile response!", response.data.profile);
        setProfileDetails(response.data.profile);
    }

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