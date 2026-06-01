import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import IncomeOverview from "../../components/Income/IncomeOverview";
import type { IncomeType } from "../../utils/types";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
export type AddIncomePayload = {
  source: string;
  amount: string;
  date: string;
  icon: string;
};
function Income() {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState<IncomeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: "",
  });

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      );
      if (response) {
        setIncomeData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong in income page. Please try again", err);
      setIncomeData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income: AddIncomePayload) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("Source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: Number(amount),
        date,
        icon: icon ,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully!");
      fetchIncomeDetails();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.error("Error adding income");
    }
  };

  // Delete Income
  const deleteIncome = async (id: string) => {};

  // handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ data: id, show: true })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
