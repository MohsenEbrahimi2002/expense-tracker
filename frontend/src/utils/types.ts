export interface DashboardDataType {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  last30DaysExpenses: {
    total: number;
    transactions: ExpenseTransactionType[];
  };
  last60DaysIncome: {
    total: number;
    transactions: IncomeTransaction[];
  };
  recentTransactions: RecentTransaction[];
}

export interface ExpenseTransactionType {
  _id: string;
  amount: number;
  date: string;
  icon?: string;
  description?: string;
  category?: string;
  type: "expense";
}

export interface IncomeTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  source?:string;
  type: "income";
}

export interface RecentTransaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  source?: string;
  icon?: string;
  type: "income" | "expense";
}
