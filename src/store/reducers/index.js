import { combineReducers } from "redux";
import AuthReducer from "./authentication/AuthReducer";
import CompanyReducer from "./companies/CompanyReducer";
import CoreReducer from "./core/CoreReducer";
import TicketReducer from "./tickets/TicketReducer";
export default combineReducers({
    core: CoreReducer,   
    auth: AuthReducer,
    ticket: TicketReducer,
    company: CompanyReducer
});
