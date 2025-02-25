import api from "./axiosConfig";

const register = async (name: string, email: string, password: string, image: string): Promise<number> => {
    const res = api.post("auth/register", {
        name,
        email,
        password,
        image
    });

    const status = (await res).status;
    return status;
};

const login = async (email: string, password: string): Promise<string> => {
    const res = api.post("auth/login", {
        email,
        password
    });

    const token = (await res).data.token;
    return token;
};

export { register, login };