"use client"

import { useRecoilValue } from "recoil";
import { activeTabAtom } from "../store/atoms";
import { sidebarTabs } from "../library/types";
import Applications from "./Applications";
import NewAdmin from "./NewAdmin";
import Analytics from "./Analytics";
import NewApplication from "./NewApplication";
import ApplicationDetails from "./ApplicationDetails";

export default function DashboardContent() {
    const activeTab = useRecoilValue(activeTabAtom);

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-50">
            {
                [
                    sidebarTabs.APPLICATIONS,
                    sidebarTabs.CONDUCT_CERTIFICATE,
                    sidebarTabs.MID_DAY_MEALS,
                    sidebarTabs.STUDY_CERTIFICATE,
                    sidebarTabs.TRANSFER_CERTIFICATE,
                    sidebarTabs.PENDING,
                    sidebarTabs.APPROVED,
                    sidebarTabs.REJECTED
                ].includes(activeTab) && <Applications />
            }
            {activeTab == sidebarTabs.NEW_ADMIN && <NewAdmin />}
            {activeTab == sidebarTabs.ANALYTICS && <Analytics />}
            {activeTab == sidebarTabs.NEW_APPLICATION && <NewApplication />}
            {activeTab == sidebarTabs.APPLICATION_DETAILS && <ApplicationDetails />}
        </div>
    )
}