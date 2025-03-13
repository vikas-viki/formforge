import { ModalInputTypes } from "../library/types";

type ModalFeilds = {
    type: ModalInputTypes,
    name: string,
    placeholder?: string,
    handler?: (e: any) => void
}[];

const Modal = ({ feilds, title }: { feilds: ModalFeilds, title?: string }) => {
    return (
        <div className={`w-[500px] h-max bg-white/30 backdrop-blur-lg p-5 pt-8 font-outfit drop-shadow-2xl border-[1px] border-green-800/75 rounded-2xl`} data-aos="zoom-in">
            <h1 className="text-[24px] font-semibold w-full text-center">{title}</h1>
            <div className="flex flex-col gap-5 w-full h-full px-5 py-8 pb-5">
                {
                    feilds.map((ele, i) => (
                        <div key={i} className="w-full h-full flex flex-col gap-1">
                            {
                                ele.type != ModalInputTypes.button &&
                                <span className="block">{ele.name}</span>
                            }
                            {
                                ele.type == ModalInputTypes.input && (
                                    <input type="text" placeholder={ele.placeholder} className="p-2 outline-none border rounded-[10px] w-full" />
                                )

                            }
                            {
                                ele.type == ModalInputTypes.button && (
                                    <button onClick={ele.handler} className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white mt-3 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                                    >{ele.name}</button>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Modal;