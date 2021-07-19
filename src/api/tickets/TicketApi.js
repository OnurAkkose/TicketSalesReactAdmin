import api from "../core/BaseApi";
const uri = "Ticket";
const saveUri = "Ticket/Add";

const getTickets = () => {
    return api
        .get(uri)
        .then(({ data }) => data)
        .catch((error) => {
            console.log(JSON.stringify(error));
            return error;
        });
};

const saveTicket = (ticket) => {
    console.log(JSON.stringify(ticket));
    return api
        .post(saveUri, ticket)
        .then(({ data }) => data)
        .catch((error) => ({ error }));
};

const updateTicket = (ticket) => {
    return api
        .put(`/${uri}/${ticket.id}`, ticket)
        .then(({ data }) => data)
        .catch((error) => ({ error }));
};

const deleteTicket = (ticketId) => {
    api.delete(`/${uri}/${ticketId}`).catch((error) => ({ error }));
};

const TicketApi = {
    getTickets,
    saveTicket,
    updateTicket,
    deleteTicket,
};

export default TicketApi;
