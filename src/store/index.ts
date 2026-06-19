import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BudgetStore, DraftExpense, Expense } from "../types";

import { v4 as uuidv4 } from "uuid";

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      // 💰 presupuesto
      budget: 0,

      addBudget: (value: number) => {
        set(() => ({
          budget: value,
        }));
      },

      // 💸 gastos
      expenses: [],

      addExpense: (expense: DraftExpense) => {
        const newExpense = {
          ...expense,
          id: uuidv4(),
        };
        set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      removeExpense: (id: string) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
      },

      updateExpense: (expense: Expense) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === expense.id ? expense : e,
          ),
        }));
      },

      getExpenseById: (id: string) => {
        return get().expenses.find((e) => e.id === id);
      },

      // 🪟 modal
      isModalOpen: false,

      showModal: () => {
        set(() => ({
          isModalOpen: true,
        }));
      },

      closeModal: () => {
        set(() => ({
          isModalOpen: false,
        }));
      },

      // 🔎 filtros
      filterCategory: null,

      addFilterCategory: (category: string | null) => {
        set(() => ({
          filterCategory: category,
        }));
      },

      // 🔄 reset total app
      resetApp: () => {
        set(() => ({
          budget: 0,
          expenses: [],
          isModalOpen: false,
          filterCategory: null,
        }));
      },
    }),
    {
      name: "budget-app-storage",

      // guardamos todo menos acciones (automático)
      partialize: (state) => ({
        budget: state.budget,
        expenses: state.expenses,
        filterCategory: state.filterCategory,
      }),
    },
  ),
);
