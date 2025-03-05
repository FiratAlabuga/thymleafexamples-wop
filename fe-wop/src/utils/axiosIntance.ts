import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8285',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to requests
// Request interceptor: Auth token'ı istek başlıklarına eklemek için
axiosInstance.interceptors.request.use(
    (config) => { // InternalAxiosRequestConfig tipini kullanıyoruz
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration or other errors
// Response interceptor: Token süresi dolmuşsa veya başka hatalar varsa
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // Handle token expiration or unauthorized access
            // Token süresi dolmuşsa ya da yetkisiz erişim varsa
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

