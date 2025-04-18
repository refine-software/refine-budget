export * from "./apiTypes";

export enum Role {
    user,
    admin,
}

export type AuthContextType = {
    authenticated: boolean;
    loading: boolean;
    role: Role;
    login(): void;
    logout(): void;
    setAdmin(): void;
};