import { ADD_ARTICLE } from "../constants/action-types";
const forbiddenWords = ["spam", "money"];
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_ARTICLE) {
        
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          console.log("Bad word")
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      console.log("No bad word", action.payload)
      return next(action);
    };
  };
}