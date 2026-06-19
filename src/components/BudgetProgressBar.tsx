import { porcentageProgressBar } from "../types";

export const BudgetProgressBar = ({ percentage }: porcentageProgressBar) => {
  const getProgressColor = (percentage: number): string => {
    if (percentage < 50) return "bg-emerald-500";
    if (percentage < 75) return "bg-amber-500";

    return "bg-red-500";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold uppercase text-slate-500">
          Presupuesto utilizado {percentage}%
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className={`${getProgressColor(percentage)} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
