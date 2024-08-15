export type Expense = {
  id: string
  expenseName: string
  amount: number
  category: string
  date: Value
}

//Uso de utility type - se omite el id del generic
export type DraftExpense = Omit<Expense,'id'> 

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
  id: string
  name: string
  icon: string
}