export const CORE_NOTIFY_ACTION = "CORE_NOTIFY_ACTION";

export const sendNotifyMessage = (notification) => {
    return { type: CORE_NOTIFY_ACTION, payload: notification };
};
