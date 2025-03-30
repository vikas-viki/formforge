import Image from "next/image";
import { outfit } from "../library/font";

export default function Services() {
    return (
        <div id="services" className={`flex justify-center items-center w-full h-full flex-col mt-45 mb-20 ${outfit.className} `}>
            <div className="w-full md:w-[90%] p-5 md:p-10">
                <div className="flex flex-col z-2 gap-2 features-head p-4 mb-4">
                    <span className="text-[#AEB3F8] self-start block text-[18px] md:text-[22px]">Services</span>
                    <span className="text-[#D4D6F5] text-[30px] md:text-[35px] pt-2">Available Applications</span>
                    <span className="opacity-90 text-[#D2D4F5] text-[19px] md:text-[22px] leading-[28px] md:w-[45%] pt-2">From seat reservation for admission to obtain transfer certificate after graduation.</span>
                </div>
                <div className="p-2 md:p-10 flex- items-center justify-center">
                    <Image src="services.svg" alt="" />
                </div>
            </div>
        </div>
    )
}