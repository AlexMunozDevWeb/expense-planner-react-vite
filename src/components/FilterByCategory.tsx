import { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { name: e.target.value.toString() } })
  }

  return (
    <div className="bg-white shadow-xl rounded-xl p-10 border border-slate-100">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category" className="text-2xl font-bold text-slate-600">Filtrar gastos</label>
          <select
            id="category"
            className="bg-slate-50 p-3 flex-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={handleChange}
          >
            <option value="">-- Todas las categorías --</option>
            {
              categories.map(category => (
                <option
                  value={category.name}
                  key={category.id}
                >{category.name}</option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  )
}
