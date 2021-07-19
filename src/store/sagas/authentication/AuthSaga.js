import { put, call, takeLeading, takeEvery } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import AuthApi from "../../../api/authentication/AuthApi";

import AuthActions from "../../actions/authentication/AuthActions";
import { sendNotifyMessage } from "../../actions/core/CoreActions";


function* getUserInfo(action) {

    const userInfo = yield call(AuthApi.getUserInfo,action.payload);    
    if (userInfo){
        
        yield put(sendNotifyMessage({ type: "success", message: "İşlem Tamamlandı" }));
        yield put(AuthActions.setUserInfoAction(userInfo));
    }
}
 
export default function* AuthSaga() {
    yield all([
        yield takeEvery(AuthActions.getUserInfoAction, getUserInfo),
       
    ]);
}
