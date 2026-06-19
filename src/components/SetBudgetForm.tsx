import { useState } from "react";
import { useBudgetStore } from "../store";

export const SetBudgetForm = () => {
  const [input, setInput] = useState(0);
  const { addBudget } = useBudgetStore();

  const isInvalid = isNaN(input) || input <= 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBudget(input);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir Presupuesto
        </label>
      </div>

      <input
        id="budget"
        type="number"
        className="w-full bg-white border border-gray-200 p-2"
        placeholder="Define tu presupuesto"
        name="budget"
        value={input}
        onChange={handleChange}
      />

      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-40"
        disabled={isInvalid}
      />
    </form>
  );
};
