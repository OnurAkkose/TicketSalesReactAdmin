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
import TicketActions from "../../store/actions/tickets/TicketActions";
import CompanyActions from "../../store/actions/companies/CompanyActions";

let emptyTicket = {
   name: "",
   id: 0,
   price: 0,
   company: {},
   showDate: Date,
   level: 0,
   saleDate: Date,
   lastDate: Date
};
export const TicketPage = () => {
    //const userInfo = localStorage.getItem('username'); 
  
    const dispatch = useDispatch();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dispatch(TicketActions.getTicketsAction());
        dispatch(CompanyActions.getCompaniesAction());
    }, []);
    
    const tickets = useSelector((state) => state.ticket.tickets);    
    const companies = useSelector((state) => state.company.companies);    
    const [ticket, setTicket] = useState(emptyTicket);
    const [submitted, setSubmitted] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const dt = useRef(null);
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Tickets</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const [globalFilter, setGlobalFilter] = useState("");
    const leftToolbarTemplate = () => {
        const openNew = () => {
            setTicket(emptyTicket)
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
        const editLocationType = (ticket) => {        
            setTicket({ ...ticket });        
            setDialog(true);
        };

        const confirmDeleteLocationType = (ticket) => {
            setTicket(ticket);
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
            const _ticket = { 
                id: ticket.id,              
                name: ticket.name,
                price: ticket.price,
                companyId: ticket.company.id,
                level: ticket.level,
                showDate: ticket.showDate+"T09:30:54.503Z",
                saleDate: ticket.saleDate+"T09:30:54.503Z",
                lastDate: ticket.lastDate+"T09:30:54.503Z"                
            };   
          
            if(ticket.id > 0){
                _ticket.id = ticket.id;      
                dispatch(TicketActions.updateTicketsAction(_ticket));
            }
             else{
                dispatch(TicketActions.saveTicketsAction(_ticket));
             }           
            
            setSubmitted(true);
            setDialog(false);
            setTicket(emptyTicket);
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
            setTicket(emptyTicket);
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
                        value={tickets}
                        dataKey="productId"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Variants"
                        globalFilter={globalFilter}
                        emptyMessage="No Ticket Found"
                        header={header}
                    >
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="price" header="Price" sortable></Column>
                        <Column field="company.name" header="Company" sortable></Column>
                        <Column field="showDate" header="Show Date" sortable></Column>
                        <Column field="level" header="Level" sortable></Column>
                        <Column field="lastDate" header="Last Date" sortable></Column>
                        <Column field="saleDate" header="Sale Date" sortable></Column>
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
                                value={ticket.name}
                                onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.name })}
                            />
                            {submitted && !ticket.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="surname">Price</label>
                            <InputText
                                id="price"
                                value={ticket.price}
                                onChange={(e) => setTicket({ ...ticket, price: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.price })}
                            />
                            {submitted && !ticket.price && <small className="p-invalid">Price is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="groupId">Company</label>
                            <div className="p-d-flex">
                                <Dropdown
                                    name="companyId"
                                    value={ticket.company}
                                    options={companies}
                                    onChange={(e) => setTicket({ ...ticket, company: e.value })}
                                    optionLabel="name"
                                    placeholder="Select a Company"
                                    style={{ flex: 10 }}
                                />
                                <Button onClick={() => setTicket({ ...ticket, company: {} })} style={{ flex: 1 }}>
                                    Clear
                                </Button>
                            </div>
                        </div>
                        <div className="p-field">
                            <label htmlFor="userName">Show Date</label>
                            <InputText
                                id="showDate"
                                value={ticket.showDate}
                                onChange={(e) => setTicket({ ...ticket, showDate: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.showDate})}
                            />
                            {submitted && !ticket.showDate && <small className="p-invalid">Show Date is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="userName">Level</label>
                            <InputText
                                id="level"
                                value={ticket.level}
                                onChange={(e) => setTicket({ ...ticket, level: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.level})}
                            />
                           
                        </div>
                        <div className="p-field">
                            <label htmlFor="userName">Sale Date</label>
                            <InputText
                                id="level"
                                value={ticket.saleDate}
                                onChange={(e) => setTicket({ ...ticket, saleDate: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.saleDate})}
                            />
                                {submitted && !ticket.saleDate && <small className="p-invalid">Sale Date is required.</small>}
                        </div>
                        <div className="p-field">
                            <label htmlFor="userName">Last Date</label>
                            <InputText
                                id="level"
                                value={ticket.lastDate}
                                onChange={(e) => setTicket({ ...ticket, lastDate: e.target.value })}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !ticket.lastDate})}
                            />
                                {submitted && !ticket.lastDate && <small className="p-invalid">Last Date is required.</small>}
                        </div>
                        <div className="p-field-checkbox">
                            <Checkbox
                                id="isActive"
                                onChange={(e) => {
                                    setTicket({ ...ticket, isActive: e.checked });
                                }}
                                checked={ticket.isActive}
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
                            {tickets && (
                                <span>
                                    Are you sure you want to delete <b>{tickets.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}