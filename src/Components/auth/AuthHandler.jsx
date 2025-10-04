import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authToken = queryParams.get("authToken");

    if (authToken) {
      localStorage.setItem("authToken", authToken);  // ✅ save token
      window.history.replaceState({}, document.title, "/"); // clean URL
    }
  }, [location]);

  return null; // or maybe a loader/spinner
};

export default AuthHandler;
