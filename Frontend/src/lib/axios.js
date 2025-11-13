import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    //send the cookies in every single request 
    withCredentials: true
})