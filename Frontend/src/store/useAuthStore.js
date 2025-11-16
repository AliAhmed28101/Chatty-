// States to be used in randm components
import { create } from "zustand";

import { axiosInstance } from "../lib/axios";

import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({


    authUser: null,

    isSigningUp: false,

    isLoggingIn: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    //when we refresh our page for a second we will like to check if the user is authenticated or not so we can place a loader type something to show

    //we have an endpoint for this (/check) in backend 
    checkAuth: async () => {
        try {
            //we will try to send the req to our endpoint under try here check wala endpoint bana hua hai backend mein
            const res = await axiosInstance.get("/auth/check")

            //setting the state with data 
            set({ authUser: res.data })


        } catch (error) {

            set({ authUser: null })
            console.log("Error in checkAuth", error)

        }
        finally {
            // finally we can set the loading state to be false as well
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {

        //signup logic
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data })

            toast.success("Account created Successfully");

        } catch (error) {

            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },



    logout: async() =>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged Out Successfully");

        } catch (error) {
            toast.error("error.response.data.message")
        }
    }

}));