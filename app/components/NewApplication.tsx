import { useRecoilValue, useSetRecoilState } from "recoil"
import { activeTabAtom, currentApplicationAtom } from "../store/atoms"
import { NewApplications, sidebarTabs } from "../library/types";

export default function NewApplication() {
    const currentApplication = useRecoilValue(currentApplicationAtom) as NewApplications[0];
    const setActiveTab = useSetRecoilState(activeTabAtom);

    const inputClasses = "outline-none rounded-[5px] p-3 text-[16px] sm:text-[16px] w-full border";
    const labelClasses = "text-[16px] sm:text-[18px] font-normal capitalize";

    const placeholders = {
        name: "John doe",
        rollNo: "U05B..",
        email: "john@gmail.com",
        passingYear: "0000",
        course: "B..",
        description: "I'm filling this...",
        semester: "5"
    }

    return (
        <div className="p-10 flex flex-col bg-white h-full w-full">
            <div className="flex gap-8 flex-wrap w-full h-max">
                <span className="w-full bg-orange-200 px-4 py-2 rounded-[10px] font-normal tex-[18px]">
                    Please fill in the details carefully, as providing incorrect or inappropriate information may lead to the rejection of your application.
                </span>
                {
                    Object.entries(currentApplication.feilds).map(([key, type], i) => {
                        return (
                            <div key={i} className="p-2 flex flex-col gap-1 w-max">
                                <span className={labelClasses}>{key}</span>
                                <input type={type} className={inputClasses} placeholder={placeholders[key as keyof typeof placeholders]} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex w-full h-full mt-5 p-5 items-end justify-end gap-4 self-end">
                <button
                    onClick={() => setActiveTab(sidebarTabs.APPLICATIONS)}
                    className="text-[18px] font-medium border rounded-[30px] px-6 py-2 bg-red-400/90 cursor-pointer hover:bg-red-500/90 transition-all duration-300"
                >Discard</button>
                <button
                    className="text-[18px] font-medium border rounded-[30px] px-6 py-2 bg-green-400/90 cursor-pointer hover:bg-green-500/90 transition-all duration-300"
                >Submit</button>
            </div>
        </div>
    )
}