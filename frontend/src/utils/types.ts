export interface DashboardDataType {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  last30DaysExpenses: {
    total: number;
    transactions: ExpenseTransaction[];
  };
  last60DaysIncome: {
    total: number;
    transactions: IncomeTransaction[];
  };
  recentTransactions: RecentTransaction[];
}

interface ExpenseTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  type: "expense";
}

interface IncomeTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  type: "income";
}

interface RecentTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  type: "income" | "expense";
}