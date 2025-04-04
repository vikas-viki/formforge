"use client";

import DashboardContent from "@/app/components/Content";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { poppins } from "@/app/library/font";


export default function Dashboard() {

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