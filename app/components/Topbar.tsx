import { Bell, CircleHelp, Command, Search } from "lucide-react";

export default function Topbar() {
    return (
        <div className="w-full h-max flex justify-between items-center px-8 py-4 border-b border-slate-400 bg-slate-100">
            <div className="flex flex-col h-full w-max">
                <span className="text-[14px] text-slate-600">
                    Welcome,
                </span>
                <span className="text-[16px] font-regular">
                    John carter
                </span>
            </div>
            <div className="flex justify-between items-center w-full max-w-[700px] bg-white/90 shadow-sm p-2 rounded-[10px]">
                <div className="flex justify-center gap-2 items-center w-full">
                    <Search strokeWidth={2} className="text-slate-600" size={19} />
                    <input type="text" placeholder="Find something" className="text-[15px] w-full border-none outline-none p-[1px] text-slate-700" />
                </div>
                <span className="flex justify-center items-center bg-slate-300/90 px-1 rounded-[5px] gap-1 text-[14px]"><Command size={14} /> K</span>
            </div>
            <div className="flex gap-4">
                <span className="p-2 rounded-[50%] bg-white shadow-sm"><CircleHelp size={18} /></span>
                <span className="p-2 rounded-[50%] bg-white shadow-sm"><Bell size={18} /></span>
            </div>
        </div>
    )
}