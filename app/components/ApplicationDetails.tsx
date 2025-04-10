import { useRecoilValue } from "recoil"
import { currentApplicationAtom } from "../store/atoms"
import { ApplicationsResponse } from "../library/types";
import { Status } from "@prisma/client";

export default function NewApplication() {
    const currentApplication = useRecoilValue(currentApplicationAtom) as ApplicationsResponse[0];

    const valueClasses = "outline-none rounded-[5px] text-[19px] w-full min-w-[300px] max-w-full";
    const labelClasses = "text-[20px] font-medium capitalize";

    const colors = {
        [Status.APPROVED]: "bg-green-300",
        [Status.PENDING]: "bg-slate-200",
        [Status.REJECTED]: "bg-red-200"
    }

    return (
        <div className="p-10 flex flex-col bg-white h-full w-full">
            <div className="flex gap-8 flex-wrap w-full h-max">
                <span className={`w-full ${colors[currentApplication.status]} px-4 py-2 rounded-[10px] font-normal tex-[18px]`}>
                    {currentApplication.status === Status.APPROVED &&
                        "Your application has been approved. You may visit the college to collect your certificate(s), if applicable."}

                    {currentApplication.status === Status.PENDING &&
                        "Your application is currently under review by the college admin. You will be notified shortly once it is approved."}

                    {currentApplication.status === Status.REJECTED &&
                        "Unfortunately, your application has been rejected due to incorrect or inappropriate details. You may visit the college to clarify the status or submit a new application."}
                </span>
                {
                    Object.entries(currentApplication.details).map(([key, value], i) => {
                        if (!value || key == "applicationId") return;
                        return (
                            <div key={i} className="p-2 flex flex-col gap-1 w-max ">
                                <span className={labelClasses}>{key}</span>
                                <span className={valueClasses} >
                                    {value?.toString()}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}