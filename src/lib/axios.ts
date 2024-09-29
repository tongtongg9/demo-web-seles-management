import axios from 'redaxios';
import { API_BASE_URL } from './constants';

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;