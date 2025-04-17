import { PropsWithChildren, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.authenticated && !auth.loading) navigate("/login");
  }, [navigate, auth]);

  return children;
};

export default ProtectedRoute;
