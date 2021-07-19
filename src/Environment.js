import appsettings from "./appsettings.json";

export const getEnvVars = () => {
    // eslint-disable-next-line no-undef
    return appsettings.prod; // __DEV__ ? ENV.dev : ENV.prod;
};
