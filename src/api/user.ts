import api from "./axiosConfig"

type User = {
    created_at: string,
    debt: number,
    email: string,
    id: number,
    image: string,
    name: string,
    password_hash: string,
    role: "admin",
    verified: true
};

const getUser = async (): Promise<User> => {
    const res = api.get("user");

    const userRes = await res;
    return userRes.data;
}

export { getUser };