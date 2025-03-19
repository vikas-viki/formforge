import { Earth, Facebook, Instagram, Linkedin, LocateIcon, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { quickSand } from "../library/font";

const Footer = () => {

    return (
        // <div
        //     className='relative h-[390px]'
        //     style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        // >
        //     <div className='relative h-[calc(100vh+390px)] -top-[100vh]'>
        //         <div className='h-[390px] sticky top-[calc(100vh-390px)]'>
        <div className="w-full h-max bg-green-300">
            <div className="w-full h-max bg-green-300 relative flex gap-10 p-10 justify-between items-center">
                <div className="flex flex-col justify-center items-start gap-7 p-5 w-[50%]">
                    <span className="font-bold text-[20px] block">FormForge</span>
                    <p className="w-[70%] text-[17px]">Streamline form submissions, simplify approvals, and ensure seamless communication between students, teachers, and admins with real-time updates.</p>
                    <div className="flex gap-5 justify-start items-start">
                        <Link href="https://www.facebook.com/groups/12016654077" target="_blank">
                            <span className="block rounded-[50%] bg-green-500 cursor-pointer p-2">
                                <Facebook size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.linkedin.com/school/bhandarkars-arts-science-college/" target="_blank">
                            <span className="block rounded-[50%] bg-green-500 cursor-pointer p-2">
                                <Linkedin size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.youtube.com/@bhandarkarsartsandsciencec8968" target="_blank">
                            <span className="block rounded-[50%] bg-green-500 cursor-pointer p-2">
                                <Youtube size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.instagram.com/bhandakars_college_kundapura" target="_blank">
                            <span className="block rounded-[50%] bg-green-500 cursor-pointer p-2">
                                <Instagram size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.basck.in" target="_blank" >
                            <span className="block rounded-[50%] bg-green-500 cursor-pointer p-2">
                                <Earth size={23} />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-5 p-5 w-[50%] justify-start self-start">
                    <span className="block font-bold text-[20px]">Contact</span>
                    <div className="flex flex-col gap-4">
                        <span className="flex gap-2">
                            <Phone /> (+91) 1234567890
                        </span>
                        <span className="flex gap-2">
                            <Mail /> contact@basck.in
                        </span>
                        <span className="flex gap-2">
                            <MapPin /> 123, Lorem Ipsum, Dolor Sit, Amet
                        </span>
                    </div>
                </div>
            </div>
            <div className={`w-full py-6  bg-green-400 text-center ${quickSand.className}`}>
                <span className="block text-[17px] font-medium">© 2025 FormForge. All rights reserved | An initiative by Dept of CS, BASCK</span>
            </div>
        </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Footer;

// This structure creates a sticky footer that appears at the right scroll position.

// 1️⃣ Outer div (390px height) - Wrapper for the footer area.
// 2️⃣ Tall div (100vh + 390px, moved up by 100vh) - Creates extra scroll space.
// 3️⃣ Sticky div (390px height, sticks at `100vh - 390px`) - Becomes visible at the right time.