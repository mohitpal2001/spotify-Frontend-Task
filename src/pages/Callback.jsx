import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (!code) throw new Error("Authorization code not found in URL.");

        const token = await getAccessToken(code);
        localStorage.setItem("access_token", token);
        navigate("/home");
      } catch (error) {
        console.error("Error during authentication callback:", error);
        alert(error.message || "Authentication failed. Please try again.");
      }
    };
    handleAuth();
  }, [location, navigate]);

  return <div className="text-white">Logging in...</div>;
};

export default Callback;
