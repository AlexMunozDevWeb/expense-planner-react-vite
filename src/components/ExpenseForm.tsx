import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const [error, setError] = useState('')
  const [previousAmount, setPreviousAmount] = useState(0)
  const { dispatch, state, remainingBudget } = useBudget()

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.editingId])

  //Funcion para el resto de campos del form
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })
  }

  //Funcion para el onChange del date picker
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validar
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    //Validar que no me pase del limite
    if ((expense.amount - previousAmount) > remainingBudget) {
      setError('Presupuesto rebasado')
      return
    }

    // Agregar o actualizar el gasto
    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }

    // Reiniciar el state
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    })
    setPreviousAmount(0)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 text-slate-700"
      >{state.editingId ? 'Guardar cambios' : 'Nuevo gasto'}</legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="expenseName"
          className="text-xl font-bold text-slate-600"
        >Nombre gasto:</label>

        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl font-bold text-slate-600"
        >Cantidad:</label>

        <input
          type="number"
          id="amount"
          placeholder="Añade una cantidad, ej: 300"
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl font-bold text-slate-600"
        >Categoria:</label>

        <select
          id="category"
          className="bg-slate-50 p-3 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option
              key={category.id}
              value={category.name}
            >{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl font-bold text-slate-600"
        >Fecha Gasto:</label>

        <DatePicker
          className="bg-slate-50 p-2 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-3 text-white uppercase font-bold rounded-lg shadow-md transition-colors"
        value={state.editingId ? 'Guardar cambios' : 'Registrar gasto'}
      />


    </form>
  )
}
