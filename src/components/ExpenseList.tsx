import { useMemo } from "react";
import { useBudgetStore } from "../store";
import ExpenseDetail from "../components/ExpenseDetail";

export default function ExpenseList() {
  const expenses = useBudgetStore((state) => state.expenses);
  console.log(expenses);

  const filterCategory = useBudgetStore((state) => state.filterCategory);

  console.log(filterCategory);
  const isEmpty = expenses.length === 0;

  const filteredExpenses = useMemo(() => {
    if (!filterCategory) return expenses;

    return expenses.filter((expense) => expense.category === filterCategory);
  }, [expenses, filterCategory]);

  return (
    <div className="mt-10 bg-white shadow-xl rounded-xl p-5 sm:p-10 border border-slate-100">
      {isEmpty ? (
        <p className="text-slate-600 text-2xl font-bold text-center opacity-50">
          No hay gastos registrados
        </p>
      ) : (
        <>
          <p className="text-slate-600 text-2xl font-bold my-5 border-b-2 border-slate-100 pb-2">
            Listado de gastos
          </p>

          <div className="flex flex-col gap-4">
            {filteredExpenses.map((expense) => (
              <ExpenseDetail key={expense.id} expense={expense} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
