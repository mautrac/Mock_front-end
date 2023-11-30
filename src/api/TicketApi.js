import Api from './Api';

const url = "/tickets/list";

const getAllTicketByUser = () => {

    return Api.get(`${url}`);
};

// export
const api = { getAllTicketByUser}
export default api;