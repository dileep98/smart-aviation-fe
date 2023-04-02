import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.host}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
