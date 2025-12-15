import axios from "axios";
import React, { useEffect } from "react";
import { config } from "webpack";
import useAuth from "./UseAuth";

const axiosSicure = axios.create({
  baseURL: "http://localhost:3000/",
});

export default function useAxiosSicure() {

  const {user} = useAuth();

  // useEffect(() => {
  //   // Add a request interceptor
  //   axiosSicure.interceptors.request.use(
  //     function (config) {
  //       // Do something before request is sent

  //       const token = localStorage.getItem('access-token');
  //       if (token) {
  //         config.headers['Authorization'] = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     function (error) {
  //       // Do something with request error
  //       return Promise.reject(error);
  //     }
  //   );
  //   // Add a response interceptor
  //   axiosSicure.interceptors.response.use(
  //     function (response) {
  //       // Any status code that lie within the range of 2xx cause this function to trigger
  //       // Do something with response data
  //       return response;
  //     },
  //     function (error) {
  //       // Any status codes that falls outside the range of 2xx cause this function to trigger
  //       // Do something with response error
  //       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
  //         // Handle unauthorized or forbidden responses
  //         console.log('Unauthorized access - logging out user');
  //         // Optionally, you can add logic to log out the user or redirect to login page
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    axiosSicure.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    
  }, [user]);

  return axiosSicure;
}
