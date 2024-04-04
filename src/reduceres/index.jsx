import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

 const rootReducer = combineReducers({
    useState:UserReducer,
 })
 export default rootReducer;