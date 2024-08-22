import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number,
  remainingBudget: number,
}

type BudgetProviderProps = {
  children: ReactNode
}

//Acción del estado global
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
// 1. Definimos el context, con la funcion createContext
export const BudgetContext = createContext<BudgetContextProps>(null!)

//Datos que va a tener ese context
// 2. Crear provaider
// 3. Creamos el type BudgetProviderProps y se lo pasamos
export const BudgetProvider = ({children} : BudgetProviderProps) => {
  // 5. con el uso de useReducer tenemos acceso a budgetReducer
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo( () => state.expenses.reduce((total, expense) => expense.amount + total, 0 ) 
  , [state.expenses])
  const remainingBudget = state.budget - totalExpenses

  //4. Conectamos el context con el provaider en el return
  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}