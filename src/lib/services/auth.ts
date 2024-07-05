// api
export interface LoginResponseService {
    data: string;
}

export interface SignUpResponseService {
    data: string;
}

//hook

export interface LoginPayloadService {
    email: string;
    password: string;
}

export interface LoginResponsesService {
    data: {
        id: string;
    };
    jwt: string
}