import { useRecoilValue } from "recoil"
import { currentApplicationAtom } from "../../store/atoms"
import { ApplicationsResponse } from "../../library/types";
import { Status, UserType } from "@/prisma/client";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { breakOnCapital } from "@/app/library/helpers";

export default function NewApplication() {
    const currentApplication = useRecoilValue(currentApplicationAtom) as ApplicationsResponse[0];
    const { data: session } = useSession();

    const valueClasses = "outline-none rounded-[5px] text-[17px] w-full min-w-[300px] max-w-full";
    const labelClasses = "text-[18px] font-semibold text-slate-700 capitalize";

    const colors = {
        [Status.APPROVED]: "bg-green-300",
        [Status.PENDING]: "bg-slate-200",
        [Status.REJECTED]: "bg-red-200"
    }

    const getInfo = (): string => {
        var info = "";
        if (session?.user.type != UserType.ADMIN) {
            switch (currentApplication.status) {
                case Status.APPROVED:
                    info = "Your application has been approved. You may visit the college to collect your certificate(s), if applicable.";
                    break;
                case Status.PENDING:
                    info = "Your application is currently under review by the college admin. You will be notified shortly once it is approved.";
                    break;
                default:
                    info = "Unfortunately, your application has been rejected due to incorrect or inappropriate details. You may visit the college to clarify the status or submit a new application."
            }
            return info;
        }
        return `${currentApplication.type.split("_").join(" ")}.`
    }

    const updateStatus = async (status: string) => {
        try {

            await axios.patch("/api/applications", {
                applicationId: currentApplication.applicationId,
                status
            });

            toast.success("Status updated!", { duration: 2000 });
        } catch (e) {
            console.log(e)
            toast.error("Error occured: " + e, { duration: 2000 });
        }
    }

    return (
        <div className="p-10 flex flex-col bg-white h-full w-full">
            <div className="flex gap-8 flex-wrap w-full h-max">
                <span className={`w-full ${colors[currentApplication.status]} px-4 py-2 rounded-[10px] font-normal tex-[18px]`}>
                    {getInfo()}
                </span>
                {
                    Object.entries(currentApplication.details || {}).map(([key, value], i) => {
                        if (!value || ["id", "userId"].includes(key)) return;
                        return (
                            <div key={i} className="p-2 flex flex-col gap-1 w-max ">
                                <span className={labelClasses}>{breakOnCapital(key)}</span>
                                <span className={valueClasses} >
                                    {!["dateOfAdmission", "dateOfLeaving", "dateOfBirth"].includes(key) ? value?.toString() : new Date(value).toLocaleDateString()}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
            {
                session?.user.type == UserType.ADMIN && (

                    <div className="flex w-full h-full mt-5 p-5 items-end justify-end gap-4 self-end">
                        <button
                            onClick={() => updateStatus(Status.REJECTED)}
                            className="text-[18px] font-medium border rounded-[30px] px-6 py-2 bg-red-400/90 cursor-pointer hover:bg-red-500/90 transition-all duration-300"
                        >Reject</button>
                        <button
                            onClick={() => updateStatus(Status.APPROVED)}
                            className="text-[18px] font-medium border rounded-[30px] px-6 py-2 bg-green-400/90 cursor-pointer hover:bg-green-500/90 transition-all duration-300"
                        >Approve</button>
                    </div>
                )
            }
        </div>
    )
}