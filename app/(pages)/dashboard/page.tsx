import Sidebar from "@/app/components/Sidebar";
import { poppins } from "@/app/library/font";

export default function Dashboard() {
    return (
        <div className={`flex w-full h-full min-h-[100vh] ${poppins.className}`}>
            <Sidebar />
        </div>
    )
}