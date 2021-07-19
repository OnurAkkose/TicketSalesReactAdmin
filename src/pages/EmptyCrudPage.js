import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";

let emptyLocation = {
    id: 0,
    name: "",
};

export const EmptyCrudPage = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const datas = [];
    const [location, setLocation] = useState(emptyLocation);
    const [submitted, setSubmitted] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const userInfo = localStorage.getItem('username'); 
    if(userInfo == null){
        window.location.href = "#/login";
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState("");

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setLocation({ ...location, [name]: val });
    };

    const leftToolbarTemplate = () => {
        const openNew = () => {
            setLocation(emptyLocation);
            setSubmitted(false);
            setDialog(true);
        };

        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Locations</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        const editLocationType = (location) => {
            setLocation({ ...location });
            setDialog(true);
        };

        const confirmDeleteLocationType = (location) => {
            setLocation(location);
            setDeleteDialog(true);
        };

        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editLocationType(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteLocationType(rowData)} />
            </div>
        );
    };

    const dialogFooter = () => {
        const saveData = () => {
            //TODO Update Logic is Here

            setSubmitted(true);
            setDialog(false);
            setLocation(emptyLocation);
        };
        const hideDialog = () => {
            setSubmitted(false);
            setDialog(false);
        };

        return (
            <>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveData} />
            </>
        );
    };

    const deleteDialogFooter = () => {
        const deleteData = () => {
            //TODO Dispatch Delete Action Here

            setDeleteDialog(false);
            setLocation(emptyLocation);
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
                        value={datas}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Location Types"
                        globalFilter={globalFilter}
                        emptyMessage="No Location Type found"
                        header={header}
                    >
                        <Column field="name" header="Code" sortable></Column>
                        <Column field="type.type" header="Location Type" sortable></Column>
                        <Column field="operatingMode" header="Operation Mode" sortable></Column>
                        <Column field="printType" header="Print Type" sortable></Column>
                        <Column field="isActive" header="Active" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={dialog}
                        style={{ width: "450px" }}
                        header="Location Details"
                        modal
                        className="p-fluid"
                        footer={dialogFooter}
                        onHide={() => setDialog(false)}
                    >
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={location.name}
                                onChange={(e) => onInputChange(e, "name")}
                                required
                                autoFocus
                                autoComplete="off"
                                className={classNames({ "p-invalid": submitted && !location.name })}
                            />
                            {submitted && !location.name && <small className="p-invalid">Type is required.</small>}
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
                            {location && (
                                <span>
                                    Are you sure you want to delete <b>{location.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
