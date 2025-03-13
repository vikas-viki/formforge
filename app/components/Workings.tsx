import { motion, useScroll, useTransform } from "framer-motion";
import { Bell, CheckCircle, ClipboardCheck, FileCheck, ScrollText } from "lucide-react";
import { useRef } from "react";


const Working = () => {
    // use motion path
    // connect all svg lines (somehow)
    const cardTitle = "font-outfit lg:text-[24px] text-[22px] font-semibold text-slate-900 mb-2 flex justify-start items-center gap-2";
    const cardDescription = "font-outfit lg:text-[22px] text-[20px] flex flex-col w-full";
    const cardClass = "max-w-[500px] xl:h-[300px] h-full w-full p-8 rounded-[10px] bg-white/80 shadow-lg overflow-hidden relative workings_svg ";
    const svgStyles = "text-green-800 stroke-[1.5] self-end absolute bottom-[0px] opacity-[0.35] w-[45%] h-[70%]";



    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end center"] });

    const pathForA = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
    const pathForB = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
    const pathForC = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);

    return (
        <div className="w-full h-full flex justify-start relative items-center  p-10 lg:py-20 flex-col relative" >
            <div className="absolute bg-white h-[200vh] top-[-300px]" ref={containerRef}></div>
            {/* <div className="w-full h-[100px] bg-green-600 absolute top-[-60px] " style={{ clipPath: "polygon(0 60%, 100% 0%,100% 100%,0% 100%)" }}></div> */}
            <span className="font-outfit text-[40px] font-bold self-center text-slate-900 mb-[70px]">How it works</span>
            <div className='w-full h-full flex flex-col justify-center items-center mx-[10px] mt-10 flex-wrap lg:w-[80%] px-6  self-center gap-[60px] lg:gap-0'>
                <div className="self-start w-full flex items-center justify-center lg:justify-start">
                    <div data-aos="flip-left" className={`${cardClass} self-start`}>
                        <h1 className={cardTitle}>
                            Application Submission
                        </h1>
                        <p className={cardDescription}>
                            <span>
                                The student selects an application, fills in the required details and submits it for review.
                            </span>
                            <ClipboardCheck className={`${svgStyles} right-[-20px]`} />
                        </p>
                    </div>
                    <div data-aos="fade-up" className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block relative">
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute">
                            <path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="lightgreen"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute top-0">
                            <motion.path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                                pathLength={pathForA}
                            />
                        </svg>
                    </div>
                </div>
                <div className="self-start w-full flex items-start justify-center lg:justify-end ">
                    <div className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block">
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute">
                            <motion.path
                                d="M500 70 Q 50 0, 150 400"
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                                pathLength={pathForB}
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300">
                            <path
                                d="M500 70 Q 50 0, 150 400"
                                fill="none"
                                stroke="lightgreen"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                    </div>
                    <div data-aos="flip-right" className={`${cardClass} self-start`} >
                        <h1 className={cardTitle}>
                            Admin Notification
                        </h1>
                        <p className={cardDescription}>
                            <span>
                                The system automatically notifies the admin about the new application submitted by the student.
                            </span>
                            <Bell className={`${svgStyles} right-[-12px]`} />
                        </p>
                    </div>
                </div>
                <div className="self-start w-full flex items-center justify-center lg:justify-start ">
                    <div data-aos="flip-left" className={`${cardClass} self-start`}>
                        <h1 className={cardTitle}>

                            Admin Review
                        </h1>
                        <p className={cardDescription}>
                            <span>
                                The admin reviews the application and either approves or rejects it based on the provided details.
                            </span>
                            <ScrollText className={`${svgStyles} right-[0px]`} />
                        </p>
                    </div>
                    <div className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block relative">
                        <svg width="500" height="400" viewBox="0 0 500 300">
                            <path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="lightgreen"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute top-0">
                            <motion.path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                                pathLength={pathForC}
                            />
                        </svg>
                    </div>
                </div>
                <div data-aos="flip-left" className="self-start w-full flex items-center justify-center lg:justify-end ">
                    <div className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block relative">
                        <svg width="500" height="400" viewBox="0 0 500 300">
                            <path
                                d=""
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute top-0">
                            <motion.path
                                d=""
                                fill="none"
                                stroke="lightgreen"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                    </div>
                    <div className={`${cardClass} self-start`}>
                        <h1 className={cardTitle}>Student Notification</h1>
                        <p className={cardDescription}>
                            <span>
                                The student receives a notification once the admin has reviewed and processed the application.
                            </span>
                            <CheckCircle className={`${svgStyles} right-[0px]`} />
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Working;