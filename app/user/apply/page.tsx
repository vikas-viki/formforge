"use client";

import Modal from "@/app/components/Modal";
import { outfit } from "@/app/library/font";
import { ModalInputTypes } from "@/app/library/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const StudentApplication = () => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [profileInfo, setProfileInfo] = useState({
        title: "Update Profile",
        name: "Vikas",
        roll_no: "123456",
        email: "abcd@gmail.com",
        course: "BCA",
        semester: "3rd",
        passsing_year: "2023"
    });

    const params = useSearchParams();
    const kind = params.get("kind");

    console.log({ kind });

    const toggleModal = () => {
        modalRef.current?.classList.toggle("hidden");
    }

    const modalSumbitHandler = () => {
        console.log("modal submitted!");
        toggleModal();
    }

    const applicationDetails = {
        title: "Transfer Certificate",
        name: "Vikas",
        roll_no: "123456",
        email: "abcd@gmail.com",
        course: "BCA",
        semester: "3rd",
        passsing_year: "2023",
        description: "This is a description of the applicationThis is a description of the applicationThis is a description of the applicationThis is a description of the applicationThis is a description of the applicationThis is a description of the application"
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

    return (
        <>
            <div className={`w-full h-max min-h-[100vh] flex-col min-w-[100vw] bg-green-400 font-outfit p-10 flex justify-start pt-20 items-start ${outfit.className}`}>
                <div className="w-full h-full bg-green-100 p-5 rounded-[10px] flex flex-wrap gap-5 items-start justify-start relative">
                    <span className="text-[20px] md:text-[25px] font-semibold brightness-60 block w-full text-center border-b pb-2">
                        {applicationDetails.title}
                    </span>
                    <span className="text-[20px] px-2">
                        By submitting this application, you acknowledge and agree to abide by the college guidelines. Additionally, you understand that providing incorrect or inappropriate information may result in the rejection of your application.
                    </span>
                    {
                        Object.entries(profileInfo).slice(1).map(([key, value], index) => {
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
                        <button className="border px-4 py-2 rounded-[10px] min-w-[10%] bg-red-400 hover:scale-x-103 hover:-rotate-2 transition-all duration-300 cursor-pointer" onClick={toggleModal}>Discard</button>
                        <button className="border px-4 py-2 rounded-[10px] min-w-[10%] bg-green-400 hover:scale-x-103 hover:-rotate-2 transition-all duration-300 cursor-pointer" onClick={toggleModal}>Submit</button>
                    </div>
                </div>
            </div>
            <div ref={modalRef} className="hidden absolute top-0 w-full h-[100vh] bg-slate-100/75 flex items-center justify-center z-100 " data-aos="zoom-in">
                <Modal
                    title="Approve Application"
                    description="Applications once approved are irreversible. Are you sure you want to approve this application?"
                    feilds={[
                        {
                            type: ModalInputTypes.button,
                            name: "Approve",
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
        </>
    )
}

export default StudentApplication;