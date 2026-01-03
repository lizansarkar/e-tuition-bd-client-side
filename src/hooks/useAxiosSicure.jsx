import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./UseAuth";
import { config } from "webpack";
import { useNavigate } from "react-router";

const axiosSicure = axios.create({
  baseURL: "https://e-tuition-bd-server-side.vercel.app",
});

export default function useAxiosSicure() {
  const {user, logOut} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSicure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const ResponseInterceptor = axiosSicure.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      console.log("Response Error Interceptor:", error);
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        console.log("Unauthorized or Forbidden response - logging out user.");
        logOut()
          .then(() => {
            console.log("User logged out due to unauthorized access.");
            navigate("/login");
          })
      }
      return Promise.reject(error);
    })

    return() => {
      axiosSicure.interceptors.request.eject(requestInterceptor);
      axiosSicure.interceptors.response.eject(ResponseInterceptor);
    }

  }, [user, logOut, navigate]);

  return axiosSicure;
}
