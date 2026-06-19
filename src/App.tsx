import { TopMenu } from "./components/TopMenu";
import { SetBudgetForm } from "./components/SetBudgetForm";
import { BudgetTracker } from "./components/BudgetTracker";
import ExpenseList from "./components/ExpenseList";
import ExpenseModal from "./components/modal/ExpenseModal";
import { FilterByCategory } from "./components/FilterByCategory";

import { useBudgetStore } from "./store/";

function App() {
  const budget = useBudgetStore((state) => state.budget);

  const isValidBudget = isNaN(budget) || budget > 0;

  return (
    <>
      <TopMenu />
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10 p-10 border border-slate-100">
        {isValidBudget ? <BudgetTracker /> : <SetBudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
