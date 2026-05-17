import { useEffect, useState } from "react";
import type { IncomeTransaction } from "../../utils/types";
import CustomPieChart from "../Charts/CustomPieChart";

type RecentIncomeWithChartProps = {
    data:IncomeTransaction[]
    totalIncome:number;
}
type ChartDataType = {
  name: string;
  amount: number;
};
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

function RecentIncomeWithChart({data,totalIncome}: RecentIncomeWithChartProps) {
 const [chartData, setChartData] = useState<ChartDataType[]>([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source || "Unknown source",
            amount: item?.amount,
        }));
        console.log(dataArr);
        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
    }, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                colors={COLORS}
                label="Total Income"
                showTextAnchor
                totalAmount={`$${totalIncome}`}
            />
        </div>
    );
}

export default RecentIncomeWithChart