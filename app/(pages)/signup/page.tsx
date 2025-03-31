"use client";
import { inkNut, outfit, poppins } from "@/app/library/font";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
    const [isSignup, setIsSignup] = useState(true);

    const inputClasses = "outline-none rounded-[5px] p-3 text-[14px] sm:text-[15px] w-full border";
    const labelClasses = "text-[14px] sm:text-[16px]";

    return (
        <div className={`bg-[#131336] w-full min-h-[100vh] text-black flex justify-center items-start ${poppins.className} p-5 sm:p-10 `}>
            <div className="shadow-xl w-full md:w-[1000px] mt-[3%] bg-[#28145E] max-h-full transition-all duration-300 rounded-[10px] overflow-hidden flex border-[0.5px] border-slate-400 flex-col-reverse md:flex-row ">
                <div className="md:w-[50%] p-8 sm:p-10 bg-[#F3F0FF] rounded-[10px] md:rounded-0 ">
                    <span className={`text-[20px] sm:text-[22px] font-bold ${inkNut.className}`}>Applify</span>
                    <form className="flex flex-col gap-6 min-h-max ">
                        <div className="flex flex-col gap-1 mt-5">
                            <span className="text-[18px] sm:text-[20px] font-medium">{isSignup ? "Create an account" : "Welcome back!"}</span>
                            <span className="text-[14.5px] sm:text-[15px]">
                                {isSignup ? "Sign up today to unlock the full benefits of Applify!" :
                                    "Login to get updates on your applications."}
                            </span>
                        </div>
                        <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden ${isSignup ? "max-h-[100px] my-0" : "max-h-[0px] -my-4"}`} >
                            <span className={labelClasses}>Full name</span>
                            <input type="text" placeholder="John carter" className={inputClasses} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className={labelClasses}>Email</span>
                            <input type="email" placeholder="john@gmail.com" className={inputClasses} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className={labelClasses}>Password</span>
                            <input type="password" placeholder="Password" className={inputClasses} />
                        </div>
                        <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden ${isSignup ? "max-h-[100px] my-0" : "max-h-[0px] -my-4"}`}>
                            <span className={labelClasses}>Confirm Password</span>
                            <input type="password" placeholder="Password" className={inputClasses} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2 justify-start items-center">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe" className="cursor-pointer text-[14px] sm:text-[16px]">remember me</label>
                            </div>
                            <button
                                className="cursor-pointer text-center p-3 text-[15px] sm:text-[17px] bg-[#402d89] rounded-[30px] text-white font-medium"
                            >
                                Sign {isSignup ? "up" : "in"}
                            </button>
                        </div>
                        <span className="text-[14px] sm:text-[15px] text-center">{isSignup ? "Already" : "Don't"} have an account ?
                            <span className="font-semibold cursor-pointer"
                                onClick={() => setIsSignup(prev => !prev)}
                            > Sign {isSignup ? "in" : "up"}</span>
                        </span>
                    </form>
                </div>
                <div className={` md:w-[50%] text-white flex flex-col p-8 sm:p-10 gap-6 rounded-t-[10px] md:rounded-t-0 ${outfit.className}`}>
                    <span className={`text-[24px] sm:text-[28px] md:text-[30px] font-medium ${outfit.className}`}>Smart Applications,<br />Swift Approvals</span>
                    <span className="text-[17px] sm:text-[18px]">Applify streamlines the application process, allowing you to stay focused on your work. A seamless platform to manage all your applications in one place.</span>
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center sm:text-[17px] sm:text-[18px] gap-2"><BadgeCheck fill="indigo" size={20} /> Less clicks</span>
                        <span className="flex items-center sm:text-[17px] sm:text-[18px] gap-2"><BadgeCheck fill="indigo" size={20} /> Faster approvals</span>
                        <span className="flex items-center sm:text-[17px] sm:text-[18px] gap-2"><BadgeCheck fill="indigo" size={20} /> Instant updates</span>
                    </div>
                </div>
            </div >
        </div >
    )
}

