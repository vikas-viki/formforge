import { useState } from "react";
import { Cell, Label, Pie, PieChart, Sector } from "recharts";

export default function Analytics() {
    return (
        <div className="w-full h-full p-10">
            <div className="w-max h-max bg-white rounded-[10px] shadow-sm select-none">
                <DonutChart />
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
        <PieChart width={600} height={310}>
            <Pie
                data={data}
                cx={150}
                cy={150}
                activeIndex={activeIndex}
                activeShape={<InnerLabel />}
                innerRadius={60}
                outerRadius={95}
                fill="#8884d8"
                radius={10}
                cornerRadius={5}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={mouseEnterHandler}
                label={OuterLabel}
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

const InnerLabel = (props: any) => {
    const { payload, cx, cy, fill, innerRadius, outerRadius, startAngle, endAngle, cornerRadius } = props;
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight={500}>
                {payload.name}
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

const OuterLabel = (props: any) => {
    const max = 2610;
    const { cx, cy, payload, index, fill, value } = props;

    const y = ((cy - 57) + (index * 40));
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