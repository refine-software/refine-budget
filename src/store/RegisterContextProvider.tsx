import React, { useState } from "react";
import { RegisterContext } from "./register-context";

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {
    const [email, setEmail] = useState("");

    return (
        <RegisterContext.Provider value={{ email, setEmail }}>
            {children}
        </RegisterContext.Provider>
    );
}
