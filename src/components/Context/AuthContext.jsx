import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import tokenMethod, { localToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { orderService } from "../../services/orderService";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  ///naviga
  const navigate = useNavigate();
  ///Xử lí logic
  const [showModal, setShowModal] = useState(""); //Register || login || ""
  // const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [courseInfo, setCourseInfo] = useState([]);

  ///////////////////////////HANDLE GET PROFILE COURSE////////////////////
  const handleGetProfileCourse = async () => {
    //xử lí api
    try {
      const res = await orderService.getCoursetHistories();
      const orderedCourses = res?.data?.data?.orders || [];
      setCourseInfo(orderedCourses);
      // console.log("orderedCourses",orderedCourses)
    } catch (error) {
      console.log("getPaymentHistories error", error);
    }
  };

  ///////////////////////////HANDLE LOGIN////////////////////
  ////handleLogin nhận vào dataform và hàm callback
  const handleLogin = async (loginData, callback) => {
    //Xử lí payload lấy tất cả từ login data
    const payload = { ...loginData };
    ///xử lí api Login
    try {
      const res = await authService.login(payload);
      console.log("res", res);
      if (res?.data) {
        const { token: accessToken, refreshToken } = res?.data|| {};
        // console.log("accessToken",accessToken);
        // console.log("refreshToken",refreshToken);
        message.success("đăng nhập thành công");
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
        //Đăng nhập lấy thông tin profile
        // handleGetProfile();
        // handleGetProfilePayment();
        // handleGetProfileCourse();
        //Đóng modal
        handleCloseModal();
      } 
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại")
    } finally {
      callback?.();
    }
  };
  /////////////////////////////HANDLE REGISTER ////////////////////
  const handleRegister = async (registerData, callback) => {
    const { email, password } = registerData || {}; //detrustering  phải đúng vs backend trả về
    //Xử lí payload
    const payload = {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
    };
    ///xử lí api Login
    try {
      const res = await authService.register(payload);
      console.log("res", res);
      if (res?.data?.id) {
        message.success("đăng kí thành công");
        console.log("data",res?.data)

        handleLogin({ email, password });
        

      } 
    } catch (error) {
      console.log("error", error);
      message.error("đăng kí thất bại");
    } finally {
      callback?.();
    }
  };

  /////////////////////////////HANDLE PUT PROFILE ////////////////////
  const handleUpdateProfile = async (profileData) => {
      try {
        const {
          firstName,
          email,
          password,
          facebookURL,
          introduce,
          phone,
          website,
        } = profileData || {}; //detrustering  phải đúng vs backend trả về
        ///Xử lí Payload
        const payload = {
          firstName: firstName,
          lastName: "",
          email,
          password,
          facebookURL,
          website,
          introduce,
          phone,
        };
    
        //Call Api
        const res = await authService.putProfile(payload);
        if(res?.data?.data.id){
          message.success("Cập nhật thông tin thành công");
          handleGetProfile();
        }
        
      } catch (error) {
        console.log("error", error);
      }

  };

  ///CHECK TOKEN LOGIN hiện profile
  useEffect(() => {
    if (!!tokenMethod.get()?.accessToken) {
      handleGetProfile();
      handleGetProfileCourse();
      handleGetProfilePayment();
    }
  }, []);
  ////////////////////////////////HANDLEGET LẤY PROFILE ////////////////////
  const handleGetProfile = async () => {
    //call get profile
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      // handleLogout();
    }
  };

  ///////////////////////////HANDLE GET PROFILE PAYMENT////////////////////
  const handleGetProfilePayment = async () => {
    //xử lí api
    try {
      const res = await orderService.getPaymentHistories();
      const orderedPayment = res?.data?.data?.orders || [];
      setPaymentInfo(orderedPayment);
    } catch (error) {
      console.log("GetProfilePayment error", error);
    }
  };

  ////////////////////////////////HANDLEGET LOGOUT ////////////////////
  const handleLogout = () => {
    // setCourseInfo([]);
    tokenMethod.remove();
    navigate(PATHS.HOME);
  };

  ////////////////////////////////HANDLE SHOWMODEL ////////////////////
  const handleShowModal = (modalType) => {
    if(!!!tokenMethod.get()){
      setShowModal(modalType || "");
    }
    
    
  };
  ///HANDLE CLOSE
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowModal("");
  };

  return (
    <AuthContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        profile,
        handleGetProfileCourse,
        handleGetProfilePayment,
        courseInfo,
        paymentInfo,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
