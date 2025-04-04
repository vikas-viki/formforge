"use client";
import Applications from "@/app/components/Applications";
import NewAdmin from "@/app/components/NewAdmin";
import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
import { poppins } from "@/app/library/font";
import { ApplicationType, sidebarTabs } from "@/app/library/types";
import { filteredApplicationsSelector } from "@/app/store/selectors";
import { Bell, CircleHelp, Command, Search } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";


export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(sidebarTabs.APPLICATIONS as number);

    return (
        <div className={`flex w-full h-screen overflow-hidden ${poppins.className}`}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col w-full h-full">
                <Topbar />
                <div className="w-full h-full overflow-y-auto bg-slate-50">
                    {
                        [
                            sidebarTabs.APPLICATIONS,
                            sidebarTabs.CONDUCT_CERTIFICATE,
                            sidebarTabs.MID_DAY_MEALS,
                            sidebarTabs.STUDY_CERTIFICATE,
                            sidebarTabs.TRANSFER_CERTIFICATE
                        ].includes(activeTab) && <Applications />
                    }
                    {activeTab == sidebarTabs.NEW_ADMIN && <NewAdmin />}
                </div>
            </div>
        </div>
    )
}