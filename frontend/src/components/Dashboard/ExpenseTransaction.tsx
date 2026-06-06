import moment from "moment";
import type { ExpenseTransactionType } from "../../utils/types";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuArrowRight } from "react-icons/lu";

type ExpenseTransactionProps = {
  transactions: ExpenseTransactionType[];
  onSeeMore: () => void;
};

function ExpenseTransaction({
  onSeeMore,
  transactions,
}: ExpenseTransactionProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 4)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseTransaction;
