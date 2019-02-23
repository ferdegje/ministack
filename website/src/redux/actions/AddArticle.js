import * as actionTypes from "../actionsString"

export default function addArticle(data) {
    return {
        type: actionTypes.ADD_ARTICLE,
        payload: {
            request:{
              url:'/article',
              method: 'post',
              data: data
            }
          }
    }
}