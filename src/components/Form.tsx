import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity_reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState : Activity = {
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0
    
}
export default function Form({dispatch, state}: FormProps) {


    const [activity, setActivity] = useState<Activity>(initialState)
    useEffect(()=> {
        if(state.activeId){
            // console.log('Ya hay algo en activeId')
            // console.log(state.activeId)
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        // console.log('Algo Cambio')
        // console.log(e.target.id)
        // console.log(e.target.value)
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })

        

    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log('Submit...')
        dispatch({ type: "save-activity", payload: {newActivity: activity} })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

  return (
    <div>
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg "
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option 
                                key={category.id}
                                value={category.id}>{category.name}</option>
                        ))}
                    </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input 
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="name"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="Ej.: comida: jugo, pera"
                    />
                
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="calories"
                    value={activity.calories}
                    onChange={handleChange}
                    placeholder="Calorias Ej.: 300 o 500"
                    />
                
            </div>
            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 p-2 w-full cursor-pointer uppercase font-bold text-white disabled:opacity-10 disabled:cursor-not-allowed"
                value={activity.category === 1 ? "Guardar Comida" : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
                />
        </form>
    </div>
  )
}
