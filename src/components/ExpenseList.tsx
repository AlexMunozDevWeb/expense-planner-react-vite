import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

  const { state } = useBudget()

  const filteredByExpenses = state.currentCategory
    ? state.expenses.filter(expense => expense.category === state.currentCategory)
    : state.expenses

  const isEmpty = useMemo(() => filteredByExpenses.length === 0, [filteredByExpenses])

  return (
    <div className="mt-10 bg-white shadow-xl rounded-xl p-10 border border-slate-100">
      {isEmpty ? <p className="text-slate-600 text-2xl font-bold text-center opacity-50">No hay gastos registrados</p> : (
        <>
          <p className="text-slate-600 text-2xl font-bold my-5 border-b-2 border-slate-100 pb-2">Listado de gastos</p>
          <div className="flex flex-col gap-4">
            {filteredByExpenses.map(expense => (
              <ExpenseDetail
                key={expense.id}
                expense={expense}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
