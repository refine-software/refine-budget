import React, { useState } from "react"
import { AuthContext } from "../context/authContext"

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<"admin" | "user">("user");
  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);
  const setToUser = () => setRole("user");
  const setToAdmin = () => setRole("admin");

  return (
    <AuthContext value={{ authenticated, role, login, logout, setToUser, setToAdmin }}>
      {children}
    </AuthContext>
  )
}
