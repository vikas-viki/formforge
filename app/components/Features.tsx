import { ArrowUpRight } from "lucide-react";
import { outfit } from "../library/font";

export default function Features() {
    return (
        <section className={`w-[100vw] h-max overflow-hidden p-20 ${outfit.className} relative flex flex-col justfiy-center items-center`}>
            <span className="text-[#AEB3F8] self-start block pl-[5%] text-[24px]">Features</span>
            <div className=" grid grid-cols-2 h-full bg-[#161624] relative rounded-[15px] w-[90%] border-[0.6px] outline-none mt-10 overflow-hidden">
                <div className="features-bg">

                </div>
                <div className="flex flex-col gap-4 z-2 p-4 bg-[#161624] features-head justify-start h-[100%]">
                    <span className="font-medium text-[30px] text-[#D1D5DB]">Why Choose Applify?</span>
                    <span className="text-[22px] text-[#D2D4F5] leading-[26px]">Streamline the application process and verification in a single, centralized platform.</span>
                    <button className="flex gap-2 bg-[#6D99F1] py-2 w-max text-[15px] px-3 mt-3 justify-center items-center">Get Started<ArrowUpRight size={15} /></button>
                </div>
                <div className="flex flex-col gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px] m-8 ml-0 mb-11  z-2 mt-20">
                    <span className="text-[16px] opacity-60">ALL IN ONE</span>
                    <span className="text-[24px] text-[#D4D6F5]">Multi-Form Support</span>
                    <span className="text-[20px] text-[#B6B7C5]">Access a wide range of college applications, including Study Certificates, Transfer Certificates and Midday Meals.. all in one place.</span>
                </div>

                <div className="flex flex-col gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px] mb-8 z-2 ml-20 w-[98%]">
                    <span className="text-[16px] opacity-60">BUILT IN SECURITY</span>
                    <span className="text-[24px] text-[#D4D6F5]">Secure & Private</span>
                    <span className="text-[20px] text-[#B6B7C5]">Your applications, personal information and approval controls are securely protected with advanced encryption mechanisms.</span>
                </div>

                <div className="flex flex-col  gap-3 p-10 rounded-[20px] bg-[#12121C] border-[0.6px] mb-8 mr-8 z-2 w-[80%] justify-self-end">
                    <span className="text-[16px] opacity-60">ON - TRACK</span>
                    <span className="text-[24px] text-[#D4D6F5]">Seamless Tracking</span>
                    <span className="text-[20px] text-[#B6B7C5]">Stay informed about your application status in real-time with instant updates.</span>
                </div>
            </div>
        </section>
    )
}