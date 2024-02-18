import axiosInstance from "../utils/axiosInstance";
import tokenMethod from "../utils/token";

export const authService = {
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  // profiles(payload = {}){
  //   return axiosInstance.get(`/customer/profiles`);
  // }
  getProfile() {
    return axiosInstance.get(`/customer/profiles`);
  },
  putProfile(payload = {}) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    {
    }
  },
};
