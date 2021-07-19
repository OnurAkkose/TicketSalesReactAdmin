import { createReducer } from "@reduxjs/toolkit";
import AuthActions from "../../actions/authentication/AuthActions";


const initialState = { userInfo: [] };

const AuthReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(AuthActions.getUserInfoAction)
        .addCase(AuthActions.setUserInfoAction, (state, action) => {
            state.userInfo = action.payload;
        })
        
);

export default AuthReducer;
