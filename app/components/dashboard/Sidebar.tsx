"use client";

import { BookOpen, CheckCircle, ChevronDown, CircleDot, FileText, Layers, LogOut, ShieldUser, TvMinimal, Utensils, XCircle } from "lucide-react";
import { alegereya } from "../../library/font";
import { sidebarTabs } from "../../library/types";
import { ReactNode, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeTabAtom, applicationsAtom, applicationsFilterAtom, statusFilterAtom, userDetailsAtom } from "../../store/atoms";
import { ApplicationType, Status } from "@prisma/client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const categoriesClasses = "text-nowrap flex font-medium justify-start items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] cursor-pointer hover:shadow-lg transition-all duration-300";
const mainCategoryClasses = "flex  gap-[20px] w-full font-medium items-center px-4 py-2 rounded-[10px] cursor-pointer hover:shadow-lg transition-all duration-200";

export default function Sidebar() {
    const { type: userType, name, email } = useRecoilValue(userDetailsAtom);
    const applications = useRecoilValue(applicationsAtom);

    return (
        <div className="flex flex-col border-r border-[#BCB7B7] bg-white/50 min-w-[324px] max-h-[100vh] overflow-none">
            <span className={`${alegereya.className} text-[28px] font-bold p-10 pb-0`}>Applify</span>
            <div className="flex flex-col gap-4 border-b border-[#BCB7B7] w-full my-6 pb-6 p-10 pt-0 mt-10">
                <MainCategory
                    tab={sidebarTabs.APPLICATIONS}
                    text="Applications"
                    icon={<Layers size={18.35} />}
                    type={"ALL"}
                    extraClasses={"justify-between"}
                    extraContent={userType != "USER" && <span className="px-[4px] rounded-[3px] text-[10px] font-semibold bg-slate-300 ">{applications.filter(a => a.status == Status.PENDING).length}</span>}
                />
                {
                    userType != "USER" && (
                        <MainCategory
                            tab={sidebarTabs.ANALYTICS}
                            text="Analytics"
                            icon={<TvMinimal size={18.35} />}
                        />
                    )
                }
            </div>
            <div className="flex flex-col w-full h-max gap-2 p-10 pt-2">
                <span className="text-[12px]">MAIN</span>
                <div className="flex flex-col w-full h-full gap-4">
                    {
                        userType != "USER" && (
                            <Categories />
                        )
                    }
                    {userType == "USER" && (
                        <MainCategory
                            tab={sidebarTabs.PENDING}
                            text="Pending"
                            icon={<CircleDot size={22} />}
                            status={Status.PENDING}
                        />
                    )}
                    <MainCategory
                        tab={sidebarTabs.APPROVED}
                        text="Approved"
                        icon={<CheckCircle size={20} />}
                        status={Status.APPROVED}
                    />
                    <MainCategory
                        tab={sidebarTabs.REJECTED}
                        text="Rejected"
                        icon={<XCircle size={22} />}
                        status={Status.REJECTED}
                    />
                    {
                        userType != "USER" && (
                            <MainCategory
                                tab={sidebarTabs.NEW_ADMIN}
                                text="New Admin"
                                icon={<ShieldUser size={22} />}
                            />
                        )
                    }
                </div>
            </div>
            <div className=" w-full h-full flex flex-col items-center justify-end">
                <div className="flex gap-4 p-2 rounded-[5px] my-4 bg-white shadow-xl w-max items-center">
                    <div className="flex flex-col pl-1">
                        <span>{name}</span>
                        <span className="opacity-80 text-[13px]">{email}</span>
                    </div>
                    <button className="bg-red-300 h-max w-max rounded-[5px] p-2 cursor-pointer"
                        onClick={() => {
                            signOut();
                            redirect("/");
                        }}
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
            <div className="sidebar-bg"></div>
        </div>
    )
}

const Categories = () => {
    const [categoriesExpanded, setCategoriesExpanded] = useState(false);
    return (
        <div className="flex flex-col">
            <span
                className={` font-medium px-4 py-2 rounded-[10px] flex justify-between items-center w-full gap-2 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => { setCategoriesExpanded(prev => !prev) }}
            >
                Categories
                <span className={`transition-all duration-300 ${categoriesExpanded ? "rotate-180" : "rotate-0"}`}>
                    <ChevronDown className={`block justify-self-end`} size={18} />
                </span>
            </span>
            <div className={` flex flex-col gap-2 mt-4 w-[92%] self-end transition-all duration-400 overflow-hidden ${categoriesExpanded ? "max-h-[200px]" : "max-h-[0px] -my-4"}`}>
                <SubCategory
                    tab={sidebarTabs.TRANSFER_CERTIFICATE}
                    text="Transfer Certificate"
                    icon={<FileText size={16} />}
                    type={ApplicationType.TRANSFER_CERTIFICATE}
                />
                <SubCategory
                    tab={sidebarTabs.STUDY_CERTIFICATE}
                    text="Study Certificate"
                    icon={<BookOpen size={16} />}
                    type={ApplicationType.STUDY_CERTIFICATE}
                />
                <SubCategory
                    tab={sidebarTabs.MID_DAY_MEALS}
                    text="Mid day meals"
                    icon={<Utensils size={16} />}
                    type={ApplicationType.MID_DAY_MEAL}
                />
                <SubCategory
                    tab={sidebarTabs.CONDUCT_CERTIFICATE}
                    text="Conduct Certificate"
                    icon={<FileText size={16} />}
                    type={ApplicationType.CONVEYANCE}
                />
            </div>
        </div>
    )
}

const SubCategory = ({ tab, text, icon, type }: { tab: number, text: string, icon: ReactNode, type: ApplicationType | "ALL" }) => {
    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);
    const setFilter = useSetRecoilState(applicationsFilterAtom);
    const handler = () => {
        setActiveTab(tab);
        setFilter(type);
    };

    return (
        <span
            className={`${activeTab == tab ? "bg-white text-blue-600 outline-blue-400 " : ""} ${categoriesClasses}`}
            onClick={handler}
        >
            {icon} {text}
        </span>
    )
}

const MainCategory = ({ tab, text, icon, extraClasses, type, extraContent, status }: { tab: number, text: string, icon: ReactNode, extraClasses?: String, type?: ApplicationType | "ALL", extraContent?: ReactNode, status?: Status }) => {
    const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);
    const setFilter = useSetRecoilState(applicationsFilterAtom);
    const setStatusFilter = useSetRecoilState(statusFilterAtom)
    const handler = () => {
        setActiveTab(tab);
        console.log(status);
        if (type)
            setFilter(type);
        if (status) {
            console.log("updating status");
            setStatusFilter(status);
        } else {
            setStatusFilter(Status.PENDING);
        }
    };

    return (
        <span
            className={`${activeTab == tab ? "bg-white text-blue-600 tab-shadow outline outline-blue-600" : ""} ${extraClasses} ${mainCategoryClasses} `}
            onClick={handler}
        >
            <span className={`${activeTab == tab ? "text-blue-600" : ""}`}>
                {icon}
            </span>
            <span className="flex w-full justify-between text-[16px]">
                <span>
                    {text}
                </span>
                <span>
                    {extraContent}
                </span>
            </span>
        </span>
    )
}