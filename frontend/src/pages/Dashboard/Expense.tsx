import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import type { ExpenseType } from "../../utils/types";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";

export type AddExpensePayload = {
  category: string;
  amount: string;
  date: string;
  icon: string;
};

function Expense() {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: "",
  });
  useUserAuth();
  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
      );
      if (response) {
        setExpenseData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong in income page. Please try again", err);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense: AddExpensePayload) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
        icon: icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error adding income");
    }
  };

   // Delete Expense
  const deleteExpense = async (id: string) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: "" });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(error);
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async () => {};
  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
