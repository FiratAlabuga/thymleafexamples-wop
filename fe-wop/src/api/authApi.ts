import axiosInstance from '../utils/axiosInstance';
import { UserDTO } from '../types/UserDTO';

export const authApi = {
    login: (credentials: { username: string; password: string }) =>
        axiosInstance.post('/api/v1/auth/login', credentials),
    register: (user: UserDTO) => axiosInstance.post('/api/v1/auth/register', user),
};