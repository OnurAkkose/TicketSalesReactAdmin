import { createAction } from "@reduxjs/toolkit";

const getTicketsAction = createAction("TICKET_GET_TICKET");
const setTicketsAction = createAction("TICKET_SET_TICKET");
const saveTicketsAction = createAction("TICKET_SAVE_TICKET");
const updateTicketsAction = createAction("TICKET_UPDATE_TICKET");
const deleteTicketsAction = createAction("TICKET_DELETE_TICKET");

const TicketActions = {
    getTicketsAction,
    setTicketsAction,
    deleteTicketsAction,
    saveTicketsAction,
    updateTicketsAction    
};

export default TicketActions;
