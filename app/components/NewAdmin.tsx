import axios from "axios";
import toast from "react-hot-toast";

export default function NewAdmin() {
    const inputClasses = "outline-none rounded-[15px] p-3 text-[14px] sm:text-[15px] w-full border bg-white";
    const labelClasses = "text-[14px] sm:text-[16px]";

    const handler = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);

            const email = formData.get("email");
            const password = formData.get("password");
            const name = formData.get("name");

            await axios.post("/api/admin", { email, password, name });
            toast.success("New added successfully.", { duration: 2000 });
        } catch (e: any) {
            toast.error("Error adding new admin!", { duration: 2000 });
        }
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form onSubmit={handler}>
                <div className="min-w-[450px] h-max p-10 rounded-[30px] border border-slate-500 flex flex-col gap-[10px] bg-slate-50 shadow-lg">
                    <span className="text-[26px] text-center font-medium w-full">Add new admin</span>
                    <div className="flex flex-col gap-5">
                        <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden`} >
                            <span className={labelClasses}>Name</span>
                            <input type="text" placeholder="John Carter" required name="name" className={inputClasses} />
                        </div>
                        <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden`} >
                            <span className={labelClasses}>Email</span>
                            <input type="email" placeholder="john@gmail.com" required name="email" className={inputClasses} />
                        </div>
                        <div className={`flex flex-col gap-1 transition-all duration-400 overflow-hidden`} >
                            <span className={labelClasses}>Password </span>
                            <input type="password" placeholder="************" name="password" required className={inputClasses} />
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer text-center p-3 text-[15px] sm:text-[17px] bg-indigo-400 hover:bg-indigo-500 transition-all duration-300 rounded-[15px] text-white font-medium mt-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}