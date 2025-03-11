import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


const Working = () => {
    // use motion path
    const cardClass = "max-w-[500px] xl:h-[300px] h-full w-full h-auto, p-8 rounded-[10px] bg-green-100 shadow-lg ";
    const cardTitle = "font-outfit lg:text-[24px] text-[22px] font-semibold text-slate-900 mb-2";
    const cardDescription = "font-outfit lg:text-[22px] text-[20px]";

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end center"] });

    const pathForA = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
    const pathForB = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
    const pathForC = useTransform(scrollYProgress, [0.65, 0.9], [0, 1]);

    return (
        <div className="w-full h-full flex justify-start relative items-center bg-green-600 p-10 lg:py-20 flex-col relative" >
            <div className="absolute bg-white h-[200vh] top-[-300px]" ref={containerRef}></div>
            {/* <div className="w-full h-[100px] bg-green-600 absolute top-[-60px] " style={{ clipPath: "polygon(0 60%, 100% 0%,100% 100%,0% 100%)" }}></div> */}
            <span className="font-outfit text-[40px] font-bold self-center text-slate-900 mb-[70px]">How it works</span>
            <div className='w-full h-full flex flex-col justify-center items-center mx-[10px] mt-10 flex-wrap lg:w-[80%] px-6  self-center gap-[60px] lg:gap-0'>
                <div className="self-start w-full flex items-center justify-center lg:justify-start">
                    <div className={`${cardClass} self-start`}>
                        <h1 className={cardTitle}>Application Submission</h1>
                        <p className={cardDescription}>
                            The student selects an application, fills in the required details and submits it for review.
                        </p>
                    </div>
                    <div className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block relative">
                        <svg width="500" height="400" viewBox="0 0 500 300">
                            <path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute top-0">
                            <motion.path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="lightgreen"
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
                                stroke="lightgreen"
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
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                    </div>
                    <div className={`${cardClass} self-start`} >
                        <h1 className={cardTitle}>Admin Notification</h1>
                        <p className={cardDescription}>
                            The system automatically notifies the admin about the new application submitted by the student.
                        </p>
                    </div>
                </div>
                <div className="self-start w-full flex items-center justify-center lg:justify-start ">
                    <div className={`${cardClass} self-start`}>
                        <h1 className={cardTitle}>Admin Review</h1>
                        <p className={cardDescription}>
                            The admin reviews the application and either approves or rejects it based on the provided details.
                        </p>
                    </div>
                    <div className="w-[500px] h-[400px] flex items-center justify-center hidden lg:block relative">
                        <svg width="500" height="400" viewBox="0 0 500 300">
                            <path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="grey"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                            />
                        </svg>
                        <svg width="500" height="400" viewBox="0 0 500 300" className="absolute top-0">
                            <motion.path
                                d="M0 70 Q 450 -40, 350 400"
                                fill="none"
                                stroke="lightgreen"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="1 1"
                                pathLength={pathForC}
                            />
                        </svg>
                    </div>
                </div>
                <div className="self-start w-full flex items-center justify-center lg:justify-end ">
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
                            The student receives a notification once the admin has reviewed and processed the application.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Working;