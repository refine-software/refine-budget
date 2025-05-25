import { User } from "./apiTypes";

export * from "./apiTypes";

export enum Role {
    user,
    admin,
}

export type AuthContextType = {
    user: User;
    authenticated: boolean;
    loading: boolean;
    role: Role;
    login(): void;
    logout(): void;
    setAdmin(): void;
    setUserCtx(u: User): void;
};

export type RegisterContextType = {
    email: string;
    setEmail: (email: string) => void;
};