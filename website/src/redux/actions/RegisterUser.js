import * as actionTypes from "../actionsString"

export default function registerUser(registrationDetails) {
    return {
        type: actionTypes.REGISTER_USER,
        registrationDetails
    }
}