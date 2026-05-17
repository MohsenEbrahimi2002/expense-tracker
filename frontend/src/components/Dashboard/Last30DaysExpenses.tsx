import { useEffect, useState } from "react";
import type { ExpenseTransactionType } from "../../utils/types";
import { prepareExpenseBarChartData } from "../../utils/helper";

type Last30DaysExpensesProps = {
  data: ExpenseTransactionType[];
};
type ChartDataType = {
  category: string | undefined;
  amount: number;
};

function Last30DaysExpenses({ data }: Last30DaysExpensesProps) {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
    </div>
  );
}

export default Last30DaysExpenses;
