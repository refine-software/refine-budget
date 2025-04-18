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

export type Debt = {
    debt: number;
}

export type User = {
    created_at: string,
    debt: number,
    email: string,
    id: number,
    image: string,
    name: string,
    password_hash: string,
    role: Role,
    verified: true
};
