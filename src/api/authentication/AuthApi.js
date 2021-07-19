import api from "../core/BaseApi";

const getUserInfo = (action) => {
    
    return api
        .post(`login?userName=${action.userName}&password=${action.password}`)
        .then(({ data }) => data)
        .catch((error) => ({ error }));
};



const AuthApi = {
    getUserInfo
  
};

export default AuthApi;
