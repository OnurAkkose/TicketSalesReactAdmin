import api from "../core/BaseApi";
const uri = "Company";
const posturi = "Company/Add";

const getCompanies = () => {
    return api
        .get(uri)
        .then(({ data }) => data)
        .catch((error) => {
            console.log(JSON.stringify(error));
            return error;
        });
};

const saveCompany = (company) => {
    console.log("FROM API => " + JSON.stringify(company));
    return api
        .post(posturi, company)
        .then(({ data }) => data)
        .catch((error) => ({ error }));
};

const updateCompany = (company) => {
    return api
        .put(`/${uri}/${company.id}`, company)
        .then(({ data }) => data)
        .catch((error) => ({ error }));
};

const deleteCompany = (companyId) => {
    api.delete(`/${uri}/${companyId}`).catch((error) => ({ error }));
};

const CompanyApi = {
    getCompanies,
    saveCompany,
    updateCompany,
    deleteCompany,
};

export default CompanyApi;
