import { LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import type { IncomeType } from "../../utils/types";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

type IncomeOverviewProps = {
  transactions: IncomeType[];
  onAddIncome: () => void;
};
export type IncomeChartDataType = {
  month: string;
  amount: number;
  source: string;
};
function IncomeOverview({ onAddIncome, transactions }: IncomeOverviewProps) {
  const [chartData, setChartData] = useState<IncomeChartDataType[]>([]);
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
     console.log("transactions:", transactions);
  console.log("result:", result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Overview</h5>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-base" /> Add Income
        </button>
      </div>
      <div className="mt-10">
        <p className="text-sm text-gray-400 mt-0.5">
          Track your earnings over time and analyze your income trends
        </p>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default IncomeOverview;
