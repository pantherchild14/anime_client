import AxiosService from "@/lib/commons/axiosService";
import { API_SERVER } from "@/lib/constants/index";
import { LoginResponseService, SignUpResponseService } from "@/lib/services/auth";
import { AxiosResponse } from "axios";

export const ApiLogin = (data: { email: string; password: string }): Promise<AxiosResponse<LoginResponseService>> => {
    return AxiosService.post<LoginResponseService>(`${API_SERVER}/auth/sign-in`, data);
};

export const ApiSignUp = (data: { username: string; email: string; password: string }): Promise<AxiosResponse<SignUpResponseService>> => {
    return AxiosService.post<SignUpResponseService>(`${API_SERVER}/auth/sign-up`, data);
};

