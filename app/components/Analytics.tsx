import { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { inter, poppins, roboto } from "../library/font";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Analytics() {
    return (
        <div className={`w-full h-full flex flex-col p-10 gap-13 ${poppins.className}`}>
            <div className="w-full h-max flex gap-10 justify-center items-center select-none">
                <div className="h-max rounded-[30px] border-[#BCB7B7] border">
                    <DonutChart />
                </div>
                <div className="flex flex-col gap-6 ml-10 w-max h-full rounded-[10px]">
                    <div className="flex  w-full overflow-hidden flex-wrap flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <div className="flex rounded-[30px] bg-[#41B4FC] items-center justify-center">
                                <span className={`text-[20px] font-black text-white text-vertical  py-4 ${roboto.className}`}>stats</span>
                            </div>
                            <div className="flex gap-12 justify-between p-5 px-6 rounded-[30px] w-full shadow-sm bg-[#10D5B0]/3 border-[#10D5B0] border-[5px] bg-opacity-3 z-2 items-end">
                                <div className="flex justify-between gap-[42px] flex-col">
                                    <span className={`text-[#03613C] font-semibold ${inter.className}`}>Approved</span>
                                    <span className="font-medium text-[13px] leading-[8px] text-[#03613C] ">99.4%</span>
                                </div>
                                <span className="font-bold text-[60px] leading-[50px] text-[#10D5B0]">1253</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex gap-4 p-5 px-6 rounded-[30px] shadow-sm bg-[#FFBB28]/5 border-[#FFBB28] border-[5px] bg-opacity-3 z-2 items-end">
                                <div className="flex justify-between gap-[42px] flex-col">
                                    <span className={`text-[#835E0F] font-semibold ${inter.className}`}>Pending</span>
                                    <span className="font-medium text-[13px] leading-[8px] text-[#835E0F] ">1.79%</span>
                                </div>
                                <span className="font-bold text-[60px] leading-[50px] text-[#FFBB28]">23</span>
                            </div>
                            <div className="flex gap-4 p-5 px-6 rounded-[30px] shadow-sm bg-[#FF8042]/5 border-[#FF8042] border-[5px] bg-opacity-3 z-2 items-end">
                                <div className="flex justify-between gap-[42px] flex-col">
                                    <span className={`text-[#612A0F]/90 font-semibold ${inter.className}`}>Rejected</span>
                                    <span className="font-medium text-[13px] leading-[8px] text-[#612A0F] ">0.54%</span>
                                </div>
                                <span className="font-bold text-[60px] leading-[50px] text-[#FF8042]">07</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full h-full justify-center items-center">
                <div className="flex w-[90%] items-center h-full border rounded-[30px] border-[#BCB7B7] p-5">
                    <GrowthChart />
                </div>
            </div>
        </div>
    )
}

const DonutChart = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const data = [
        { name: "TC", value: 400 },
        { name: "SC", value: 670 },
        { name: "MDM", value: 1200 },
        { name: "CC", value: 340 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const mouseEnterHandler = (_: any, index: any) => {
        setActiveIndex(index);
    }

    return (
        <PieChart width={600} height={265} >
            <Pie
                data={data}
                cx={150}
                cy={130}
                activeIndex={activeIndex}
                activeShape={<DonutInnerLabel />}
                innerRadius={60}
                outerRadius={95}
                fill="#8884d8"
                radius={10}
                cornerRadius={5}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={mouseEnterHandler}
                label={DonutOuterLabel}
                labelLine={false}
            >
                {data.map((d, i) => (
                    <>
                        <Cell key={`cell-${i}`} fill={COLORS[i]} />
                    </>
                ))}
            </Pie>
        </PieChart>
    )
}

const DonutInnerLabel = (props: any) => {
    const { payload, cx, cy, fill, innerRadius, outerRadius, startAngle, endAngle, cornerRadius } = props;
    return (
        <g>
            <text x={cx} y={cy - 8} dy={8} textAnchor="middle" fill={fill} fontSize={17} fontWeight={500}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 8} dy={8} textAnchor="middle" fill={fill} fontSize={11} fontWeight={500}>
                {payload.value}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                cornerRadius={cornerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    )
}

const DonutOuterLabel = (props: any) => {
    const max = 2610;
    const { cx, cy, payload, index, fill, value } = props;

    const y = ((cy - 55) + (index * 40));
    const boxX = cx + 340;
    const boxWidth = 40;
    const boxHeight = 24;

    const keyMap = {
        TC: "Transfer certificates",
        SC: "Study certificates",
        CC: "Conduct certificates",
        MDM: "Mid-day meals"
    }

    return (
        <g >
            <text x={cx + 150} y={y} fill={fill}>{keyMap[payload.name as keyof typeof keyMap]}</text>
            <rect
                fill={fill}
                x={boxX}
                opacity={0.3}
                rx={3}
                y={y - (boxHeight / 2) - 5}
                width={boxWidth}
                height={boxHeight}
            />
            <text
                fill={fill}
                x={boxX + boxWidth / 2}
                y={y - 4}
                fontSize={13}

                textAnchor="middle"
                dominantBaseline="middle"
            >{Math.ceil((value / max) * 100)}%</text>
        </g>
    )
}

const data = [
    { month: 'Jan', applications: 5 },
    { month: 'Feb', applications: 40 },
    { month: 'Mar', applications: 80 },
    { month: 'Apr', applications: 130 },
    { month: 'May', applications: 100 },
    { month: 'Jun', applications: 119 },
    { month: 'Jul', applications: 180 },
    { month: 'Aug', applications: 100 },
];

const GrowthChart = () => {
    return (
        <ResponsiveContainer width="100%" height={395}>
            <AreaChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    dot={{ r: 3, stroke: 'white', strokeWidth: 1 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
