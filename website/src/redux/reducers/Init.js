const initialState = {
}
  
export default function ReducerInit(state=initialState, action) {
    console.debug("Reducers", state, action)
    return state
}