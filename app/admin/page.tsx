"use client";
import { BookOpenCheck, ChevronLeft, ChevronRight, Filter, GraduationCap, Utensils } from "lucide-react";
import { outfit } from "../library/font";
import { JSX, ReactElement, ReactNode, SyntheticEvent, useRef, useState } from "react";
import Modal from "../components/Modal";
import { ModalInputTypes } from "../library/types";

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
        type: ApplicationType.TransferCertificate,
        rollNo: "1"
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate,
        rollNo: "2"
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate,
        rollNo: "3"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "4"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "5"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "6"
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal,
        rollNo: "7"
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal,
        rollNo: "8"
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate,
        rollNo: "9"
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate,
        rollNo: "10"
    },
    {
        name: "Transfer Certificate",
        date: "12/12/2021",
        type: ApplicationType.TransferCertificate,
        rollNo: "11"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "12"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "13"
    },
    {
        name: "Study Certificate",
        date: "12/12/2021",
        type: ApplicationType.StudyCertificate,
        rollNo: "14"
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal,
        rollNo: "15"
    },
    {
        name: "Mid Day Meal",
        date: "12/12/2021",
        type: ApplicationType.MidDayMeal,
        rollNo: "16"
    },
];

const Admin = () => {
    const menuRef = useRef<HTMLUListElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
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
        toggleMenu();

        setFilteredApplications(applications.filter(ele => {
            let val = Number((e.target as HTMLElement).getAttribute('value'));
            return ele.type == val || val == ApplicationType.All;
        }));
    };

    const toggleModal = () => {
        if (modalRef.current) {
            modalRef.current.classList.toggle('hidden');
        }
    }

    const modalSumbitHandler = (e: any) => {
        console.log(e);
        toggleModal();
    }

    const handleRollNoSearch = (e: any) => {
        setFilteredApplications(applications.filter(ele => ele.rollNo.includes(e.target.value)));
    }

    const getCurrentPageApplications = () => {
        return filteredApplications.slice((currentPage - 1) * 10, currentPage * 10);
    }

    const listClasses = "py-2 px-4 cursor-pointer transition-all duration-200 hover:bg-green-100 bg-white rounded-[10px] ";

    return (
        <div className={`main relative w-full flex-col min-h-[100vh] h-full flex justify-start items-center bg-green-400  select-none ${outfit.className}`}>
            <div className="h-full w-[90%] p-10 pb-2 px-5 pt-20 flex justify-between items-center border-b-2 sticky top-[0px] bg-green-400 z-2 flex-wrap">
                <h1 className="text-[20px] font-semibold">Applications</h1>
                <div className="flex w-max gap-5 flex-wrap">
                    <input type="text" placeholder="Search by rollno" onChange={handleRollNoSearch} className="outline-none border rounded-[10px] p-4 py-2" />
                    <button
                        className="outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 hover:scale-[1.01] hover:-rotate-1 transition-all duration-300"
                        onClick={toggleModal}
                    >Add new admin</button>
                    <div className="relative ">
                        <button
                            className="flex hover:scale-[1.01] hover:-rotate-1 justify-center items-center w-full h-full gap-[10px] outline-none border rounded-[10px] p-4 py-2 cursor-pointer hover:bg-green-200 transition-all duration-300"
                            onClick={toggleMenu}
                        >
                            Filter
                            <Filter size={15} />
                        </button>
                        <ul ref={menuRef} className="flex flex-col gap-[5px] w-max h-max absolute top-[50px] bg-white transition-all duration-300 rounded-[10px] opacity-0 select-none pointer-events-none p-2 mx-auto right-0 ">
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.TransferCertificate}>Transfer Certificates</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.StudyCertificate}>Study Certificates</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.MidDayMeal}>Mid-day meals</li>
                            <li onClick={filterApplications} className={listClasses} value={ApplicationType.All}>All</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-[90%] my-10 mt-5 h-full gap-8 p-5 overflow-hidden h-full">
                {getCurrentPageApplications().map((ele, i) => (
                    <ApplicationCard key={i} ele={ele} />
                ))}
            </div>
            <div className="w-[90%] flex justify-between h-max px-5 pb-10">
                <button
                    className={`self-left cursor-pointer hover:bg-green-200 rounded-[30px] flex justify-between items-center w-max px-4 py-2 hover:scale-x-[1.1] border relative transition-all duration-300 ${currentPage == 1 ? 'opacity-0 pointer-events-none' : ''}`}
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
                    className={`self-right cursor-pointer hover:bg-green-200 rounded-[30px] flex justify-between items-center w-max px-4 py-2 hover:scale-x-[1.1] border relative transition-all duration-300 ${currentPage >= Math.ceil(filteredApplications.length / 10) ? 'opacity-0 pointer-events-none' : ''}`}
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
            <div ref={modalRef} className="hidden sticky absolute top-0 bottom-0 w-[100vw] h-[100vh] bg-slate-100/75 z-10 flex items-center justify-center z-100 " data-aos="zoom-in">
                <Modal
                    title="Add new Admin"
                    feilds={[
                        {
                            type: ModalInputTypes.input,
                            name: "Email",
                            placeholder: "JohnDoe@gmail.com"
                        },
                        {
                            type: ModalInputTypes.input,
                            name: "Password",
                            placeholder: "**********"
                        },
                        {
                            type: ModalInputTypes.button,
                            name: "Add new Admin",
                            handler: modalSumbitHandler
                        },
                        {
                            type: ModalInputTypes.cancel,
                            name: "Cancel",
                            handler: toggleModal
                        }
                    ]}
                />
            </div>
        </div >
    )
};

const ApplicationCard: React.FC<{ ele: any }> = ({ ele }) => {
    return (
        <div className="border-[0.01px] outline-none flex w-full h-max py-8 px-10 gap-5 bg-green-100 rounded-[8px] justify-center items-center cursor-pointer hover:scale-[1.015] transition-all duration-300 shadow-lg">
            <span className="text-[19px] flex gap-2 items-center w-[40%]">
                {ele.type == ApplicationType.TransferCertificate && <GraduationCap />}
                {ele.type == ApplicationType.MidDayMeal && <Utensils />}
                {ele.type == ApplicationType.StudyCertificate && <BookOpenCheck />}
                {ele.name}</span>
            <span className="self-center w-[20%] text-center">{ele.rollNo}</span>
            <span className="w-[40%] text-right">{ele.date}</span>
        </div>
    )
}

export default Admin;