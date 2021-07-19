import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthActions from "../../store/actions/authentication/AuthActions";

export const AuthPage = () => {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");  
    const dispatch = useDispatch();
    const authOject = {
        userName: userName,
        password: password,
    };
    const login = () => {
        authOject.userName = userName;
        authOject.password = password;
        dispatch(AuthActions.getUserInfoAction(authOject));
        window.location.href = "#/mobile-user";
    };
    const userInfo = useSelector((state) => state.auth.userInfo);
 
    useEffect(() => {
 
        if (userInfo.name !== undefined) {
            localStorage.setItem("username", userInfo.userName);
            localStorage.setItem("password", userInfo.password);
        }
    }, [userInfo]);

    return (
        <div style={{ marginLeft: "35%", marginTop: "10%" }}>
            <div className="p-col-4">
                <div className="">
                    <div>
                        <label htmlFor="username">Username</label>
                        <InputText
                            style={{ width: "100%" }}
                            id="username"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            autoFocus
                            autoComplete="off"
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <InputText
                            style={{ width: "100%" }}
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    <Button label="Login" className="p-button" onClick={login} />
                </div>
            </div>
        </div>
    );
};
