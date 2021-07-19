import { put, call, takeLeading, takeEvery } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import TicketApi from "../../../api/tickets/TicketApi";
import { sendNotifyMessage } from "../../actions/core/CoreActions";
import TicketActions from "../../actions/tickets/TicketActions";


function* getAllTicketsOnSaga() {
    const tickets = yield call(TicketApi.getTickets);
    if (tickets) yield put(TicketActions.setTicketsAction(tickets));
}

function* saveTicketOnSaga(action) {
    const ticket = yield call(TicketApi.saveTicket, action.payload);
    if (ticket) {
        yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
        yield put(TicketActions.saveTicketsAction(ticket));
    }
}

function* updateTicketOnSaga(action) {
    const ticket = yield call(TicketApi.updateTicket, action.payload);
    if (ticket) {
        yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
        yield put(TicketActions.updateTicketsAction(ticket));
    }
}

function* deleteTicketOnSaga(action) {
    yield call(TicketApi.deleteTicket, action.payload.id);
    yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
    yield put(TicketActions.deleteTicketsAction(action.payload));
}

export default function* TicketSaga() {
    yield all([
        yield takeLeading(TicketActions.getTicketsAction.type, getAllTicketsOnSaga),
        yield takeLeading(TicketActions.saveTicketsAction.type, saveTicketOnSaga),
        yield takeLeading(TicketActions.updateTicketsAction.type, updateTicketOnSaga),
        yield takeLeading(TicketActions.deleteTicketsAction.type, deleteTicketOnSaga),
    ]);
}
