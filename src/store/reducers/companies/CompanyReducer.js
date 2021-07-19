import { createReducer } from "@reduxjs/toolkit";
import CompanyActions from "../../actions/companies/CompanyActions";


const initialState = { companies: [] };

const CompanyReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(CompanyActions.getCompaniesAction)
        .addCase(CompanyActions.setCompaniesAction, (state, action) => {
            state.companies = action.payload;
        })
        .addCase(CompanyActions.saveCompaniesAction, (state, action) => {
            state.companies.push(action.payload);
        })
        .addCase(CompanyActions.updateCompaniesAction, (state, action) => {
            const index = state.companies.indexOf(state.companies.find((l) => l.id === action.payload.id));
            state.companies[index] = action.payload;
        })
        .addCase(CompanyActions.deleteCompaniesAction, (state, action) => {
            state.companies.pop(action.payload);
        })
);

export default CompanyReducer;
