import { poppins } from "../library/font";
import Navbar from "./Navbar";

export default function Landing() {
    return (
        <section className={`text-white h-[100vh] w-[100vw] overflow-hidden relative`}>
            <div className="hero-bg">
            </div>
            <Navbar />
            <div className="flex flex-col gap-[20px] jsutify-center items-center pt-20 relative z-10">
                <span className="text-[60px] font-medium">The Only Application Hub You Need</span>
                <span className="text-[19px] text-center">Seamlessly navigate, complete and track all your college applications in <br /> one intuitive platform</span>
                <button className="self-right w-max text-nowrap px-8 py-3 rounded-[5px] bg-[#1C2D5C] text-[16px] cursor-pointer mt-4">Take Me In</button>
            </div>
            <div className="w-full h-max relative pt-20 flex justify-center items-center">
                <div className=" w-[75%]">
                    <img src="dashboard.png" alt="dashboard" />
                </div>
            </div>
        </section>
    )
}
