"use client";
import { BookOpenCheck, ChevronLeft, ChevronRight, Filter, GraduationCap, Utensils } from "lucide-react";
import { outfit } from "../library/font";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredApplicationsSelector } from "../store/selectors";
import { ApplicationType, Status, UserType } from "@prisma/client";
import { ApplicationName, ApplicationsResponse, GetApplicationsReturn, NewApplications, sidebarTabs } from "../library/types";
import { formatDistanceToNow } from "date-fns";
import { activeTabAtom, currentApplicationIdAtom, userDetailsAtom } from "../store/atoms";
import ApplicationCard from "./ApplicationCard";

const Applications = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const filteredApplications = useRecoilValue(filteredApplicationsSelector);

    const { type } = useRecoilValue(userDetailsAtom) as { type: UserType };
    const activeTab = useRecoilValue(activeTabAtom);

    const getCurrentPageApplications = <T extends string>(_type: T): GetApplicationsReturn<T> => {
        if (activeTab == sidebarTabs.APPLICATIONS && _type == "USER") {
            var applications: NewApplications = [
                {
                    type: ApplicationType.TRANSFER_CERTIFICATE,
                    kind: "NEW",
                    feilds: {
                        name: "text",
                        rollNo: "text",
                        email: "text",
                        course: "text",
                        passingYear: "text"
                    }
                },
                {
                    type: ApplicationType.STUDY_CERTIFICATE,
                    kind: "NEW",
                    feilds: {
                        name: "text",
                        rollNo: "text",
                        email: "text",
                        course: "text",
                        semester: "number",
                        passingYear: "text",
                        description: "text"
                    }
                },
                {
                    type: ApplicationType.MID_DAY_MEAL,
                    kind: "NEW",
                    feilds: {
                        name: "text",
                        rollNo: "text",
                        semester: "number"
                    }
                }
            ];
            return applications as GetApplicationsReturn<T>
        } else {
            return filteredApplications.slice((currentPage - 1) * 10, currentPage * 10) as GetApplicationsReturn<T>;
        }
    }

    return (
        <div className={`main relative w-full flex-col flex justify-start items-center  bg-slate-50  select-none ${outfit.className}`}>
            <div className="flex flex-col w-[90%] my-10 mt-5 h-full gap-0 p-5">
                {(getCurrentPageApplications(type) as ApplicationsResponse).map((ele, i) => (
                    <div key={i}>
                        <ApplicationCard ele={ele} />
                        <div className="w-full h-max border-[0.5px] border-slate-200 my-4"></div>
                    </div>
                ))}
            </div>
            <div className="w-[90%] flex justify-between h-max px-5 pb-10">
                <button
                    className={`self-left cursor-pointer hover:bg-blue-200 rounded-[30px] flex justify-between items-center w-max px-4 py-2 hover:scale-x-[1.1] border relative transition-all duration-300 ${currentPage == 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(prev => prev - 1);
                        }
                    }}
                >
                    <ChevronLeft size={19} />
                    Previous
                </button>
                <button
                    className={`self-right cursor-pointer hover:bg-blue-200 rounded-[30px] flex justify-between items-center w-max px-4 py-2 hover:scale-x-[1.1] border relative transition-all duration-300 ${currentPage >= Math.ceil(filteredApplications.length / 10) ? 'opacity-0 pointer-events-none' : ''}`}
                    onClick={() => {
                        if (currentPage < Math.ceil(filteredApplications.length / 10)) {
                            setCurrentPage(prev => prev + 1);
                        }
                    }}
                >
                    Next
                    <ChevronRight size={19} />
                </button>
            </div>
        </div >
    )
};


export default Applications;