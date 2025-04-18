import { User } from "../types";
import api from "./axiosConfig"


const getUser = async (): Promise<User> => {
    const res = api.get("user");
    const userRes = await res;
    return userRes.data;
}

export { getUser };