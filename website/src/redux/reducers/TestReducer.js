import * as strings from "../actionsString"
const initialState = {
}

export default function ReducerTestReducer(state=initialState, action) {
    if (action.type === strings.TEST_REDUCER) {
        
        const newState = Object.assign({}, state, {
            testReducer: "ok"
          })
        console.log("Test reducer has been called", newState) 
        return newState
    }
    return state
}