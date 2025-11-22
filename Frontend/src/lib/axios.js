import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:5001/api",

    baseURL: "https://chatty-beige-beta.vercel.app/api",

    //send the cookies in every single request 
    withCredentials: true
})