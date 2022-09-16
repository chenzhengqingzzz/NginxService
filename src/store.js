import {combineReducers ,applyMiddleware,compose,createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import nginx_reducer from './nginx/store/reducer';


const middlewares = [thunkMiddleware];

// function crossSliceReducer  (state, action){
//     debugger
//     switch (action.type) {
//         case 'getTemplateFile': {
//           return {
//             excelDemo:excelDemo_reducer(state,action),
//           }
//         }
//         default:
//           return state
//       }
// }


//组合reducer
const reducers =  combineReducers({
    nginx : nginx_reducer,
})




//初始化reducer值
const initState ={
    nginx: {
        data: [],
    },
}

//
const storeEnhancers = compose(
    applyMiddleware(...middlewares)
   
);



export default createStore(reducers, initState, storeEnhancers);