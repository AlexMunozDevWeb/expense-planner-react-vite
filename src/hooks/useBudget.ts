// 6. Crear custom Hook llamado useBudget
// 7. Aqui llamamos a useContext y BudgetContext
import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
  const context = useContext(BudgetContext)
  //8. Nos aseguramos de que tenga un provaider
  if(!context){
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context
}