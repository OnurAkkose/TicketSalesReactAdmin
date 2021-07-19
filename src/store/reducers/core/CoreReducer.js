import { CORE_NOTIFY_ACTION } from "../../actions/core/CoreActions";

const CORE_INIT_STATE = {
    notification: {
        message: "",
        type: "",
    },
};
const CoreReducer = (state = CORE_INIT_STATE, action) => {
    switch (action.type) {
        case CORE_NOTIFY_ACTION:
            return { ...state, notification: action.payload };
        default:
            return state;
    }
};

export default CoreReducer;
