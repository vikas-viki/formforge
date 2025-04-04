"use client";
import { BookOpenCheck, ChevronLeft, ChevronRight, Filter, GraduationCap, Utensils } from "lucide-react";
import { outfit } from "../library/font";
import { useState } from "react";
import { ApplicationType } from "../library/types";
import { useRecoilValue } from "recoil";
import { filteredApplicationsSelector } from "../store/selectors";

const Applications = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const filteredApplications = useRecoilValue(filteredApplicationsSelector);

    const getCurrentPageApplications = () => {
        return filteredApplications.slice((currentPage - 1) * 10, currentPage * 10);
    }

    return (
        <div className={`main relative w-full flex-col flex justify-start items-center  bg-slate-50  select-none ${outfit.className}`}>
            <div className="flex flex-col w-[90%] my-10 mt-5 h-full gap-8 p-5">
                {getCurrentPageApplications().map((ele, i) => (
                    <ApplicationCard key={i} ele={ele} />
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

const ApplicationCard: React.FC<{ ele: any }> = ({ ele }) => {
    return (
        <div className="border-[0.1px] border-slate-500 outline-none flex w-full h-max py-6 px-8 gap-5 bg-blue-50 rounded-[25px] justify-center items-center cursor-pointer hover:scale-[1.015] transition-all duration-300 shadow-sm hover:shadow-lg">
            <span className="text-[19px] flex gap-2 items-center w-[40%]">
                {ele.type == ApplicationType.TransferCertificate && <GraduationCap size={20} />}
                {ele.type == ApplicationType.MidDayMeal && <Utensils size={20} />}
                {ele.type == ApplicationType.StudyCertificate && <BookOpenCheck size={20} />}
                {ele.name}</span>
            <span className={`self-center w-[20%] text-center font-medium text-slate-500 ${outfit.className}`}>{ele.rollNo}</span>
            <span className="w-[40%] text-right">{ele.date}</span>
        </div>
    )
}

export default Applications;