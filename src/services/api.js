import axios from 'axios';

const api = axios.create({
    baseURL: "https://schedule-backend.herokuapp.com/"
});

export default api;