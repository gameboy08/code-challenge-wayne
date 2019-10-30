import { combineReducers } from "redux";
import airports from "./airports";
import details from "./details";
import loading from "./loading";
import errorStatus from "./errorStatus";

export default combineReducers({
    airports,
    details,
    loading,
    errorStatus
})