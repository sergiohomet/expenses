import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
    const { state } = useBudget()

    const filterExpense = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses
    
    const isEmpty = useMemo( () => filterExpense.length === 0, [filterExpense])

  return (
    <div className="mt-5 bg-white rounded-lg p-10 shadow-lg">
        {isEmpty ? 
            <p className="text-gray-600 text-2xl font-bold text-center">
                No hay Gastos aún
            </p>
        :  (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5 text-center">
                    Listado de Gastos:
                </p>
                
                {filterExpense.map(expense => (
                    <ExpenseDetail 
                        key={expense.id}
                        expense={expense} 
                    />
                ))}
            </>
        )}
    </div>
  )
}
