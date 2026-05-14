import Income from "../models/Income.ts";
import Expense from "../models/Expense.ts";
import { isValidObjectId, Types } from "mongoose";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user._id;
    const userObjectId = new Types.ObjectId(String(userId));

    //Fetch total income & expenses
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("totalIncome", {
      totalIncome,
      userId: isValidObjectId(userId),
    });
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //Get income transaction in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 60 days
    const incomeLast60days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Get expense transactions in the Last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 3600 * 1000) },
    }).sort({ date: -1 });

    // Get total expenses for last 30 days
    const expenseLast30Days = last30DaysExpenseTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    //Fetch last 5 transaction (income + expense)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        }),
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        }),
      ),
    ].sort((a, b) => b.date.getTime() - a.date.getTime()); //Sort latest first

    //Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      last60daysIncome: {
        total: incomeLast60days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    res.status(500).json({message:"Server Error", err})
  }
};
