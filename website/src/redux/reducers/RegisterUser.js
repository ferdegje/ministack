import * as strings from "../actionsString"

export default function ReducerRegisterUser(state, action) {
    if (state === undefined || state === null) {
        return null
    }
    if (action.type === strings.REGISTER_USER) {
        return [...state,
        {
            registerUser: true
        }]
    }
    return state
}