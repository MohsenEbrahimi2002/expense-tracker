import { useState } from "react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import type { AddExpensePayload } from "../../pages/Dashboard/Expense";
import Input from "../Inputs/Input";

type AddExpenseFormProps = {
  onAddExpense: (expense: AddExpensePayload) => void;
};

function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (key: string, value: string) =>
    setExpense({ ...expense, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
          handleChange("category", e.target.value)
        }
        label="Category"
        placeholder="Rent,Groceries, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
          handleChange("amount", e.target.value)
        }
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={expense.date}
        onChange={(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
          handleChange("date", e.target.value)
        }
        label="Date"
        placeholder=""
        type="date"
      />
      <div>
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          className="add-btn add-btn-fill"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
