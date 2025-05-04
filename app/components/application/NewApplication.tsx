import { useRecoilValue, useSetRecoilState } from "recoil"
import { activeTabAtom, currentApplicationAtom, profileAtom } from "@/app//store/atoms"
import { NewApplications, sidebarTabs } from "@/app//library/types";
import axios from "axios";
import toast from "react-hot-toast";

export default function NewApplication() {
    const currentApplication = useRecoilValue(currentApplicationAtom) as NewApplications[0];
    const setActiveTab = useSetRecoilState(activeTabAtom);
    const profileDetails = useRecoilValue(profileAtom);

    const inputClasses = "outline-none rounded-[5px] p-3 text-[16px] sm:text-[16px] w-full border";
    const labelClasses = "text-[16px] sm:text-[18px] font-regular capitalize";

    const placeholders = {
        name: "John doe",
        gender: "Male",
        rollNo: "U05B..",
        email: "john@gmail.com",
        phoneNumber: "0123456789",
        passingYear: 0o000,
        joiningYear: 2022,
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
        motherName:"Emily"
    }

    const handler = async (e: any) => {
        try {
            e.preventDefault();
            var details: any = {};
            const formData = new FormData(e.target);
            Object.keys(placeholders).forEach(key => {
                var val = formData.get(key);

                if (val) {
                    details[key] = val;
                    if (typeof placeholders[key as keyof typeof placeholders] == "number") {
                        details[key] = Number(val);
                    }
                    console.log(key, key == "dateOfBirth");
                    if (key == "dateOfBirth") {
                        details[key] = new Date(val.toString()).toISOString()
                    }
                }
            });
            var body = {
                type: currentApplication.type,
                details
            }
            console.log(details)
            await axios.post("/api/applications", body);
            toast.success("Application submitted!", { duration: 2000 });
            setActiveTab(sidebarTabs.PENDING);
        } catch (e: any) {
            toast.error(`Error occurred: ${e.toString()}`, { duration: 2000 })
        }
    }

    return (
        <form onSubmit={handler}>
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
                                    <input
                                        defaultValue={profileDetails[key as keyof typeof profileDetails]}
                                        type={type}
                                        className={inputClasses}
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