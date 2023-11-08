import * as types from "../constants";

const initialState = {
  users: [],
  page: 2,
  size: 7,
  totalSize: 0
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_USER:
      return {
        ...state,
        users: actions.payload.users,
        page: actions.payload.page,
        // size: actions.payload.size,
        totalSize: actions.payload.totalSize

      };
    default:
      return state;
  }
}