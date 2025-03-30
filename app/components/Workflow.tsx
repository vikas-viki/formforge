import { outfit } from "../library/font";

export default function Workflow() {
    return (
        <div className={`flex flex-col justify-center items-center ${outfit.className} mt-25`}>
            <div className="flex flex-col gap-2 items-center mb-20">
                <span className="text-[#9CA0DE] text-[22px]">Step by Step</span>
                <span className="text-[#D4D6F5] text-[35px]">How Does Applify Work</span>
            </div>
            <div className="w-[2px] bg-white h-full"></div>
            <div className="flex gap-20">
                <div className="flex flex-col gap-2 px-8 py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className="font-bold text-[#B0B0F2] text-[50px] opacity-70 leading-[65px]">01</span>
                    <span className="font-medium text-[26px] text-[#D4D6F5]">Sign-up</span>
                    <span className="font-medium text-[20px] text-[#B6B7C5]">Fill in the required details and complete your registration to get started.</span>
                </div>
                <div className="flex flex-col gap-2 px-8 py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className="font-bold text-[#B0B0F2] text-[50px] opacity-70 leading-[65px]">02</span>
                    <span className="font-medium text-[26px] text-[#D4D6F5]">Application submission</span>
                    <span className="font-medium text-[20px] text-[#B6B7C5]">Fill out the required application with details and submit it.</span>
                </div>
            </div>
            <div className="flex gap-20 mt-20 ml-25">
                <div className="flex flex-col gap-2 px-8 py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className="font-bold text-[#B0B0F2] text-[50px] opacity-70 leading-[65px]">03</span>
                    <span className="font-medium text-[26px] text-[#D4D6F5]">Admin Approval</span>
                    <span className="font-medium text-[20px] text-[#B6B7C5]">Admin verifies the application to ensure its validity and intent.</span>
                </div>
                <div className="flex flex-col gap-2 px-8 py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className="font-bold text-[#B0B0F2] text-[50px] opacity-70 leading-[65px]">04</span>
                    <span className="font-medium text-[26px] text-[#D4D6F5]">Certificate Generation</span>
                    <span className="font-medium text-[20px] text-[#B6B7C5]">Once approved by the admin, download your certificate anytime, anywhere.</span>
                </div>
            </div>
        </div>
    )
}