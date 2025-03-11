import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ScrambleText from "./ScrambleText";

// a thrown paint spread behiend hero image.

const Hero = () => {
    return (
        <>
            <div className="hero h-full lg:h-[110vh] relative p-8  lg:pb-0 pb-[100px] overflow-hidden ">
                <div className="title p-[20px] w-full text-center md:text-left">
                    <span className="font-outfit font-semibold px-5 text-[20px] text-center w-full"><ScrambleText text="FormForge" speed={80} /></span>
                </div>
                <div className="w-full flex justify-center lg:justify-around items-center lg:items-start mt-[10%] lg:p-16 pb-[0px] gap-[150px] lg:gap-0 flex-wrap lg:flex-nowrap">
                    <div className="text flex flex-col justify-start md:w-full h-full pt-5 lg:pl-0 md:p-9 md:items-start gap-4 pb-[0px] ">
                        <span data-aos="flip-left" className="block font-outfit text-[40px] lg:text-[60px] lg:leading-[80px] font-bold ">
                            Effortless Applications, <br />
                            Seamless Approvals.
                        </span>
                        <span className="block font-outfit text-[22px]" data-aos="fade-up" data-aos-delay="200">Apply, track and receive student certificates online - fast, <br /> secure and hassle free.</span>
                        <button data-aos="zoom-in-up" data-aos-delay="300" className="w-max mt-6 transition-all duration-200 flex justify-center items-center cursor-pointer gap-2 bg-teal-800 p-3 text-white font-semibold font-outfit relative hover:scale-[1.03]  ">Get Started
                            <ArrowRight className="" size={18} /></button>
                    </div>
                    <div className="img w-full md:w-max lg:self-start flex items-center justify-center">
                        <Image
                            src="/hero-img.svg"
                            data-aos="fade-in"
                            data-aos-delay="500"
                            width={950} // Set a proper width
                            height={480} // Adjust the height as per your image ratio
                            className="relative top-[-50px]"
                            alt="applications list"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;