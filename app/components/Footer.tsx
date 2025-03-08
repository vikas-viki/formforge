const Footer = () => {

    const blocks = [
        {
            title: "College Helpline",
            content: "<span>Phone: 1234567890</span><span>Landline: 1234567890</span>"
        }
    ];

    return (
        <div className="w-full h-[100vh] bg-green-700 relative">
            <div className="absolute top-[-40px] " style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}></div>
            <div className="flex items-start justify-center">
                {
                    blocks.map((block, i) => (
                        <div key={i} className="w-full  flex flex-col group justify-center items-start px-[10%] bg-green-500 py-[30px]  border">
                            <div className="flex items-center justify-between w-[50%]">
                                <h1 className="font-outfit font-bold text-[28px]">{block.title}</h1>
                                <button className="w-[50px] h-[30px] font-bold text-[28px] cursor-pointer">+</button>
                            </div>
                            <div className="transition-all duration-300  absolute h-max top-[10px]">
                                {block.content}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Footer;