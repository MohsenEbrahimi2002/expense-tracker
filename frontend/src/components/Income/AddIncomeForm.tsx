import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import type { IncomeType } from "../../utils/types";

type IncomeT = { source: string; amount: string; date: string; icon: string };

type AddIncomeFormProps = {
  onAddIncome: (income: IncomeType) => void;
};

function AddIncomeForm({ onAddIncome }: AddIncomeFormProps) {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (key: string, value: string) =>
    setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={(e) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange("date", e.target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className="add-btn add-btn-fill"
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default AddIncomeForm;
