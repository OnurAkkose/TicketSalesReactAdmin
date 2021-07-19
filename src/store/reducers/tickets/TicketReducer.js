import { createReducer } from "@reduxjs/toolkit";
import TicketActions from "../../actions/tickets/TicketActions";

const initialState = { tickets: [] };

const TicketReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(TicketActions.getTicketsAction)
        .addCase(TicketActions.setTicketsAction, (state, action) => {
            state.tickets = action.payload;
        })
        .addCase(TicketActions.saveTicketsAction, (state, action) => {
            state.tickets.push(action.payload);
        })
        .addCase(TicketActions.updateTicketsAction, (state, action) => {
            const index = state.tickets.indexOf(state.tickets.find((l) => l.id === action.payload.id));
            state.tickets[index] = action.payload;
        })
        .addCase(TicketActions.deleteTicketsAction, (state, action) => {
            state.tickets.pop(action.payload);
        })
);

export default TicketReducer;
