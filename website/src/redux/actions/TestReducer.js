import * as actionTypes from "../actionsString"

export default function testReducer(loginDetails) {
    console.log("Test reducer sent")
    return {
        type: actionTypes.TEST_REDUCER,
        // payload: {
        //     request:{
        //       url:'/user',
        //       method: 'get',
        //     }
        //   }
    }
}