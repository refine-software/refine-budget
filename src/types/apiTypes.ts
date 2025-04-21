import { Role } from ".";

export type LoginResType = {
    access_token: string;
    role: Role;
}

export type RefreshResType = {
    access_token: string;
    role: Role;
}

export type LoginReqType = {
    email: string;
    password: string;
    deviceId: string;
}

export type Budget = {
    id: number;
    amount: number;
    created_at: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
    debt: number;
    image: string;
    created_at: string;
    verified: true;
};
