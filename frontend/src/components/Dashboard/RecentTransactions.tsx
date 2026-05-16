import { LuArrowRight } from "react-icons/lu";
import type { RecentTransaction } from "../../utils/types";

type RecentTransactionProps = {
  transactions: RecentTransaction[] | undefined;
  onSeeMore: () => void;
};

function RecentTransactions({
  transactions,
  onSeeMore,
}: RecentTransactionProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See all <LuArrowRight className="text-base" />
        </button>
      </div>
    </div>
  );
}

export default RecentTransactions;
