export default function NewAdmin() {

    const inputClasses = "outline-none rounded-[5px] p-3 text-[14px] sm:text-[15px] w-full border bg-white";
    const labelClasses = "text-[14px] sm:text-[16px]";

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="min-w-[450px] h-max p-10 rounded-[10px] border border-slate-500 flex flex-col gap-[10px] bg-slate-50 shadow-lg">
                <span className="text-[26px] text-center font-medium w-full">Add new admin</span>
                <div className="flex flex-col gap-5">
                    <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden`} >
                        <span className={labelClasses}>Email</span>
                        <input type="text" placeholder="john@gmail.com" className={inputClasses} />
                    </div>
                    <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden`} >
                        <span className={labelClasses}>Password </span>
                        <input type="password" placeholder="************" className={inputClasses} />
                    </div>
                    <button
                        className="cursor-pointer text-center p-3 text-[15px] sm:text-[17px] bg-indigo-400 rounded-[30px] text-white font-medium mt-2"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}