import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:51522/api"//"https://gustavoapi.gear.host/api"//process.env.REACT_APP_APISERVICE_URL
});


export default api;