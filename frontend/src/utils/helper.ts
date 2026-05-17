import moment from "moment";
import type { ExpenseTransactionType, IncomeType } from "./types";

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const addThousandsSeparator = (num: number | undefined) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data: ExpenseTransactionType[]) => {
  const chartData = data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data: IncomeType[]) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"),
    amount: item.amount,
    source: item.source,
  }));
  return chartData;
};
