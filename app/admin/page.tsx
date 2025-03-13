"use client";
import { BookOpenCheck, Filter, GraduationCap, Utensils } from "lucide-react";
import { outfit } from "../library/font";
import { SyntheticEvent, useRef, useState } from "react";

enum ApplicationType {
    TransferCertificate,
    StudyCertificate,
    MidDayMeal,
    All
};

const _applications = [
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal
    },
]

const Admin = () => {
    const menuRef = useRef<HTMLUListElement>(null);
    const [applications, setApplications] = useState(_applications);
    const [filteredApplications, setFilteredApplications] = useState(_applications);

    const toggleMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.toggle('opacity-0');
            menuRef.current.classList.toggle('select-none');
            menuRef.current.classList.toggle('pointer-events-none');
        }
    }

    const filterApplications = (e: SyntheticEvent) => {
        // do something
        toggleMenu();

        setFilteredApplications(applications.filter(ele => {
            let val = Number((e.target as HTMLElement).getAttribute('value'));
            return ele.type == val || val == ApplicationType.All;
        }));
    };

    const listClasses = "py-2 px-4 cursor-pointer transition-all duration-200 hover:bg-gray-200 bg-white rounded-[10px] ";

    return (

        <div className={`main relative w-full flex-col min-h-[100vh] h-full flex justify-start items-center bg-green-400  select-none ${outfit.className}`}>
            <div className="h-full w-[90%] p-10 pb-2 px-5 pt-20 flex justify-between items-center border-b-2 sticky top-[0px] bg-green-400 z-2">
                <h1 className="text-[20px] font-semibold">Applications</h1>
                <div className="flex w-max gap-5">
                    <button className="outline-none border rounded-[10px] p-4 py-2 cursor-pointer">Add new admin</button>
                    <div className="relative ">
                        <button
                            className="flex justify-center items-center w-full h-full gap-[10px] outline-none border rounded-[10px] p-4 py-2 cursor-pointer"
                            onClick={toggleMenu}
                        >
                            Filter
                            <Filter size={15} />
                        </button>
                        <ul ref={menuRef} className="flex flex-col gap-[5px] w-max h-max absolute top-[50px] bg-white transition-all duration-300 rounded-[10px] opacity-0 select-none pointer-events-none p-2 mx-auto right-0 left-0">
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.TransferCertificate}>Transfer Certificates</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.StudyCertificate}>Study Certificates</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.MidDayMeal}>Mid-day meals</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.All}>All</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[90%] my-10 h-full gap-8 px-5 overflow-hidden h-full">
                {filteredApplications.map((ele, i) => (
                    <div key={i} className="flex w-full h-max py-8 px-10 gap-5 bg-green-100 rounded-[8px] justify-between items-center cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg">
                        <span className="text-[19px] flex gap-2 items-center">
                            {ele.type == ApplicationType.TransferCertificate && <GraduationCap />}
                            {ele.type == ApplicationType.MidDayMeal && <Utensils />}
                            {ele.type == ApplicationType.StudyCertificate && <BookOpenCheck />}
                            {ele.name}</span>
                        <span>{ele.date}</span>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Admin;