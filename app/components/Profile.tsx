import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sidebarTabs } from "../library/types";
import { activeTabAtom, profileAtom } from "../store/atoms";
import Loader from "./Loader";
import { breakOnCapital } from "../library/helpers";

export default function Profile() {
    const [userProfile, setUserProfile] = useRecoilState(profileAtom);
    const setActiveTab = useSetRecoilState(activeTabAtom);

    if(Object.entries(userProfile).length == 0){
        return <Loader />
    }

    const inputClasses = "outline-none rounded-[5px] p-3 text-[16px] sm:text-[16px] w-full border";
    const labelClasses = "text-[16px] sm:text-[18px] font-normal capitalize";

    const placeholders = {
        name: "John doe",
        rollNo: "U05B..",
        email: "john@gmail.com",
        phoneNumber: "1234567890",
        passingYear: 0o000,
        course: "B..",
        reason: "I'm filling this...",
        semester: 5,
        section: "A",
        fatherName: "Robert doe",
        languageChoosen: "Hindi",
        dateOfBirth: "1/1/2000",
        motherName: "Alisa",
        nationality: "Indian",
        religion: "Religion",
        dateOfAdmission: "1/1/2022",
        dateOfLeaving: "1/1/2025",
        scst: "No",
        gender: "Male"
    }

    const handler = async (e: any) => {
        try {
            e.preventDefault();
            var details: any = {};
            const formData = new FormData(e.target);
            Object.keys(placeholders).forEach(key => {
                var val = formData.get(key);
                if (val) {
                    const typeOfKey = typeof placeholders[key as keyof typeof placeholders];
                    if (key == "dateOfBirth" || key == "dateOfAdmission" || key == "dateOfLeaving") {
                        details[key] = new Date(val.toString());
                    } else if (typeOfKey == "number") {
                        details[key] = Number(val);
                    } else
                        details[key] = val;
                }
            });
            var body = {
                details
            }
            console.log(body);
            await axios.post("/api/profile", body);
            toast.success("Profile updated!", { duration: 2000 });
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
                        Please ensure that all profile details are filled in accurately, as they will be used directly in the application process.
                    </span>
                    {
                        Object.entries(userProfile ?? {}).map(([key, type], i) => {
                            return (
                                <div key={i} className="p-2 flex flex-col gap-1 w-max">
                                    <span className={labelClasses}>{breakOnCapital(key)}</span>
                                    <input
                                        onChange={(e) => {
                                            setUserProfile(prev => {
                                                return {
                                                    ...prev,
                                                    [key]: e.target.value
                                                }
                                            })
                                        }}
                                        value={
                                            ["dateOfAdmission", "dateOfLeaving", "dateOfBirth"].includes(key) ?
                                                new Date(userProfile[key as keyof typeof userProfile]).toISOString().split("T")[0] :
                                                userProfile[key as keyof typeof userProfile] || ""
                                        }
                                        type={ ["dateOfAdmission", "dateOfLeaving", "dateOfBirth"].includes(key) ?"date": typeof placeholders[key as keyof typeof placeholders]}
                                        className={inputClasses}
                                        required
                                        name={key}
                                        placeholder={placeholders[key as keyof typeof placeholders].toString()}
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
                    >Update Profile</button>
                </div>
            </div>
        </form>
    )
}