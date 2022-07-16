import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, Navigate } from "react-router-dom";
import auth from "../firebase/firebase.init";
import useAdmin from "../hooks/useAdmin";
import LoginLoding from "./LoginLoding";

const RequireAdmin = ({ children }) => {
  const location = useLocation();

  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);

  if (loading || adminLoading) {
    return <LoginLoding></LoginLoding>;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
