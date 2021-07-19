import { createAction } from "@reduxjs/toolkit";

const getUserInfoAction = createAction("USER_INFO_GET_USER_INFO");
const setUserInfoAction = createAction("USER_INFO_SET_USER_INFO");
const AuthActions = {
    getUserInfoAction,
    setUserInfoAction
};

export default AuthActions;
