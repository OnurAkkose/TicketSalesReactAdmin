import { all, fork } from "redux-saga/effects";
import AuthSaga from "./authentication/AuthSaga";
import CompanySaga from "./companies/CompanySaga";
import TicketSaga from "./tickets/TicketSaga";


export default function* rootSaga() {
    yield all([       
        fork(AuthSaga),
        fork(TicketSaga),
        fork(CompanySaga)
       
       
    ]);
}
