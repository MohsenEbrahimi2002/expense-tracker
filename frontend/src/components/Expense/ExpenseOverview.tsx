import { useEffect, useState } from "react";
import type { ExpenseType } from "../../utils/types";
import { prepareExpenseLineChartData } from "../../utils/helper";
import { LuPlus } from "react-icons/lu";

type ExpenseOverviewProps = {
  transactions: ExpenseType[];
  onExpenseIncome: () => void;
};
type ChartDataType = {
  month: string;
  amount: number;
  category: string;
};

function ExpenseOverview({
  onExpenseIncome,
  transactions,
}: ExpenseOverviewProps) {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>

          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
}

export default ExpenseOverview;
