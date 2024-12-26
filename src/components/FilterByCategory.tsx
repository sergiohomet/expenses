import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
    const { dispatch } = useBudget()

    const handeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'filtered-expense', payload: { id: e.target.value }})
    }  
  return (
    <div className="bg-white rounded-lg p-10 shadow-lg">
        <form>
            <div className="flex flex-col gap-5">
                <label 
                    htmlFor="category"
                    className="font-bold text-xl text-center"
                >
                    Filtrar gastos
                </label>
                <select 
                    id="category"
                    className="bg-slate-100 p-3 flex-1 rounded-md"
                    onChange={handeChange}
                >
                    <option className="text-center" value=''>---Todas las categorias---</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
