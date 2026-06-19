import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ErrorMessage from "./ErrorMessage";
import { useBudgetStore } from "../store";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);

  // 🧠 STORE
  const budget = useBudgetStore((state) => state.budget);
  const addExpense = useBudgetStore((state) => state.addExpense);
  const updateExpense = useBudgetStore((state) => state.updateExpense);
  const selectedExpense = useBudgetStore((state) => state.selectedExpense);
  const setSelectedExpense = useBudgetStore(
    (state) => state.setSelectedExpense,
  );

  // 💰 gastos totales
  const totalExpenses = useBudgetStore((state) =>
    state.expenses.reduce((total, expense) => total + expense.amount, 0),
  );

  const remainingBudget = budget - totalExpenses;

  // 🧠 detectar modo edición
  const isEditing = selectedExpense !== null;

  // 🧠 cargar datos si es edición
  useEffect(() => {
    if (selectedExpense) {
      setExpense({
        amount: selectedExpense.amount,
        expenseName: selectedExpense.expenseName,
        category: selectedExpense.category,
        date: selectedExpense.date,
      });

      setPreviousAmount(selectedExpense.amount);
    }
  }, [selectedExpense]);

  // 📥 inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const isAmountField = name === "amount";

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  // 📅 date picker
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  // 🚀 submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validación
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // presupuesto
    if (expense.amount - previousAmount > remainingBudget) {
      setError("Presupuesto rebasado");
      return;
    }

    if (isEditing && selectedExpense) {
      // ✏️ UPDATE
      updateExpense({
        ...selectedExpense,
        ...expense,
      });
    } else {
      // ➕ CREATE
      addExpense(expense);
    }

    // reset form
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });

    setPreviousAmount(0);
    setError("");

    // cerrar edición
    setSelectedExpense(null);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 text-slate-700">
        {isEditing ? "Guardar cambios" : "Nuevo gasto"}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* Nombre */}
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold text-slate-600">
          Nombre gasto:
        </label>

        <input
          type="text"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full"
        />
      </div>

      {/* Cantidad */}
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold text-slate-600">Cantidad:</label>

        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full"
        />
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold text-slate-600">Categoria:</label>

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full"
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold text-slate-600">Fecha Gasto:</label>

        <DatePicker value={expense.date} onChange={handleChangeDate} />
      </div>

      {/* Submit */}
      <input
        type="submit"
        value={isEditing ? "Guardar cambios" : "Registrar gasto"}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-3 text-white uppercase font-bold rounded-lg"
      />
    </form>
  );
}
