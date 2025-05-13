import { useRecoilValue, useSetRecoilState } from "recoil"
import { activeTabAtom, currentApplicationAtom, profileAtom } from "@/app//store/atoms"
import { NewApplications, sidebarTabs } from "@/app//library/types";
import axios from "axios";
import toast from "react-hot-toast";
import { breakOnCapital } from "@/app/library/helpers";

export default function NewApplication() {
    const currentApplication = useRecoilValue(currentApplicationAtom) as NewApplications[0];
    const setActiveTab = useSetRecoilState(activeTabAtom);
    const profileDetails = useRecoilValue(profileAtom);

    const labelClasses = "text-sm font-medium sm:text-[18px] capitalize";

    const placeholders = {
        name: "John doe",
        gender: "Male",
        rollNo: "U05B..",
        email: "john@gmail.com",
        phoneNumber: "0123456789",
        passingYear: 0o000,
        course: "B..",
        reason: "I'm filling this...",
        semester: 5,
        section: "A",
        fatherName: "Robert doe",
        dateOfBirth: "",
        languageChoosen: "Hindi",
        scst: "Yes or No",
        dateOfAdmission: "",
        dateOfLeaving: "",
        nationality: "Indian",
        religion: "Hindu",
        motherName: "Emily"
    }

    const handler = async (e: any) => {
        try {
            e.preventDefault();
            var details: any = {};
            const formData = new FormData(e.target);
            const reason = formData.get("reason");
            var body = {
                type: currentApplication.type,
                reason
            }
            console.log(details)
            await axios.post("/api/applications", body);
            toast.success("Application submitted!", { duration: 2000 });
            setActiveTab(sidebarTabs.PENDING);
        } catch (e: any) {
            toast.error(`Error occurred: ${e.toString()}`, { duration: 2000 })
        }
    }

    const getDefaultValue = (key: string, value: string) => {
        if (["dateOfAdmission", "dateOfLeaving", "dateOfBirth"].includes(key)) {
            return new Date(value).toISOString().split("T")[0];
        }
        return value;
    }

    return (
        <form onSubmit={handler}>
            <div className="p-10 flex flex-col bg-white h-full w-full">
                <div className="flex gap-8 flex-wrap w-full h-max">
                    <span className="w-full bg-orange-200 px-4 py-2 rounded-[10px] font-normal tex-[18px]">
                        Please fill in the details carefully,
                        most of the details are directly fetched from the profile, make sure to update it correctly.
                    </span>
                    {
                        Object.entries(currentApplication.feilds).map(([key, type], i) => {
                            return (
                                <div key={i} className={`p-2 flex flex-col gap-1 w-max min-w-[22%] `}>
                                    <span className={labelClasses}>{breakOnCapital(key)}</span>
                                    <input
                                        disabled={profileDetails[key as keyof typeof profileDetails] != null}
                                        defaultValue={getDefaultValue(key, profileDetails[key as keyof typeof profileDetails])}
                                        type={type}
                                        className={`outline-none rounded-[5px] text-[16px] sm:text-[16px] w-full border ${profileDetails[key as keyof typeof profileDetails] ? "border-none text-slate-600 font-medium p-0" : "p-3"}`}
                                        required
                                        name={key}
                                        placeholder={placeholders[key as keyof typeof placeholders]?.toString()}
                                    />
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
                        type="submit"
                        className="text-[18px] font-medium border rounded-[30px] px-6 py-2 bg-green-400/90 cursor-pointer hover:bg-green-500/90 transition-all duration-300"
                    >Submit</button>
                </div>
            </div>
        </form>
    )
}