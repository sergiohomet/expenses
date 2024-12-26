import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { DraftExpense, Value } from "../types"
import ErrorMessage from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export default function ExpenseForm() {
    const { state, dispatch, remainingBudget } = useBudget()
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(() => {
      if(state.editingId) {
        const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0]
        setExpense(editingExpense)
        setPreviousAmount(editingExpense.amount)
      }
    }, [state.editingId, state.expenses])
    

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })


    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        if( (expense.amount - previousAmount) > remainingBudget ) {
            setError('El gasto se sale del presupuesto asignado')
            return
        }
        
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: { expense: {id: state.editingId, ...expense} } })
        } else {
            dispatch({type: 'add-expense', payload: {expense}} )
        }
    }


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-bold border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Modificar Gasto' : 'Nuevo gasto'}
        </legend>

        {error && (
            <ErrorMessage>
                {error}
            </ErrorMessage>
        )}

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            > Gasto:
            </label>
            <input 
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-100 p-2"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            > Cantidad:
            </label>
            <input 
                type="number"
                id="amount"
                placeholder="Añade la cantidad del gasto"
                className="bg-slate-100 p-2"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            > Categoría:
            </label>
            <select 
                id="category"
                className="bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">---Seleccione---</option>
                {categories.map( category => 
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                )}
            </select>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="date"
                    className="text-xl"
                > Fecha:
                </label>
                <DatePicker 
                    className='bg-slate-100 p-2 border-0'
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>
        </div>

        <input 
            type="submit" 
            className="bg-blue-600 cursor-point w-full p-2 text-xl text-white font-bold rounded-lg uppercase"
            value={state.editingId ? 'Modificar Gasto' : 'Registrar gasto'}
        />

        
    </form>
  )
}
