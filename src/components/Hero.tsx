import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <>
            <div className="hero h-full lg:h-[110vh] relative p-8 lg:pb-0 pb-[100px] overflow-hidden ">
                <div className="title p-[20px] w-full text-center md:text-left">
                    <span className="font-outfit font-semibold px-5 text-[20px] text-center w-full">FormForge</span>
                </div>
                <div className="w-full flex justify-center lg:justify-around items-center lg:items-start mt-[10%] lg:p-16 pb-[0px] gap-[150px] lg:gap-0 flex-wrap lg:flex-nowrap">
                    <div className="text flex flex-col justify-start md:w-full h-full pt-5 lg:pl-0 md:p-9 md:items-start gap-4 pb-[0px] ">
                        <span className="block font-outfit text-[40px] lg:text-[60px] lg:leading-[80px] font-bold ">Effortless Applications, <br /> Seamless Approvals.</span>
                        <span className="block font-outfit text-[22px]">Apply, track and receive student certificates online - fast, <br /> secure and hassle free.</span>
                        <button className="w-max mt-6 transition-all duration-200 flex justify-center items-center cursor-pointer gap-2 bg-teal-800 p-3 text-white font-semibold font-outfit relative hover:scale-[1.03]  ">Get Started
                            <ArrowRight className="" size={18} /></button>
                    </div>
                    <div className="img w-full md:w-max lg:self-start flex items-center justify-center">
                        <img src="hero-image.png" className="lg:w-[950px] md:w-[70%] relative top-[-80px] select-none" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;