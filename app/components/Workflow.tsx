import { outfit } from "../library/font";

export default function Workflow() {

    const infoClasses = "font-bold text-[#B0B0F2] text-[40px] md:text-[45px] lg:text-[50px] opacity-70 leading-[65px]";
    const headingClasses = "font-medium text-[22px] md:text-[26px] text-[#D4D6F5]";
    const descriptionClasses = "font-medium text-[17px] md:text-[20px] text-[#B6B7C5]";

    return (
        <div id="workflow" className={`flex flex-col justify-center items-center ${outfit.className} mt-25`}>
            <div className="flex flex-col gap-2 items-center mb-20">
                <span className="text-[#9CA0DE] text-[18px] text-center md:text-[22px]">Step by Step</span>
                <span className="text-[#D4D6F5] text-[30px] text-center md:text-[35px] px-5 ">How Does Applify Work</span>
            </div>
            <div className="flex gap-10 md:gap-20 flex-wrap justify-center items-center px-10 md:p-5">
                <div className="flex flex-col gap-2 px-6 sm:px-8 py-4 sm:py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className={infoClasses}>01</span>
                    <span className={headingClasses}>Sign-up</span>
                    <span className={descriptionClasses}>Fill in the required details and complete your registration to get started.</span>
                </div>
                <div className="flex flex-col gap-2 px-6 sm:px-8 py-4 sm:py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className={infoClasses}>02</span>
                    <span className={headingClasses}>Application submission</span>
                    <span className={descriptionClasses}>Fill out the required application with details and submit it.</span>
                </div>
            </div>
            <div className="flex gap-10 md:gap-20 mt-10 md:mt-20 ml-0 xl:ml-25 flex-wrap justify-center items-center px-10 md:p-5">
                <div className="flex flex-col gap-2 px-6 sm:px-8 py-4 sm:py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className={infoClasses}>03</span>
                    <span className={headingClasses}>Admin Approval</span>
                    <span className={descriptionClasses}>Admin verifies the application to ensure its validity and intent.</span>
                </div>
                <div className="flex flex-col gap-2 px-6 sm:px-8 py-4 sm:py-6 rounded-[15px] border-[0.5px] bg-[#12121A] max-w-[450px]">
                    <span className={infoClasses}>04</span>
                    <span className={headingClasses}>Certificate Generation</span>
                    <span className={descriptionClasses}>Once approved by the admin, download your certificate anytime, anywhere.</span>
                </div>
            </div>
        </div>
    )
}