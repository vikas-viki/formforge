"use client";

import { useRef, useState } from "react";
import { outfit } from "../library/font";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// start using zustand
// when user visits admin page, make a req, using session id, check for type and redirect if not admin. Same goes for user.
// for admin login 

const Login = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const loginBtnRef = useRef<HTMLSpanElement>(null);
    const signupBtnRef = useRef<HTMLSpanElement>(null);
    const router = useRouter();

    const switchToSignup = () => setActiveTab("signup");
    const switchToLogin = () => setActiveTab("login");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");
            const cPassword = formData.get("cPassword");
            const rememberMe = formData.get("rememberMe");

            if (activeTab == "signup" && password !== cPassword) {
                return toast.error("Passwords don't match!");
            }

            const res = await axios.post(`/api/auth?action=${activeTab}`, {
                email,
                password,
                rememberMe: rememberMe == "on"
            });

            if (res.status == 200) {
                toast.success(activeTab + " successful");

                router.push(`/${res.data.type.toLowerCase()}`)
            }
        } catch (e: any) {
            console.log(e);
            toast.error(e?.response?.data?.message.split("_").join(" ").toLowerCase() || "Error occurred!");
        }
    }

    return (
        <div className={`w-[100vw] min-h-[100vh] bg-green-400 font-outfit p-10 flex justify-center items-start pt-[10%] select-none ${outfit.className}`}>
            <data className="flex gap-10 p-10 shadow-xl bg-green-600 h-max w-max rounded-[10px] flex-wrap justify-center items-center lg:justify-start lg:items-start">
                <div className="flex flex-col gap-2 justify-start items-start w-full max-w-[500px] text-center lg:text-left lg:max-w-[300px]">
                    <span className="text-[26px] md:text-[30px] font-bold brightness-60">
                        Get your certificates approved at one place.
                    </span>
                </div>
                <div className="bg-green-100  h-max flex flex-col gap-6 p-10 w-full md:w-[420px] rounded-[10px]">
                    <div className="flex border-b border-gray-300 relative">
                        <span
                            ref={loginBtnRef}
                            className={`relative w-[50%] text-center cursor-pointer block pb-1
                                        before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-black
                                        before:origin-right before:scale-x-0 before:transition-transform before:duration-300
                                        ${activeTab === "login" ? "before:scale-x-100 font-bold" : "text-gray-500 "}`}
                            onClick={switchToLogin}
                        >
                            Login
                        </span>
                        <span
                            ref={signupBtnRef}
                            className={`relative w-[50%] text-center cursor-pointer block pb-1
                                        before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-black
                                        before:origin-left before:scale-x-0 before:transition-transform before:duration-300
                                        ${activeTab === "signup" ? "before:scale-x-100 font-bold" : "text-gray-500"}`}
                            onClick={switchToSignup}
                        >
                            Signup
                        </span>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="flex flex-col gap-6 center">
                            <div className="flex flex-col ">
                                <label htmlFor="email" className="text-[18px] pl-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    id="email"
                                    name="email"
                                    placeholder="JohnDoe@gmail.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className="outline-none border-[1px] rounded-[10px] px-4 py-2 text-[17.4px]"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-[18px] pl-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    minLength={8}
                                    className="outline-none border-[1px] rounded-[10px] px-4 py-2 text-[17.4px]"
                                />
                            </div>
                            <div className={`flex flex-col transition-all duration-400 overflow-hidden ${activeTab === "login" ? "max-h-[0px] -my-4" : "max-h-[100px] my-0"}`}>
                                <label htmlFor="cPassword" className="text-[18px] pl-1">Confirm Password</label>
                                <input
                                    type="password"
                                    required={activeTab === "signup"}
                                    id="cPassword"
                                    name="cPassword"
                                    value={cpassword}
                                    onChange={(e) => { setcPassword(e.target.value) }}
                                    placeholder="********"
                                    minLength={8}
                                    className="outline-none border-[1px] rounded-[10px] px-4 py-2 text-[17.4px]"
                                />
                            </div>
                            <div className={`flex justify-start opacity-[0.65] items-center gap-2 pl-1`}>
                                <input type="checkbox" id="remember" name="rememberMe" className="w-[15px] h-[15px] accent-green-700 " />
                                <label className="text-[17px] cursor-pointer" htmlFor="remember">remember me</label>
                            </div>
                            <div className="relative">
                                <button
                                    className={`border w-full px-4 mt-4 py-3 text-[17px] bg-green-700 transition-all duration-300 cursor-pointer hover:bg-green-800 text-white rounded-[10px] hover:shadow-lg hover:scale-101 ${activeTab != "login" && "hidden"}`}
                                    type="submit"
                                >
                                    Login</button>
                                <button
                                    className={`border w-full px-4 mt-4 py-3 text-[17px] bg-green-700 transition-all duration-300 cursor-pointer hover:bg-green-800 text-white rounded-[10px] hover:shadow-lg hover:scale-101 ${activeTab == "login" && "hidden"}`}
                                    type="submit"
                                >
                                    Signup</button>
                            </div>
                        </div>
                    </form>
                </div>
            </data>
        </div>
    )
}

export default Login;