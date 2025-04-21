import { User } from "../types";
import api from "./axiosConfig"
import { getAccessToken } from "../utils";

const getUser = async (): Promise<User> => {
    const accTokenObj = getAccessToken();
    if (accTokenObj === null)
        throw new Error("you're not authorized");

    const res = await api.get("user", {
        headers: {
            Authorization: accTokenObj.accessToken,
        }
    });
    return res.data as User;
}

export { getUser };