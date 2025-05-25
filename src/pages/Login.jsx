import React from "react";
import { redirectToAuthCodeFlow } from "../utils/auth";

const Login = () => {
  const handleLogin = async () => {
    await redirectToAuthCodeFlow();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <button onClick={handleLogin} className="bg-green-500 p-4 rounded">
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
