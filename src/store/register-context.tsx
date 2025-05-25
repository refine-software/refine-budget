import { createContext } from "react";
import { RegisterContextType } from "../types";

export const RegisterContext = createContext<RegisterContextType>({
    email: "",
    setEmail: () => { }
});