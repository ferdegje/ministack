const initialState = {
}
  
export default function ReducerInit(state=initialState, action) {
    console.debug("Reducer "+action.type, state, action)
    return state
}