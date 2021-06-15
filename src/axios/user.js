import axios from "axios";

export const login = (name, organization) => {
    return axios({
        baseURL: process.env.REACT_APP_SERVER_URL,
        method: "POST",
        url: "/user/login",
        data: {
            name,
            organization
        }
    });
};