import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

class AxiosService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create();
        this.instance.interceptors.request.use(
            this.handleRequestSuccess,
            this.handleRequestError
        );
        this.instance.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        );
    }

    private handleRequestSuccess(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        return config;
    }

    private handleRequestError(error: AxiosError): Promise<AxiosError> {
        return Promise.reject(error);
    }

    private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
        return response;
    }

    private handleResponseError(error: AxiosError): Promise<AxiosError> {
        return Promise.reject(error);
    }

    public get<T>(url: string, config?: object): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config);
    }

    public post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data);
    }
}

export default new AxiosService();
