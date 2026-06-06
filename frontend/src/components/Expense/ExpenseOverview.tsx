import type { ExpenseType } from "../../utils/types";

type ExpenseOverviewProps = {
  transactions: ExpenseType[];
  onExpenseIncome: () => void;
};

function ExpenseOverview({onExpenseIncome,transactions}: ExpenseOverviewProps) {
  return <div>ExpenseOverview</div>;
}

export default ExpenseOverview;
