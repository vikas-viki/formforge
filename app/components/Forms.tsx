export const Forms = () => {

    const applications = [
        "Transfer Certificate",
        "Study Certificate",
        "Seat Reservation",
        "Mid-day Meal",
        "Conveyance Letter",
    ]

    return (
        <div className="w-[100vw] h-full relative">
            {/* polygon(top-left, top-right, bottom-right, bottom-left) */}
            <div className="absolute w-full h-[100px] bg-green-500 top-[-60px]" style={{ clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0 100%)" }}></div>

            <div className="w-full h-full flex flex-col justify-center items-center bg-green-500 md:p-20 p-10">
                <span className="font-outfit text-[35px] font-bold text-slate-900 text-center" >Requests you can submit</span>
                <div className="w-full h-full flex justify-center items-center gap-16 py-16 flex-wrap">
                    {applications.map((application, index) => (
                        <div key={index} className="relative flex justify-center items-center w-[350px] h-[250px] bg-green-200 border border-green-900 rounded-[13px] p-4 mt-4 group overflow-hidden">
                            <span className="font-outfit text-[18px]">{application}</span>
                            <div className="overflow-hidden absolute inset-0 flex justify-center items-center bg-transparent group-hover:bg-[#a9e4b2] transition-all duration-300">
                                <button className="font-outfit font-semibold px-[15px] py-[6px] cursor-pointer absolute top-[300px] bg-green-700 text-white p-2 rounded-md transition-all group-hover:top-[43%] duration-300">Apply</button>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Forms;