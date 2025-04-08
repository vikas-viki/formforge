import { ArrowUpRight } from "lucide-react";
import { outfit } from "../library/font";
import Link from "next/link";

export default function Features() {
    const infoClasses = "text-[12px] md:text-[16px] opacity-60";
    const headingClasses = "text-[20px] md:text-[24px] text-[#D4D6F5]";
    const descriptionClasses = "text-[17px] md:text-[20px] text-[#B6B7C5]";

    return (
        <section id="features" className={`w-[100vw] h-max overflow-hidden p-10 lg:p-20 ${outfit.className} relative flex flex-col justfiy-center items-center`}>
            <span className="text-[#AEB3F8] w-full self-start block pl-[5%] text-[20px] md:text-[24px]">Features</span>
            <div className="  h-full bg-[#161624] rounded-[15px] w-full lg:w-[90%] border-[0.6px] outline-none mt-10 relative overflow-hidden">
                <div className="features-bg  pl-0 pt-0 w-full h-full lg:mt-[40px] lg:ml-[40px]">
                    <div className="flex flex-col lg:flex-row py-5 pt-0 gap-10 lg:pr-10">
                        <div className="flex flex-col gap-4 z-2 bg-[#161624] features-head p-8 sm:p-10 lg:p-4 ">
                            <span className="font-medium text-[25px] md:text-[30px] text-[#D1D5DB]">Why Choose Applify?</span>
                            <span className="text-[18px] md:text-[22px] text-[#D2D4F5] leading-[26px]">Streamline the application process and verification in a single, centralized platform.</span>
                            <Link href="/signup">
                                <button className="cursor-pointer flex gap-2 bg-[#6D99F1] py-2 w-max text-[12px] md:text-[15px] px-3 mt-3 justify-center items-center">Get Started<ArrowUpRight size={15} /></button>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3 mx-5 md:mx-10 lg:mx-0 p-5 sm:p-10 rounded-[20px] bg-[#12121C] border-[0.6px] mt-0 md:mt-10 lg:mr-10 lg:ml-0 ">
                            <span className={infoClasses}>ALL IN ONE</span>
                            <span className={headingClasses}>Multi-Form Support</span>
                            <span className={descriptionClasses}>Access a wide range of college applications, including Study Certificates, Transfer Certificates and Mid-day Meals.. all in one place.</span>
                        </div>
                    </div>
                    <div className="p-5 md:p-10 flex flex-col lg:flex-row pt-5 gap-10 lg:mr-10 lg:pr-10">
                        <div className="flex flex-col gap-3 p-5 sm:p-10 rounded-[20px] bg-[#12121C] border-[0.6px]">
                            <span className={infoClasses}>BUILT IN SECURITY</span>
                            <span className={headingClasses}>Secure & Private</span>
                            <span className={descriptionClasses}>Your applications, personal information and approval controls are securely protected with advanced encryptions.</span>
                        </div>

                        <div className="flex flex-col gap-3 p-5 sm:p-10 rounded-[20px] bg-[#12121C] border-[0.6px] min-w-[45%]">
                            <span className={infoClasses}>ON - TRACK</span>
                            <span className={headingClasses}>Seamless Tracking</span>
                            <span className={descriptionClasses}>Stay informed about your application status in real-time with instant updates.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}