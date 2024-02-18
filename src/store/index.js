
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { ENV } from "../constants/environment";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
reducer:{
  auth:authReducer,
  cart:cartReducer
},
devTools: ENV === "development",
 
})












export default store;


























/// 1 ofject gồm nhiều reducer
// const rootReducer = combineReducers({
//   counter: counterReducer,
//   dog: dogReducer,
// });

// /////dispatch
// const middleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     console.log("store",store);
//     action(store.dispatch);
//     return;
//   }
//   next(action);
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(middleware)),
// );
