import Api from './Api';

const url = "/tickets";

const createTicket = (values) => {
    //console.log(values);
    const body = {

        quantity: values.quantity,
        filmScheduleId: values.filmScheduleId
    }
    return Api.post(`${url}`, body);
}

const getAllTicketByUser = () => {

    return Api.get(`${url}/list`);
};
// export
const api = {
    createTicket, getAllTicketByUser
}
export default api;