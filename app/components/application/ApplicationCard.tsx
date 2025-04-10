import { Status, ApplicationType } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { GraduationCap, Utensils, BookOpenCheck } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { outfit } from "../../library/font";
import { ApplicationsResponse, sidebarTabs, ApplicationName } from "../../library/types";
import { activeTabAtom, currentApplicationAtom } from "../../store/atoms";

const ApplicationCard: React.FC<{ ele: ApplicationsResponse[0] }> = ({ ele }) => {

    const colors = {
        [Status.APPROVED]: "bg-green-600",
        [Status.PENDING]: "bg-slate-500",
        [Status.REJECTED]: "bg-red-500"
    }

    const setCurrentApplication = useSetRecoilState(currentApplicationAtom);
    const setActiveTab = useSetRecoilState(activeTabAtom);

    const handler = () => {
        if (ele.applicationId) {
            setActiveTab(sidebarTabs.APPLICATION_DETAILS);
            setCurrentApplication(ele)
        } else {
            setActiveTab(sidebarTabs.NEW_APPLICATION);
            setCurrentApplication(ele);
        }
    }

    return (
        <div
            className="outline-none flex w-full h-max py-6 px-8 gap-5 rounded-[7px] justify-center items-center cursor-pointer hover:scale-[1.015] hover:-mt-[0.5px] transition-all duration-200  hover:shadow-sm hover:bg-blue-100/80"
            onClick={handler}
        >
            <span className="text-[19px] flex gap-4 items-center w-[40%]">
                {ele.type == ApplicationType.TRANSFER_CERTIFICATE && <GraduationCap size={20} />}
                {ele.type == ApplicationType.MID_DAY_MEAL && <Utensils size={20} />}
                {ele.type == ApplicationType.STUDY_CERTIFICATE && <BookOpenCheck size={20} />}
                {ApplicationName[ele.type]}</span>

            <span className={`self-center w-[20%] text-center font-medium text-slate-500 ${outfit.className}`}>{ele?.details?.rollNo}</span>
            <span className="w-[40%] text-right text-slate-500 flex gap-2 items-center justify-end">
                <span className={`text-[8px] text-white ${colors[ele.status]} rounded-[20px] py-[4px] px-[8px]`}>{ele.status}</span>
                {(ele.createdAt) && formatDistanceToNow(new Date((ele.createdAt)), { addSuffix: false, includeSeconds: false }).replace("about", "") + " ago"}
            </span>
            {!ele.createdAt &&
                <span className="flex bg-teal-400 text-nowrap text-[12px] px-2 py-1 rounded-[20px]">Apply now</span>
            }
        </div>
    )
}

export default ApplicationCard;