"use client"
import { Bell, CircleHelp, Command, Search } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchFilterAtom, userDetailsAtom } from "@/app/store/atoms";
import { useEffect, useRef } from "react";

export default function Topbar() {
    const userDetails = useRecoilValue(userDetailsAtom);

    return (
        <div className="w-full h-max relative flex justify-between items-center px-8 py-4 border-b border-[#BCB7B7] bg-white/20">
            <div className="topbar-bg"></div>
            <div className="flex flex-col h-full w-max">
                <span className="text-[14px] text-slate-600">
                    Welcome,
                </span>
                <span className="text-[16px] font-regular">
                    {userDetails.name || "John carter"}
                </span>
            </div>
            {userDetails.type == "ADMIN" && <SearchFilter />}
            <div className="flex gap-4">
                <span className="p-2 rounded-[50%] bg-white shadow-sm"><CircleHelp size={18} /></span>
                <span className="p-2 rounded-[50%] bg-white shadow-sm"><Bell size={18} /></span>
            </div>
        </div>
    )
}

const SearchFilter = () => {
    const [searchFilter, setSearchFilter] = useRecoilState(searchFilterAtom);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        });
    }, [])
    return (
        <div className="flex justify-between items-center w-full max-w-[700px] bg-white/90 shadow-sm p-2 rounded-[10px]">
            <div className="flex justify-center gap-2 items-center w-full">
                <Search strokeWidth={2} className="text-slate-600" size={19} />
                <input ref={inputRef} type="text" placeholder="Find by Registration Number" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} className="text-[15px] w-full border-none outline-none p-[1px] text-slate-700" />
            </div>
            <span className="flex justify-center items-center bg-slate-300/90 px-1 rounded-[5px] gap-1 text-[14px]"><Command size={14} /> K</span>
        </div>
    )
}