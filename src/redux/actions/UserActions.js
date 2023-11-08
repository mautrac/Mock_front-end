import * as types from "../constants";

export function getListUserAction(users,page,totalSize){
  return{
    type: types.GET_LIST_USER,
    payload: {
      users,
      page,
      totalSize
    }
  };
} 