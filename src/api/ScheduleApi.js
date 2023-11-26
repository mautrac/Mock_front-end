import Api from './Api';

const url = "/film-schedules";

const getAllSchedules = (page = 1, size = 10, sortField = 'scheduleId', sortType = 'desc') => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // // search
    // if (search) {
    //     parameters.search = search;
    // }



    return Api.get(`${url}`, { params: parameters });
};


// const create = (name) => {

//     const body = {
//         name
//     }

//     return Api.post(url, body);
// };

// const getById = (id) => {
//     return Api.get(`${url}/${id}`);
// };


const deleteByscheduleIds = (scheduleIds) => {
    return Api.delete(`${url}/${scheduleIds.toString()}`);
};

// export
const api = { getAllSchedules, deleteByscheduleIds }
export default api;