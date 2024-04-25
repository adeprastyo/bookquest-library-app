import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useToken } from "@/utils/contexts/token";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const { token, user } = useToken();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/profile",
    "/profile/edit",
    "/profile/borrows",
    "/dashboard",
  ];
  const adminProtected = ["/dashboard"];
  const userProtected = ["/profile/borrows"];

  // jika sudah login
  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/" />;
  }

  // jika belum login
  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (adminProtected.includes(pathname)) {
      if (user?.role === "user") return <Navigate to="/" />;
    }

    if (userProtected.includes(pathname)) {
      if (user?.role === "admin") return <Navigate to="/dasboard" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
