import axios from 'axios';

const authInstance = axios.create({
    baseURL:"http://localhost:5000/api/auth"
});

export default authInstance;