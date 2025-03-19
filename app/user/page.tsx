"use client";

import React, { useRef, useState } from "react";
import { outfit } from "../library/font";
import { ApplicationType, Profile, Status, SubmittedApplication } from "../library/types";
import { GraduationCap, Utensils, BookOpenCheck, Download } from "lucide-react";
import clsx from "clsx";
import axios from "axios";

enum Tabs {
    Applications,
    SubmittedApplications,
    Profile
}

const User = () => {
    const [newApplicationsTab, setNewApplicaitonsTab] = useState(true);
    const [profileInfo, setProfileInfo] = useState<Profile>({
        name: "Vikas",
        roll_no: "123456",
        email: "abcd@gmail.com",
        course: "BCA",
        semister: "3rd",
        passing_year: "2023"
    });
    const currentPage = useRef(Tabs.Applications);

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


    const toggleTab = (tab: Tabs) => {
        setNewApplicaitonsTab(prev => !prev);
        currentPage.current = tab;
    }

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>, feild: string) => {
        setProfileInfo(prev => {
            return {
                ...prev,
                [feild]: e.target.value
            }
        }
        );
    }

    const submitHandler = async () => {
        const res = await axios.post("/api/profile", profileInfo)

        console.log({ res });
    }

    return (
        <div className={`w-[100vw] min-h-[100vh] h-full relative bg-green-400 ${outfit.className}`}>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="h-full w-[90%] p-10 pb-2 px-5 pt-20 flex justify-between items-center border-b-2 sticky top-[0px] bg-green-400 z-2 flex-wrap">
                    <h1 className="text-[20px] font-semibold">Applications</h1>
                    <div className="flex w-max gap-5 flex-wrap">
                        <button
                            className={`outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300 ${currentPage.current == Tabs.Applications ? "bg-green-200" : ""}`}
                            onClick={() => toggleTab(Tabs.Applications)}
                        >New Application
                        </button>
                        <button
                            className={`outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300 ${currentPage.current == Tabs.SubmittedApplications ? "bg-green-200" : ""}`}
                            onClick={() => toggleTab(Tabs.SubmittedApplications)}
                        >Submitted applications
                        </button>
                        <button
                            className={`outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300 ${currentPage.current == Tabs.Profile ? "bg-green-200" : ""}`}
                            onClick={() => toggleTab(Tabs.Profile)}
                        >Profile
                        </button>
                    </div>
                </div>
                <div className="w-full h-full flex justify-center items-center gap-16 px-8 pt-8 md:pt-8 md:p-16 md:px-18 flex-wrap">
                    {currentPage.current == Tabs.Applications && applications.map((application, index) => (
                        <div data-aos="fade-left" data-aos-delay={index * 100} key={index} className="relative flex justify-center items-center w-[350px] h-[250px] bg-green-200 border border-green-900 rounded-[13px] p-4 mt-4 group overflow-hidden">
                            <span className="font-outfit text-[18px]">{application}</span>
                            <div className="overflow-hidden absolute inset-0 flex justify-center items-center bg-transparent group-hover:bg-[#a9e4b2] transition-all duration-300">
                                <button className="font-outfit font-semibold px-[15px] py-[6px] cursor-pointer absolute top-[300px] bg-green-700 text-white p-2 rounded-md transition-all group-hover:top-[43%] duration-300">Apply</button>
                            </div>
                        </div>
                    ))}

                    <div className={`flex flex-col w-full my-10 mt-0 h-full gap-8 p-5 pt-1 md:pt-2 overflow-hidden h-full ${currentPage.current != Tabs.SubmittedApplications && "hidden"}`}>
                        {submittedApplications.map((ele, i) => (
                            <ApplicationCard key={i} ele={ele} />
                        ))}
                    </div>
                    <div className={`w-full h-full bg-green-100 p-5 px-8 rounded-[10px] flex flex-wrap gap-5 items-start justify-start relative ${currentPage.current != Tabs.Profile && "hidden"}`} >
                        <span className="text-[20px] md:text-[25px] font-semibold brightness-60 text-center block w-full  border-b pb-2">
                            Update Profile
                        </span>
                        {
                            Object.entries(profileInfo).map(([key, value], index) => {
                                return (
                                    <div key={index} className="flex flex-col gap-1 justify-start items-start w-max md:min-w-[45%] p-2">
                                        <span className="text-[20px] md:text-[23px] font-semibold brightness-60 capitalize">
                                            {key.split('_').join(' ')}
                                        </span>
                                        <input className="text-[20px] md:text-[22px] brightness-60 outline-none border-1 px-4 py-2 rounded-[10px] w-full md:w-max" type="text" value={value} onChange={(e) => handleProfileChange(e, key)} />
                                    </div>
                                )
                            })
                        }
                        <div className="w-full h-max p-2 flex justify-end gap-4 mr-3 border-t pt-4 pb-0 border-slate-400">
                            <button className="border px-4 py-2 rounded-[10px] min-w-[10%] bg-red-400 hover:scale-x-103 hover:-rotate-2 transition-all duration-300 cursor-pointer" onClick={() => window.location.reload()}>Discard</button>
                            <button className="border px-4 py-2 rounded-[10px] min-w-[10%] bg-green-400 hover:scale-x-103 hover:-rotate-2 transition-all duration-300 cursor-pointer" onClick={submitHandler} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ApplicationCard: React.FC<{ ele: SubmittedApplication }> = ({ ele }) => {
    return (
        <div className="border-[0.01px] outline-none flex w-full h-max py-8 px-10 gap-5 bg-green-100 rounded-[8px] md:justify-center items-center hover:scale-[1.015] transition-all duration-300 shadow-lg flex-wrap flex-col md:flex-row md:flex-nowrap">
            <span className="text-[19px] flex gap-2 justify-center md:justify-start items-center w-full md:w-[40%]">
                <span>
                    {ele.type == ApplicationType.TransferCertificate && <GraduationCap />}
                    {ele.type == ApplicationType.MidDayMeal && <Utensils />}
                    {ele.type == ApplicationType.StudyCertificate && <BookOpenCheck />}
                </span>
                <span>
                    {ele.name}
                </span>
            </span>
            <span className={`self-center w-full md:w-[20%] text-center font-semibold opacity-[0.7]
                ${clsx({ "text-green-700": ele.status === Status.approved, "text-red-700": ele.status === Status.rejected, "text-slate-700": ele.status === Status.pending })}
                `}>
                {({
                    [Status.pending]: "Pending",
                    [Status.approved]: "Approved",
                    [Status.rejected]: "Rejected"
                } as Record<number, string>)[ele.status]}
            </span>
            <div className="flex gap-2 w-full md:w-[40%] justify-start md:justify-end md:items-end flex-row-reverse md:flex-row">
                {ele.status == Status.approved && <span className="w-max text-center cursor-pointer"><Download /></span>}
                <span className="w-full md:w-[20%] text-center md:text-right">{ele.date}</span>
            </div>
        </div>
    )
}

export default User;