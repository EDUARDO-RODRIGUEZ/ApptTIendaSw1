import axios from "axios";

export const apiTienda = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: 'http://213.136.88.102:9190/api',
});
