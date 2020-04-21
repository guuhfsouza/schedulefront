import axios from 'axios';


const api = axios.create({
    baseURL: "http://gustavoapi.gear.host/api"
});


export default api;