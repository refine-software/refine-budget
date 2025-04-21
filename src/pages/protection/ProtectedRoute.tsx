import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

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
