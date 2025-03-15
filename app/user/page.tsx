"use client";

import { useRef, useState } from "react";
import { outfit } from "../library/font";
import { ApplicationType, Status, SubmittedApplication } from "../library/types";
import { GraduationCap, Utensils, BookOpenCheck, Download } from "lucide-react";
import clsx from "clsx";

const User = () => {
    const [newApplicationsTab, setNewApplicaitonsTab] = useState(true);

    const applications = [
        "Transfer Certificate",
        "Study Certificate",
        "Seat Reservation",
        "Mid-day Meal",
        "Conveyance Letter",
    ];

    const submittedApplications: SubmittedApplication[] = [
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            status: Status.pending
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            status: Status.approved
        },
        {
            name: "Transfer Certificate",
            date: "12/12/2021",
            type: ApplicationType.TransferCertificate,
            status: Status.rejected
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            status: Status.approved
        },
        {
            name: "Study Certificate",
            date: "12/12/2021",
            type: ApplicationType.StudyCertificate,
            status: Status.pending
        }
    ];

    const toggleTab = () => {
        setNewApplicaitonsTab(prev => !prev);
    }

    return (
        <div className={`w-[100vw] min-h-[100vh] h-full relative bg-green-400 ${outfit.className}`}>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="h-full w-[90%] p-10 pb-2 px-5 pt-20 flex justify-between items-center border-b-2 sticky top-[0px] bg-green-400 z-2 flex-wrap">
                    <h1 className="text-[20px] font-semibold">Applications</h1>
                    <div className="flex w-max gap-5 flex-wrap">
                        <button
                            className={`outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300 ${newApplicationsTab ? "bg-green-200" : ""}`}
                            onClick={toggleTab}
                        >New Application
                        </button>
                        <button
                            className={`outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300 ${!newApplicationsTab ? "bg-green-200" : ""}`}
                            onClick={toggleTab}
                        >Submitted applications
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex justify-center items-center gap-16 p-16 px-18 flex-wrap">
                    {newApplicationsTab ? applications.map((application, index) => (
                        <div data-aos="fade-left" data-aos-delay={index * 100} key={index} className="relative flex justify-center items-center w-[350px] h-[250px] bg-green-200 border border-green-900 rounded-[13px] p-4 mt-4 group overflow-hidden">
                            <span className="font-outfit text-[18px]">{application}</span>
                            <div className="overflow-hidden absolute inset-0 flex justify-center items-center bg-transparent group-hover:bg-[#a9e4b2] transition-all duration-300">
                                <button className="font-outfit font-semibold px-[15px] py-[6px] cursor-pointer absolute top-[300px] bg-green-700 text-white p-2 rounded-md transition-all group-hover:top-[43%] duration-300">Apply</button>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col w-full my-10 mt-0 h-full gap-8 p-5 pt-1 overflow-hidden h-full">
                            {submittedApplications.map((ele, i) => (
                                <ApplicationCard key={i} ele={ele} />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

const ApplicationCard: React.FC<{ ele: SubmittedApplication }> = ({ ele }) => {
    return (
        <div className="border-[0.01px] outline-none flex w-full h-max py-8 px-10 gap-5 bg-green-100 rounded-[8px] justify-center items-center hover:scale-[1.015] transition-all duration-300 shadow-lg">
            <span className="text-[19px] flex gap-2 items-center w-[40%]">
                {ele.type == ApplicationType.TransferCertificate && <GraduationCap />}
                {ele.type == ApplicationType.MidDayMeal && <Utensils />}
                {ele.type == ApplicationType.StudyCertificate && <BookOpenCheck />}
                {ele.name}</span>
            <span className={`self-center w-[20%] text-center font-semibold opacity-[0.7]
                ${clsx({ "text-green-700": ele.status === Status.approved, "text-red-700": ele.status === Status.rejected, "text-slate-700": ele.status === Status.pending })}
                `}>
                {({
                    [Status.pending]: "Pending",
                    [Status.approved]: "Approved",
                    [Status.rejected]: "Rejected"
                } as Record<number, string>)[ele.status]}
            </span>
            <div className="flex gap-2 w-[40%] justify-end items-end">
            {ele.status == Status.approved && <span className="w-max text-center cursor-pointer"><Download /></span>}
            <span className="w-[20%] text-right">{ele.date}</span>
            </div>
        </div>
    )
}

export default User;