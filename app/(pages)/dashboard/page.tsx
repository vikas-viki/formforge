"use client";
import Applications from "@/app/components/Applications";
import NewAdmin from "@/app/components/NewAdmin";
import Sidebar from "@/app/components/Sidebar";
import { poppins } from "@/app/library/font";
import { ApplicationType, sidebarTabs } from "@/app/library/types";
import { Bell, CircleHelp, Command, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(sidebarTabs.APPLICATIONS as number);

    return (
        <div className={`flex w-full h-screen overflow-hidden ${poppins.className}`}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex flex-col w-full h-full">
                <div className="w-full h-max flex justify-between items-center px-8 py-4 border-b border-slate-400 bg-slate-100">
                    <div className="flex flex-col h-full w-max">
                        <span className="text-[14px] text-slate-600">
                            Welcome,
                        </span>
                        <span className="text-[16px] font-regular">
                            John carter
                        </span>
                    </div>
                    <div className="flex justify-between items-center w-full max-w-[700px] bg-white/90 shadow-sm p-2 rounded-[10px]">
                        <div className="flex justify-center gap-2 items-center w-full">
                            <Search strokeWidth={2} className="text-slate-600" size={19} />
                            <input type="text" placeholder="Find something" className="text-[15px] w-full border-none outline-none p-[1px] text-slate-700" />
                        </div>
                        <span className="flex justify-center items-center bg-slate-300/90 px-1 rounded-[5px] gap-1"><Command size={16} /> K</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="p-2 rounded-[50%] bg-white shadow-sm"><CircleHelp size={18} /></span>
                        <span className="p-2 rounded-[50%] bg-white shadow-sm"><Bell size={18} /></span>
                    </div>
                </div>
                <div className="w-full h-full overflow-y-auto">
                    {activeTab == sidebarTabs.APPLICATIONS && <Applications filter="" category={ApplicationType.All} />}
                    {activeTab == sidebarTabs.NEW_ADMIN && <NewAdmin />}
                </div>
            </div>
        </div>
    )
}