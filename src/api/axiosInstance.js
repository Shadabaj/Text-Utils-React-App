import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7023/api",
});

// 🔥 REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("Token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//  RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {

        //  Handle unauthorized (401)
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please login again.");

            sessionStorage.removeItem("token");

            window.location.href = "/Login"; // redirect globally
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;