import { useMemo } from "react"
import type { Activity } from "../types"
import CaloriesConsumedDisplay from "./CaloriesConsumedDisplay"
import CaloriesBurnedDisplay from "./CaloriesBurnedDisplay"
import CaloriesTotalDisplay from "./caloriesTotalDisplay"


type CalorieTruckerProps = {
    activities: Activity[]
}
export default function CalorieTrucker({activities} : CalorieTruckerProps) {

    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities] )
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities] )
    const caloriesTotal = useMemo(() => caloriesConsumed - caloriesBurned, [activities] )
    
    
  return (
    <>
        <h2 className="font-black text-4xl text-white text-center">Resumen de calorías</h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            
            <CaloriesConsumedDisplay 
                calories={caloriesConsumed}
                text="Consumidas"
            />
            
            <CaloriesBurnedDisplay 
                calories={caloriesBurned}
                text="Ejercicio"
            />

            <CaloriesTotalDisplay 
                calories={caloriesTotal}
                text="Diferencia"
            />
        </div>
    </>
  )
}
