import api from "../api/core/BaseApi";
import { sendNotifyMessage } from "../store/actions/core/CoreActions";

export function initServiceInterceptor(store) {
    /*api.interceptors.request.use(
        async (request) => {
            const {
                persistentStorage: { token },
            } = store.getState();

            if (!request.headers.Authorization && token && token.access_token) {
                request.headers.Authorization = `${token.token_type} ${token.access_token}`;
            }

            if (!request.headers["Content-Type"]) {
                request.headers["Content-Type"] = "application/json";
            }

            return request;
        },
        (error) => console.error(error)
    );*/

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            const errorRes = error.response;
            if (errorRes) {
                store.dispatch(sendNotifyMessage({ type: "error", message: `${errorRes.status}:${errorRes.data.message || errorRes.data.error}` }));
            } else {
                store.dispatch(sendNotifyMessage({ type: "error", message: "Hata Meydana Geldi" }));
            }
            return Promise.reject(error);
        }
    );
}
