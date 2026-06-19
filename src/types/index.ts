export type Expense = {
  id: string;
  expenseName: string;
  amount: number;
  category: string;
  date: Value;
};

export type BudgetStore = {
  // 💰 presupuesto
  budget: number;
  addBudget: (value: number) => void;

  // 💸 gastos
  expenses: Expense[];
  addExpense: (expense: DraftExpense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  getExpenseById: (id: string) => Expense | undefined;

  // 🪟 modal
  isModalOpen: boolean;
  showModal: () => void;
  closeModal: () => void;

  // 🔎 filtros
  filterCategory: string | null;
  addFilterCategory: (category: string | null) => void;

  // Select expense
  selectedExpense: Expense | null;
  setSelectedExpense: (expense: Expense | null) => void;

  // 🔄 reset
  resetApp: () => void;
};

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

//Uso de utility type - se omite el id del generic
export type DraftExpense = Omit<Expense, "id">;

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type porcentageProgressBar = {
  percentage: number;
};
