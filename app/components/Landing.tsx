import Image from "next/image";

export default function Landing() {
    return (
        <section id="home" className={`text-white h-max xl:h-[100vh] w-[100vw] overflow-hidden relative`}>
            <div className="hero-bg">
            </div>
            <div className="flex flex-col gap-[20px] jsutify-center items-center pt-20 relative p-4 z-2">
                <span className="text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] font-medium text-center">The Only Application Hub You Need</span>
                <span className="text-[16px] md:text-[19px] text-center">Seamlessly navigate, complete and track all your college applications in <br /> one intuitive platform</span>
                <button className="self-right w-max text-nowrap px-8 py-3 rounded-[5px] bg-slate-100 text-slate-800 font-medium text-[12px] md:text-[16px] cursor-pointer mt-4">Take Me In</button>
            </div>
            <div className="w-full h-max relative pt-20 flex justify-center items-center">
                <div className=" w-[75%]">
                    <Image src="dashboard.png" alt="dashboard" />
                </div>
            </div>
        </section>
    )
}
