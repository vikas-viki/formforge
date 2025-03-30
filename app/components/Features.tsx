import { ArrowUpRight } from "lucide-react";
import { outfit } from "../library/font";

export default function Features() {
    return (
        <section id="features" className={`w-[100vw] h-max overflow-hidden p-20 ${outfit.className} relative flex flex-col justfiy-center items-center`}>
            <span className="text-[#AEB3F8] self-start block pl-[5%] text-[24px]">Features</span>
            <div className="  h-full bg-[#161624] relative rounded-[15px] w-[90%] border-[0.6px] outline-none mt-10 relative overflow-hidden">
                <div className="features-bg p-10 pl-0 pt-0 w-full h-full mt-[40px] ml-[40px]">
                    <div className="flex py-5 pt-0 gap-10 pr-10">
                        <div className="flex flex-col gap-4 z-2 bg-[#161624] features-head p-4">
                            <span className="font-medium text-[30px] text-[#D1D5DB]">Why Choose Applify?</span>
                            <span className="text-[22px] text-[#D2D4F5] leading-[26px]">Streamline the application process and verification in a single, centralized platform.</span>
                            <button className="flex gap-2 bg-[#6D99F1] py-2 w-max text-[15px] px-3 mt-3 justify-center items-center">Get Started<ArrowUpRight size={15} /></button>
                        </div>
                        <div className="flex flex-col gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px] mt-10">
                            <span className="text-[16px] opacity-60">ALL IN ONE</span>
                            <span className="text-[24px] text-[#D4D6F5]">Multi-Form Support</span>
                            <span className="text-[20px] text-[#B6B7C5]">Access a wide range of college applications, including Study Certificates, Transfer Certificates and Midday Meals.. all in one place.</span>
                        </div>
                    </div>
                    <div className="flex pt-5 gap-10 ml-10 pr-10">
                        <div className="flex flex-col gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px]">
                            <span className="text-[16px] opacity-60">BUILT IN SECURITY</span>
                            <span className="text-[24px] text-[#D4D6F5]">Secure & Private</span>
                            <span className="text-[20px] text-[#B6B7C5]">Your applications, personal information and approval controls are securely protected with advanced encryptions.</span>
                        </div>

                        <div className="flex flex-col gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px] min-w-[45%]">
                            <span className="text-[16px] opacity-60">ON - TRACK</span>
                            <span className="text-[24px] text-[#D4D6F5]">Seamless Tracking</span>
                            <span className="text-[20px] text-[#B6B7C5]">Stay informed about your application status in real-time with instant updates.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}