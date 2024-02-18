import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handdleGetCart } from "./cartReducer";
import { customerService } from "../../services/customerService";

const initialState = {
  showModal: "",
  profile: null,
  ////State Loading
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleShowModal: (state, action) => {
      state.showModal = action.payload;
      // console.log('action---->',action );
    },
    handleCloseModal: (state) => {
      state.showModal = "";
    },
    handleLogout: (state, action) => {
      tokenMethod.remove();
      // navigate(PATHS.HOME);
      state.profile = null;
      state.showModal = "";
      message.success("Successful logout");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(handleRegister.fulfilled, (state) => {
        state.loading.register = false;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(handleRegister.rejected, (state) => {
        state.loading.register = false;
      })
      ////Hoàn thành
      .addCase(handleLogin.fulfilled, (state) => {
        state.loading.login = false;
        state.showModal = "";
        // console.log("statefulfilled",state?.loading.login)
        // console.log("1",1)
      })

      .addCase(handleLogin.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading.login = false;
      })

      // .addCase(handleGetProfile.fulfilled, (state, action) => {
      //   state.profile = action.payload;
      //   state.loading.getProfile = false;
      // })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.fulfilled, (state, action) => {
        // ctrl + l
        // console.log('🚀action---->', action);
        state.profile = action.payload;
        state.loading.getProfile = false;
      })

      // Handle Add To Wishlist
      .addCase(handleAddWishList.pending, (state) => {
        state.loading.wishList = true;
      })
      .addCase(handleAddWishList.fulfilled, (state) => {
        state.loading.wishList = false;
      })
      .addCase(handleAddWishList.rejected, (state) => {
        state.loading.wishList = false;
      })

      // Handle Remove In Wishlist
      .addCase(handleRemoveInWishList.pending, (state) => {
        state.loading.wishList = true;
      })
      .addCase(handleRemoveInWishList.fulfilled, (state) => {
        state.loading.wishList = false;
      })
      .addCase(handleRemoveInWishList.rejected, (state) => {
        state.loading.wishList = false;
      });
  },
});

export const { actions, reducer: authReducer } = authSlice;
export const { handleShowModal, handleCloseModal, handleLogout } = actions;

export default authReducer;

/////Thunk Handle Login//
export const handleLogin = createAsyncThunk(
  ///tên actions (nguyên tắc tên reducer/tên action)
  "auth/handleLogin",
  async (payload, { dispatch, getState }) => {
    // const payload = { ...loginData };
    ///xử lí api Login
    try {
      const res = await authService.login(payload);
      console.log("res", res);
      const { token: accessToken, refreshToken } = res?.data || {};
      tokenMethod.set({
        accessToken,
        refreshToken,
      });
      // dispatch(handleCloseModal())
      dispatch(handleGetProfile());
      dispatch(handdleGetCart());
      message.success("Sign-in Successfully");
      return true;
      // if (!!tokenMethod) {
      //   // console.log("accessToken",accessToken);
      //   // console.log("refreshToken",refreshToken);
      //   //Đăng nhập lấy thông tin profile
      //   // handleGetProfile();
      //   // handleGetProfilePayment();
      //   // handleGetProfileCourse();
      //   //Đóng modal
      //   // handleCloseModal();
      // }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Not Found") {
        message.error("Username or password is incorrect");
      }
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

////Register
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (dataRegister, thunkAPI) => {
    const { email, password } = dataRegister || {}; //detrustering  phải đúng vs backend trả về
    //Xử lí payload
    const payload = {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
    };
    try {
      const registerRes = await authService.register(payload);

      if (registerRes?.data?.id) {
        message.success("Successful registration");
        thunkAPI.dispatch(
          handleLogin({
            email: payload.email,
            password: payload.password,
          })
        );

        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email has been registered");
      }
      return thunkAPI.rejectWithValue(errorInfo);
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/handleGetProfile",
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    try {
      const resProfile = await authService.getProfile();
      // if (res?.data?.data) {
      //   setProfile(res.data.data);
      // }
      return resProfile?.data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error?.response?.data);
      // handleLogout();
    }
  }
);

// Handle add wishlist
export const handleAddWishList = createAsyncThunk(
  "auth/handleAddWishList",
  async (actionPayload, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const { profile } = thunkApi.getState()?.auth || {};
        const { whiteList } = profile || {};

        let payload = {};
        if (whiteList?.length > 0) {
          const matchIndex = whiteList?.findIndex(
            (item) => item?.id === actionPayload
          );
          if (matchIndex > -1) {
            message.error("Product is already in wishlist");
            return;
          } else {
            payload = { product: actionPayload };
          }
        } else {
          payload = { product: actionPayload };
        }
        const res = await customerService.addProductToWishList(payload);
        if (res?.data) {
          message.success("Add to wishlist successfully");
          thunkApi.dispatch(handleGetProfile());
        }
        return res?.data;
      } catch (error) {
        message.error(error?.response?.data);
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);

// Handle remove wishlist
export const handleRemoveInWishList = createAsyncThunk(
  "auth/handleRemoveInWishList",
  async (actionPayload, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        const payload = {
          product: actionPayload,
        };
        const res = await customerService.deleteProductInWishList(payload);
        if (res?.data?.data) {
          message.success("Remove product in wishlist successfully");
          thunkApi.dispatch(handleGetProfile());
          return res?.data?.data;
        }
      } catch (error) {
        message.error("Remove product in wishlist failed");
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);
