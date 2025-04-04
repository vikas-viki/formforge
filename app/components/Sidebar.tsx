"use client";

import { BarChart, BookOpen, CheckCircle, ChevronDown, FileText, Layers, ShieldUser, Utensils, XCircle } from "lucide-react";
import { inkNut } from "../library/font";
import { ApplicationType, sidebarTabs } from "../library/types";
import { ReactNode, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { applicationsFilterAtom } from "../store/atoms";

const categoriesClasses = "text-nowrap flex font-medium justify-start items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] cursor-pointer hover:shadow-lg transition-all duration-200";
const mainCategoryClasses = "flex  gap-2 w-full font-medium items-center px-4 py-2 rounded-[10px] cursor-pointer hover:shadow-lg transition-all duration-200";

export default function Sidebar({ activeTab, setActiveTab }: { activeTab: number, setActiveTab: CallableFunction }) {
    const [categoriesExpanded, setCategoriesExpanded] = useState(false);
    const setFilter = useSetRecoilState(applicationsFilterAtom);

    return (
        <div className="flex flex-col bg-slate-100 border-r border-slate-400 opacity-70 min-w-[250px] h-full min-h-[100vh] items-start p-5">
            <span className={`${inkNut.className} text-[22px] font-bold`}>Applify</span>
            <div className="flex flex-col gap-4 border-b border-slate-400 w-full my-6 pb-6 mt-10">
                <span className={`block ${mainCategoryClasses} justify-between ${activeTab == sidebarTabs.APPLICATIONS && "bg-white text-blue-600 border"} `}
                    onClick={() => {
                        setActiveTab(sidebarTabs.APPLICATIONS)
                        setFilter(ApplicationType.All)
                    }}
                >
                    <span className="flex gap-2"><Layers size={20} /> Applications </span>
                    <span className="px-[4px] rounded-[3px] text-[12px] font-bold bg-slate-300 ">19</span>
                </span>
                <MainCategory
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tab={sidebarTabs.ANALYTICS}
                    text="Analytics"
                    icon={<BarChart size={20} />}
                />
            </div>
            <div className="flex flex-col w-full h-max gap-2">
                <span className="text-[12px]">MAIN</span>
                <div className="flex flex-col w-full h-full gap-4">
                    <div className="flex flex-col">
                        <span
                            className={`${categoriesExpanded ? "bg-slate-100/90" : "bg-slate-100/0"} font-medium px-4 py-2 rounded-[10px] flex justify-between items-center w-full gap-2 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                            onClick={() => {
                                setCategoriesExpanded(prev => !prev)
                            }}
                        >
                            Categories
                            <span className={`transition-all duration-300 ${categoriesExpanded ? "rotate-180" : "rotate-0"}`}>
                                <ChevronDown className={`block justify-self-end`} size={18} />
                            </span>
                        </span>
                        <div className={` flex flex-col gap-2 mt-4 w-[92%] self-end transition-all duration-400 overflow-hidden ${categoriesExpanded ? "max-h-[200px]" : "max-h-[0px] -my-4"}`}>
                            <SubCategory
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                tab={sidebarTabs.TRANSFER_CERTIFICATE}
                                text="Transfer Certificate"
                                icon={<FileText size={16} />}
                                type={ApplicationType.TransferCertificate}
                            />
                            <SubCategory
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                tab={sidebarTabs.STUDY_CERTIFICATE}
                                text="Study Certificate"
                                icon={<BookOpen size={16} />}
                                type={ApplicationType.StudyCertificate}
                            />
                            <SubCategory
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                tab={sidebarTabs.MID_DAY_MEALS}
                                text="Mid day meals"
                                icon={<Utensils size={16} />}
                                type={ApplicationType.MidDayMeal}
                            />
                            <SubCategory
                                tab={sidebarTabs.CONDUCT_CERTIFICATE}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                text="Conduct Certificate"
                                icon={<FileText size={16} />}
                                type={ApplicationType.ConductCertificate}
                            />
                        </div>
                    </div>
                    <MainCategory
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tab={sidebarTabs.APPROVED}
                        text="Approved"
                        icon={<CheckCircle size={20} />}
                    />
                    <MainCategory
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tab={sidebarTabs.REJECTED}
                        text="Rejected"
                        icon={<XCircle size={20} />}
                    />
                    <MainCategory
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tab={sidebarTabs.NEW_ADMIN}
                        text="New Admin"
                        icon={<ShieldUser size={20} />}
                    />
                </div>
            </div>
            <div className="flex  flex-col  w-full h-max py-2 px-4 rounded-[5px] my-4 bg-white shadow-xl">
                <span>John carter</span>
                <span className="opacity-80 text-[13px]">john@gmail.com</span>
            </div>
        </div>
    )
}

const SubCategory = ({ tab, activeTab, setActiveTab, text, icon, type }: { tab: number, activeTab: number, setActiveTab: CallableFunction, text: string, icon: ReactNode, type: ApplicationType }) => {
    const setFilter = useSetRecoilState(applicationsFilterAtom);
    const handler = () => {
        setActiveTab(tab);
        setFilter(type);
    };

    return (
        <span
            className={`${activeTab == tab ? "bg-white text-blue-600 border" : "border-slate-400"} ${categoriesClasses}`}
            onClick={handler}
        >
            {icon} {text}
        </span>
    )
}


const MainCategory = ({ tab, activeTab, setActiveTab, text, icon }: { tab: number, activeTab: number, setActiveTab: CallableFunction, text: string, icon: ReactNode }) => {
    return (
        <span
            className={`${activeTab == tab ? "bg-white text-blue-600 border" : "border-slate-400"}  ${mainCategoryClasses}`}
            onClick={() => setActiveTab(tab)}
        >
            {icon} {text}
        </span>
    )
}