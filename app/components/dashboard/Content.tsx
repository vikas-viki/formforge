"use client"

import { useRecoilValue } from "recoil";
import { activeTabAtom } from "../../store/atoms";
import { sidebarTabs } from "../../library/types";
import Applications from "../tabs/Applications";
import NewAdmin from "../tabs/NewAdmin";
import Analytics from "../tabs/Analytics";
import NewApplication from "../application/NewApplication";
import ApplicationDetails from "../application/ApplicationDetails";
import Profile from "../Profile";

export default function DashboardContent() {
    const activeTab = useRecoilValue(activeTabAtom);

    return (
        <div className="w-full h-full overflow-y-auto bg-white">
            {
                [
                    sidebarTabs.APPLICATIONS,
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
            {activeTab == sidebarTabs.PROFILE && <Profile />}
        </div>
    )
}