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
// export
const api = {
    createTicket
}
export default api;