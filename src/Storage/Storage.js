const isRememberMe = () => {
    if (localStorage.getItem("isRememberMe") !== null && localStorage.getItem("isRememberMe") !== undefined) {
        // convert string to boolean and return result
        return JSON.parse(localStorage.getItem("isRememberMe"));
    }
    return true;
}

const setRememberMe = (isRememberMe) => {
    localStorage.setItem("isRememberMe", isRememberMe);
}

const setItem = (key, value) => {
    if (isRememberMe()) {
        localStorage.setItem(key, value);
    } else {
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if (isRememberMe()) {
        return localStorage.getItem(key);
    }
    return sessionStorage.getItem(key);
}

const removeItem = (key) => {
    if (isRememberMe()) {
        localStorage.removeItem(key);
    } else {
        sessionStorage.removeItem(key);
    }
}

const setToken = (token) => {
    setItem("token", token);
};

const removeToken = () => {
    removeItem("token");
};

const getToken = () => {
    return getItem("token");
}

const isAuth = () => {
    return getToken() !== null && getToken() !== undefined;
}

const setUserInfo = (user) => {
    setItem("user_id", user.user_id);
    setItem("firstName", user.firstName);
    setItem("lastName", user.lastName);
    setItem("username", user.username);
    setItem("email", user.email);
    setItem("role", user.role);
    setItem("status", user.status);
}

const getUserInfo = () => {
    return {
        "user_id": getItem("user_id"),
        "firstname": getItem("firstName"),
        "lastname": getItem("lastName"),
        "username": getItem("username"),
        "email": getItem("email"),
        "role": getItem("role"),
        "status": getItem("status"),
    };
}

const removeUserInfo = () => {
    removeItem("user_id");
    removeItem("firstName");
    removeItem("lastName");
    removeItem("userName");
    removeItem("email");
    removeItem("role");
    removeItem("status");
};

// export
const Storage = { isRememberMe, setRememberMe, setToken, getToken, removeToken, isAuth, setUserInfo, getUserInfo, removeUserInfo };
export default Storage;