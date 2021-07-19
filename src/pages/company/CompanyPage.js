import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { ColorPicker } from "primereact/colorpicker";
import classNames from "classnames";
import CompanySaga from "../../store/sagas/companies/CompanySaga";
import CompanyActions from "../../store/actions/companies/CompanyActions";

let emptyCompany = {
   name: "",
   id: 0,  
   foundationDate : "",
   sector : "",
   isActive: true

};

export const CompanyPage = () => {
    const userInfo = localStorage.getItem('username'); 
 
    const dispatch = useDispatch();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(CompanyActions.getCompaniesAction());
       
    }, []);
    
    const companies = useSelector((state) => state.company.companies);    
    const [company, setCompany] = useState(emptyCompany);
    const [submitted, setSubmitted] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const dt = useRef(null);
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Companies</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const [globalFilter, setGlobalFilter] = useState("");
    const leftToolbarTemplate = () => {
        const openNew = () => {
            setCompany(emptyCompany)
            setSubmitted(false);
            setDialog(true);
        };

        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };
    const actionBodyTemplate = (rowData) => {
        const editLocationType = (company) => {        
            setCompany({ ...company });        
            setDialog(true);
        };

        const confirmDeleteLocationType = (company) => {
            setCompany(company);
            setDeleteDialog(true);
        };

        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editLocationType(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteLocationType(rowData)} />
            </div>
        );
    };
    
    const activeTemplate = (rowData) => {
        return <Checkbox inputId="checkOption1" name="option" checked={rowData.isActive === true} />;
    };
    
    const dialogFooter = () => {
        const saveData = () => {
            const _company = {
                id: company.id,
                name: company.name,
                foundationDate: company.foundationDate,
                sector : company.sector,
                isActive: company.isActive
                
            };   
   
            if(company.id > 0){
                _company.id = company.id;              
       
                dispatch(CompanyActions.updateCompaniesAction(_company));
             
            }
             else{
                dispatch(CompanyActions.saveCompaniesAction(_company));
             }
           
         
            
            setSubmitted(true);
            setDialog(false);
            setCompany(emptyCompany);
        };
        
        const hideDialog = () => {
            setSubmitted(false);
            setDialog(false);
        };
        return (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog}  />
                <Button label="Save" icon="pi pi-check" className="p-button-text"  onClick={saveData}  />
            </>
        );
    };

    const deleteDialogFooter = () => {
        const deleteData = () => {
           
            setDeleteDialog(false);
            setCompany(emptyCompany);
        };

        return (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialog(false)} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteData} />
            </>
        );
    };

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={companies}
                        dataKey="productId"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Variants"
                        globalFilter={globalFilter}
                        emptyMessage="No Variant Found"
                        header={header}
                    >
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="sector" header="Sector" sortable></Column>
                        <Column field="foundationDate" header="Foundation Date" sortable></Column>
                        <Column field="isActive" body={activeTemplate} header="Active" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog
                        visible={dialog}
                        style={{ width: "450px" }}
                        header="User Group Details"
                        modal
                        className="p-fluid"
                        footer={dialogFooter}
                        onHide={() => setDialog(false)}
                    >
                         
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={company.name}
                                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !company.name })}
                            />
                            {submitted && !company.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="surname">Sector</label>
                            <InputText
                                id="sector"
                                value={company.sector}
                                onChange={(e) => setCompany({ ...company, sector: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !company.sector })}
                            />
                            {submitted && !company.surname && <small className="p-invalid">Surname is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="foundationDate">Foundation Date</label>
                            <InputText
                                id="foundationDate"
                                value={company.foundationDate}
                                onChange={(e) => setCompany({ ...company, foundationDate: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !company.foundationDate })}
                            />
                            {submitted && !company.sector && <small className="p-invalid">Sector is required.</small>}
                        </div>
                     
                     
                        <div className="p-field-checkbox">
                            <Checkbox
                                id="isActive"
                                onChange={(e) => {
                                    setCompany({ ...company, isActive: e.checked });
                                }}
                                checked={company.isActive}
                            ></Checkbox>
                            <label htmlFor="isActive">Active</label>
                        </div>
                    </Dialog>
                    <Dialog
                        visible={deleteDialog}
                        style={{ width: "450px" }}
                        header="Confirm"
                        modal
                        footer={deleteDialogFooter}
                        onHide={() => setDeleteDialog(false)}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
                            {companies && (
                                <span>
                                    Are you sure you want to delete <b>{company.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}