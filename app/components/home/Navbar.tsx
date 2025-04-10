import Link from "next/link";
import { inkNut } from "@/app/library/font";

export default function Navbar() {
    return (
        <div className={`w-full backdrop-blur-[10px] h-max text-white flex justify-center items-center select-none px-10 py-6 z-10 sticky top-0 md:flex-nowrap flex-wrap gap-5`}>
            <span className={`block justify-start text-[16px] ${inkNut.className} font-bold`}>Applify</span>
            <div className="flex w-full h-full justify-center items-center gap-2">
                <div className="decoration-none flex gap-4 md:gap-10 flex-wrap justify-center items-center">
                    <a className="text-[12px]" href="#home">Home</a >
                    <a className="text-[12px]" href="#features">Features</a >
                    <a className="text-[12px]" href="#workflow">Workflow</a >
                    <a className="text-[12px]" href="#services">Services</a >
                    <a className="text-[12px]" href="#aboutus">AboutUs</a >
                </div>
            </div>
            <Link href="/auth">
                <button className="self-right w-max text-nowrap px-4 py-2 rounded-[5px] bg-[#1C2D5C] text-[12px] cursor-pointer hidden md:block">Get Started</button>
            </Link>
        </div>
    )
}