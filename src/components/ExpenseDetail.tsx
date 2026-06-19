import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { getPercentage } from "../helpers";

import { useBudgetStore } from "../store";

//Imports para el swipe
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { BudgetProgressBar } from "./BudgetProgressBar";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.name === expense.category)[0],
    [expense],
  );
  const removeExpense = useBudgetStore((state) => state.removeExpense);

  const setSelectedExpense = useBudgetStore(
    (state) => state.setSelectedExpense,
  );

  const budget = useBudgetStore((state) => state.budget);

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setSelectedExpense(expense)}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => removeExpense(expense.id)} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-sm p-5 w-full border-b border-gray-200 flex gap-5 items-center rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
          <div>
            <img
              src={`icono_${categoryInfo.icon}.svg`}
              alt="Icono gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <p className="text-sm font-bold uppercase text-slate-500">
                {categoryInfo.name}
              </p>
              <p className="text-slate-600 text-sm font-medium">
                {formatDate(expense.date!.toString())}
              </p>
            </div>
            <p className="text-xl font-bold text-slate-700">
              {expense.expenseName}
            </p>
            <p className="progress-bar">
              <BudgetProgressBar
                percentage={getPercentage(expense.amount, budget)}
              />
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
