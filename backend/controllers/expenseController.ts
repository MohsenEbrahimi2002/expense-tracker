import type { Request, Response } from "express";
import Expense from "../models/Expense.js";
import type { AuthRequest } from "../middlewares/authMiddleware.js";
import xlsx from "xlsx";

export const addExpense = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;
  // Validation: Check for missing fields
  try {
    const { icon, category, amount, date } = req.body;
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const getAllExpense = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const downloadExpenseExcel = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //Prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.amount,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
