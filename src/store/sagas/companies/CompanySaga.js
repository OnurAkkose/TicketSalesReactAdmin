import { put, call, takeLeading, takeEvery } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import CompanyApi from "../../../api/companies/CompanyApi";
import CompanyActions from "../../actions/companies/CompanyActions";
import { sendNotifyMessage } from "../../actions/core/CoreActions";

function* getAllCompaniesOnSaga() {
    const companies = yield call(CompanyApi.getCompanies);
    if (companies) yield put(CompanyActions.setCompaniesAction(companies));
}

function* saveCompanyOnSaga(action) {
    const company = yield call(CompanyApi.saveCompany, action.payload);
    if (company) {
        yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
        yield put(CompanyActions.saveCompaniesAction(company));
    }
}

function* updateCompanyOnSaga(action) {
    const company = yield call(CompanyApi.updateCompany, action.payload);
    if (company) {
        yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
        yield put(CompanyActions.updateCompaniesAction(company));
    }
}

function* deleteCompanyOnSaga(action) {
    yield call(CompanyApi.deleteCompany, action.payload.id);
    yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
    yield put(CompanyActions.deleteCompaniesAction(action.payload));
}

export default function* CompanySaga() {
    yield all([
        yield takeLeading(CompanyActions.getCompaniesAction.type, getAllCompaniesOnSaga),
        yield takeLeading(CompanyActions.saveCompaniesAction.type, saveCompanyOnSaga),
        yield takeLeading(CompanyActions.updateCompaniesAction.type, updateCompanyOnSaga),
        yield takeLeading(CompanyActions.deleteCompaniesAction.type, deleteCompanyOnSaga),
    ]);
}
