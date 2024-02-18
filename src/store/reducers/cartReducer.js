import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd";
import { sumArray } from "../../utils/calculate";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload;
      // console.log('action---->',action );
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },

  ////GetCard
  extraReducers: (builder) => {
    builder.addCase(handdleGetCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handdleGetCart.fulfilled, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = action.payload;
      console.log('🚀action---->',action );
    });
    builder.addCase(handdleGetCart.rejected, (state, action) => {
      state.cartLoading = false;
      state.cartInfo = {};
    });
    ////HandleUpdateCart
    builder.addCase(handdleAddCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handdleAddCart.fulfilled, (state, action) => {
      state.cartLoading = false;

    });
    builder.addCase(handdleAddCart.rejected, (state, action) => {
      state.cartLoading = false;

    });

    ////Remove
    builder.addCase(handleRemoveCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleRemoveCart.fulfilled, (state, action) => {
      state.cartLoading = false;

    });
    builder.addCase(handleRemoveCart.rejected, (state, action) => {
      state.cartLoading = false;

    });

    ///Update
    builder.addCase(handleUpdateCart.pending, (state) => {
      state.cartLoading = true;
    });
    builder.addCase(handleUpdateCart.fulfilled, (state) => {
      state.cartLoading = false;

    });
    builder.addCase(handleUpdateCart.rejected, (state) => {
      state.cartLoading = false;

    });
  },
});

export const { actions, reducer: cartReducer } = cartSlice;
export const { updateCacheCart, clearCart } = actions;

export default cartReducer;

export const handdleGetCart = createAsyncThunk(
  "cart/handdleGetCart",
  async (_, thunkApi) => {
    try {
      const cartRes = await cartService.getCart();
      // console.log("🚀cartRes---->", cartRes);
      // console.log('🚀cartRes---->',cartRes );
      // const cartResNewS = cartRes?.data
      // console.log('🚀cartResNewS---->', cartResNewS);
      return cartRes?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//////////////////////////////////////////////HANDDLEADDCART//////////////////////////////////////////////
export const handdleAddCart = createAsyncThunk(
  "cart/handdleAddCart",
  async (activePayload, thunkApi) => {
    try {
      const { addedId, addedColor, addedQuatity, addedPrice } = activePayload;
      // console.log('🚀addedQuatity---->', addedQuatity);

      const { cartInfo } = thunkApi.getState()?.cart || {};
      let addPayload = {};

      if (cartInfo?.id) {
        // console.log('cartInfo🚀---->',cartInfo );
        ///trả về -1 nếu false
        const matchIndex = cartInfo.product?.findIndex(
          (product) => product.id === addedId
        );
        const newProduct = cartInfo.product?.map((product) => {
          // console.log('🚀product---->',product.id );
          return product.id;
        });
        const newQuantity = [...(cartInfo.quantity ?? [])];
        // console.log('🚀newQuantity---->',newQuantity );
        const newVariant = [...(cartInfo.variant ?? [])];
        // console.log('🚀newVariant---->',newVariant );
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];
        if (matchIndex > -1 && newVariant[matchIndex] === addedColor) {
          newQuantity[matchIndex] =
            Number(newQuantity[matchIndex]) + Number(addedQuatity);
          newVariant[matchIndex] = addedColor;
          newTotalProduct[matchIndex] =
            Number(newTotalProduct[matchIndex]) + addedPrice * addedQuatity;
          // console.log('🚀newQuantity---->', newQuantity);
        } else {
          newProduct.push(addedId);
          newQuantity.push(addedQuatity);
          newVariant.push(addedColor);
          newTotalProduct.push(addedPrice * addedQuatity);
          // console.log('🚀1---->', 1);
        }
        // const newSubTotal = newTotalProduct.reduce(
        //   (curr,next) => Number(curr) + Number(next),0
        // ) || 0;
        const newSubTotal = sumArray(newTotalProduct, 0);

        const newTotal = newSubTotal - cartInfo.discount;

        addPayload = {
          ...cartInfo,
          product: newProduct,
          quantity: newQuantity,
          variant: newVariant,
          totalProduct: newTotalProduct,
          subTotal: newSubTotal,
          total: newTotal,
          discount: 0,
          paymentMethod: "",
        };
        // console.log('addPayload🚀---->',addPayload );
      } else {
        ////Đúng payloadApi trả về
        addPayload = {
          product: [addedId],
          quantity: [addedQuatity],
          variant: [addedColor],
          totalProduct: [addedPrice * addedQuatity],
          subTotal: addedPrice * addedQuatity,
          total: addedPrice * addedQuatity,
          discount: 0,
          paymentMethod: "",
        };
      }
      const cartRes = await cartService.updateCart(addPayload);
      // console.log('🚀cartRes---->',cartRes );
      // console.log('cartResnew---->', cartResnew);
      if (cartRes?.data.id) {
        thunkApi.dispatch(handdleGetCart());
        message.success("Add to cart Successfully");
      }
      return cartRes?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to cart failed");
    }
  }
);
//////////////////////////////////////////////REMOVE ADDCART//////////////////////////////////////////////
export const handleRemoveCart = createAsyncThunk(
  "cart/handleRemoveCart",
  async (activePayload, thunkApi) => {
    try {
      const { removeIndex } = activePayload || {};
      const { cartInfo } = thunkApi.getState()?.cart || {};
      // console.log('🚀cartInfo---->', cartInfo);
      
    if (removeIndex < 0) return false;
      /////lấy những sản phẩm không remove
      const newProduct = cartInfo?.product?.filter(
        (_, index) => index !== removeIndex).map((item)=>item.id);
      // const newProduct = newProductFilter.map((_, item) => item.id);
      // console.log('🚀newProduct---->',newProduct );
      const newQuantity = cartInfo?.quantity?.filter(
        (_, index) => index !== removeIndex
      );
      const newVariant = cartInfo?.variant?.filter(
        (_, index) => index !== removeIndex
      );
      const newTotalProduct = cartInfo?.totalProduct?.filter(
        (_, index) => index !== removeIndex
      );
      const newSubTotal = sumArray(newTotalProduct);
      const newTotal =
        newSubTotal -
        (cartInfo.discount ?? 0) +
        (cartInfo.shipping?.price ?? 0);
      const updatePayload = {
        ...cartInfo,
        product: newProduct,
        quantity: newQuantity,
        variant: newVariant,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
        discount: newProduct?.length > 0 ? cartInfo.discount : 0,
        shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
        
        // paymentMethod: "",
      };
      const cartRes = await cartService.updateCart(updatePayload);
      thunkApi.dispatch(handdleGetCart());
      message.success("Remove from cart successfully");
      // console.log('🚀cartRes---->', cartRes);
      return cartRes?.data;

    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Remove to cart failed");
    }
  }
);
//////////////////////////////////////////////UPDATECART//////////////////////////////////////////////
export const handleUpdateCart =createAsyncThunk (
  "cart/handleUpdateCart",
  async (activePayload, thunkApi) => {
    try {
      const cartRes = await cartService.updateCart(activePayload);
      thunkApi.dispatch(handdleGetCart());
      message.success("Update from cart successfully");
      return cartRes?.data;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Update to cart failed");
      throw error;
    }
  }

)