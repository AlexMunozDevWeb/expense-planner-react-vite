import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
  children: ReactNode
}

//Acción del estado global
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetContext = createContext<BudgetContextProps>(null!)

//Datos que va a tener ese context
export const BudgetProvider = ({children} : BudgetProviderProps) => {

  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}