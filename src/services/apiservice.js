import axios from 'axios';


const api = axios.create({
    baseURL: "https://gustavoapi.gear.host/api"//process.env.REACT_APP_APISERVICE_URL
});


export default api;