import { useEffect, useMemo, useReducer } from "react"
import { activityReducer, InitialState } from "./reducers/activity_reducer"
import Form from "./components/Form"
import ActivityList from "./components/ActivityList"
import CalorieTrucker from "./components/CalorieTrucker"



function App() {
  const [state, dispatch] = useReducer( activityReducer, InitialState );
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg text-centeer font-bold text-white uppercase">
            Contador de Calorías
          </h1>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold uppercase text-sm rounded-lg p-2 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type: 'restart-app'})}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>

      </section>

      <section
        className="bg-gray-800 py-10"
      >
        <div className="max-w-4xl mx-auto">
          <CalorieTrucker
            activities={state.activities}
          />
        </div>

      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />

      </section>
    </>
  )
}

export default App
