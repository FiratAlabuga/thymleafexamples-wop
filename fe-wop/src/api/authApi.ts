import axiosInstance from "../utils/axiosIntance.ts";
import {UserDTO} from "../types/dto/UserDTO.ts";

// LoginResponse
interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string,
        username: string,
        role: string,
        expiresIn: number
    };
}
export const authApi = {
    login: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
        const response = await axiosInstance.post<LoginResponse>('/api/v1/auth/login', credentials);
        if (response.data.success) {
            // Token'i localStorage'a kaydet
            localStorage.setItem('token', response.data.data.token);
        }
        return response.data;
    },
    register: (user: UserDTO): Promise<any> => {
        return axiosInstance.post('/api/v1/auth/register', user);
    },
};