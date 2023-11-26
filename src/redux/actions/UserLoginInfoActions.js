import * as types from "../constants";

export function setUserLoginInfo(user_id, userName, email, firstName, lastName, role, status) {
  return {
    type: types.USER_LOGIN_INFO,
    payload: {
      "user_id": user_id,
      "userName": userName,
      "email": email,
      "firstName": firstName, 
      "lastName": lastName,
      "role": role,
      "status": status
    }
  };
}

export function setTokenInfo(token) {
  return {
    type: types.TOKEN_INFO,
    payload: token
  };
}