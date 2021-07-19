import { createAction } from "@reduxjs/toolkit";

const getCompaniesAction = createAction("COMPANY_GET_COMPANY");
const setCompaniesAction = createAction("COMPANY_SET_COMPANY");
const saveCompaniesAction = createAction("COMPANY_SAVE_COMPANY");
const updateCompaniesAction = createAction("COMPANY_UPDATE_COMPANY");
const deleteCompaniesAction = createAction("COMPANY_DELETE_COMPANY");

const CompanyActions = {
    getCompaniesAction,
    setCompaniesAction,
    saveCompaniesAction,
    updateCompaniesAction,
    deleteCompaniesAction
    
};

export default CompanyActions;
