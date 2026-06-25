import type { Request, Response } from "express";
import Income from "../models/Income.js";
import type { AuthRequest } from "../middlewares/authMiddleware.ts";
import xlsx from "xlsx";

export const addIncome = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;
  // Validation: Check for missing fields
  try {
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const getAllIncome = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
export const downloadIncomeExcel = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  const userId = authReq.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //Prepare data for excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.amount,
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
