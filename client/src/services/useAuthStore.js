import {create} from 'zustand';
import api from "./api.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignedUp: false,
  isLogedIn: false,
  isCheckingAuth: true,


  checkAuth: async() => {
    try{
      const res = await api.get("/auth/check");
      set({authUser: res.data})
    } catch(error){
      console.log("Error in check auth",error);
      set({authUser: null});
    } finally{
      set({isCheckingAuth: false});
    }
  },
  signup: async(data) => {
    set({isSignedUp:true});
    try{
      const res = await api.post("/auth/sign-up",data);
      set({authUser:res.data});
      console.log("Account created successfully");

    }catch(error){
      console.log("Error in sign up form",error.message);
    }finally{
      set({isSignedUp:false});
    }
  },

  login: async(data) => {
    console.log(data);
    set({isLogedIn:true});
    try{
      const res = await api.post("/auth/sign-in",data);
      set({authUser:res.data});
      console.log("Logged in  successfully");

    }catch(error){
      console.log("Error in login  form",error.message);
    }finally{
      set({isSignedUp:false});
    }
  },

  logout: async() => {
    try{
      await api.post("/auth/sign-out");
      set({authUser:null});
      console.log("Logged out successfully");
    }catch(error){
      console.log("Error in logout:", error);
    }}
  }
))