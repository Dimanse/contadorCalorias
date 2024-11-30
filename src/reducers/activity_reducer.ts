import { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: {newActivity: Activity} } |
    { type: 'set-activeId', payload: {id: Activity['id']} } |
    { type: 'delete-activity', payload: {id: Activity['id']} } |
    { type: 'restart-app' }

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'],
}


const loclaStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const InitialState : ActivityState = {
    activities: loclaStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = InitialState,
    action: ActivityActions,
) => {
    if(action.type === 'save-activity'){
        //Este código maneja la lógica para actualizar el state
        // console.log('Desde el type de save-activity')
        // console.log(action.payload.newActivity)
        let updatedActivities : Activity[] = [];
        if(state.activeId){
            updatedActivities = state.activities.map(activity =>
                activity.id === state.activeId ? action.payload.newActivity : activity
              );
            //   console.log(updatedActivities);
        }else{
            updatedActivities =  [...state.activities, action.payload.newActivity]; 
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }
    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return {
            activities: [],
            activeId: ''

        }
    }
    return state
}