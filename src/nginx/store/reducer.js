
import * as ActionTypes from './actionTypes';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GETTEMPLATEFILE: {
      return {
        ...state, data: action.data
      }
    }
    case ActionTypes.DOWNLOADEXCEL:{
      return{
        ...state,filePath:action.filePath
      }
    }
    default: return state;
  }
}

export default reducer;