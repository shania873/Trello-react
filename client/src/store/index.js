import tasksReducer from "./reducers/tasksReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

const reducersAll = combineReducers({
  tasksReducer: tasksReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducersAll,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
