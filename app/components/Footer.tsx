import { Facebook, Linkedin, Youtube, Instagram, Earth, Phone, Mail, MapPin } from "lucide-react";
import { outfit, quickSand } from "../library/font";
import Link from "next/link";

export default function Footer() {
    return (
        <div id="aboutus" className={`w-full h-max  bg-[#6262a9] ${outfit.className}`}>
            <div className="w-full h-max  relative flex gap-10 p-10 justify-between items-center">
                <div className="flex flex-col justify-center items-start gap-7 p-5 w-[50%]">
                    <span className="font-bold text-[20px] block">Applify</span>
                    <p className="w-[70%] text-[17px]">An initiative by the Department of Computer Science, BASCK to optimize student application workflows and enhance time efficiency.</p>
                    <div className="flex gap-5 justify-start items-start">
                        <Link href="https://www.facebook.com/groups/12016654077" target="_blank">
                            <span className="block rounded-[50%] bg-[#473B76] cursor-pointer p-2">
                                <Facebook size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.linkedin.com/school/bhandarkars-arts-science-college/" target="_blank">
                            <span className="block rounded-[50%] bg-[#473B76] cursor-pointer p-2">
                                <Linkedin size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.youtube.com/@bhandarkarsartsandsciencec8968" target="_blank">
                            <span className="block rounded-[50%] bg-[#473B76] cursor-pointer p-2">
                                <Youtube size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.instagram.com/bhandakars_college_kundapura" target="_blank">
                            <span className="block rounded-[50%] bg-[#473B76] cursor-pointer p-2">
                                <Instagram size={23} />
                            </span>
                        </Link>
                        <Link href="https://www.basck.in" target="_blank" >
                            <span className="block rounded-[50%] bg-[#473B76] cursor-pointer p-2">
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
                            <MapPin /> Kundapura, Udupi Karnataka India - 576201
                        </span>
                    </div>
                </div>
            </div>
            <div className={`w-full py-6  bg-[#473B76] text-center ${quickSand.className}`}>
                <span className="block text-[17px] font-medium">© 2025 BASCK Computer Science Department. All rights reserved.</span>
            </div>
        </div>
    )
}