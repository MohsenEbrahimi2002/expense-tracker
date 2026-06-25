import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import type { AddIncomePayload } from "../../pages/Dashboard/Income";
import Input from "../Inputs/Input";


type AddIncomeFormProps = {
  onAddIncome: (income: AddIncomePayload) => void;
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
        onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange("amount", e.target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => handleChange("date", e.target.value)}
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
