import React, { useEffect } from 'react'
import { orderService } from '../services/orderService';
import { CHECKOUT_MESSAGE, COUPON_MESSAGE } from '../constants/message';
import PATHS from '../constants/paths';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handdleGetCart, updateCacheCart } from '../store/reducers/cartReducer';
import { message } from 'antd';

const useCheckOutPage = () => {
  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Checkout discount input - toggle label if input is empty etc...
$('#checkout-discount-input').on('focus', function () {
   // Hide label on focus
   $(this).parent('form').find('label').css('opacity', 0);
}).on('blur', function () {
   // Check if input is empty / toggle label
   var $this = $(this);

   if ($this.val().length !== 0) {
       $this.parent('form').find('label').css('opacity', 0);
   } else {
       $this.parent('form').find('label').css('opacity', 1);
   }
});
}, [])

   // Handle Add Coupon
   const handleAddCoupon = async (coupon) => {
    try {
      const couponRes = await orderService.getVoucher(coupon);
    console.log('🚀couponRes---->', couponRes);
      const couponInfo = couponRes?.data;
      console.log('🚀couponInfo---->', couponInfo);

      if (couponInfo) {
        const { subTotal, shipping } = cartInfo || {};
        dispatch(
          updateCacheCart({
            ...cartInfo,
            discount: couponInfo.value || 0,
            discountCode: couponInfo.code || "",
            total: subTotal - (couponInfo.value || 0) + (shipping?.price || 0),
          })
        );
        message.success(COUPON_MESSAGE.addSuccess);
      }
    } catch (error) {
      message.error(COUPON_MESSAGE.addFailed);
    }
  };
 // Handle Remove Coupon
 const handleRemoveCoupon = () => {
  try {
    if (cartInfo.discountCode) {
      const { subTotal, shipping } = cartInfo || {};
      dispatch(
        updateCacheCart({
          ...cartInfo,
          discount: 0,
          discountCode: "",
          total: subTotal + (shipping?.price || 0),
        })
      );
    }
    message.success(COUPON_MESSAGE.removeSuccess);
  } catch (error) {
    message.error(COUPON_MESSAGE.removeFailed);
  }
};

 // Handle Checkout
 const handleCheckout = async (data) => {
  const { formInfo, cartInfo } = data || {};
  const { phone, email, fullName, province, district, ward, street, note } =
    formInfo || {};
  const {
    shipping,
    variant,
    subTotal,
    total,
    product,
    quantity,
    totalProduct,
    discount,
    discountCode,
    paymentMethod,
  } = cartInfo || {};

  const checkoutPayload = {
    address: {
      phone,
      email,
      fullName,
      street: `${street || ""}, ${ward?.label || ""}, ${
        district?.label || ""
      }, ${province?.label || ""}`,
    },
    shipping: {
      typeShip: shipping?.typeShip,
      price: shipping?.price,
    },
    variant,
    subTotal,
    total,
    product: product?.map((item) => item.id),
    quantity,
    totalProduct,
    discount,
    discountCode,
    paymentMethod,
    note,
  };

  try {
    const checkoutRes = await orderService.checkout(checkoutPayload);
    if (checkoutRes?.data) {
      dispatch(handdleGetCart());
      message.success(CHECKOUT_MESSAGE.checkoutSuccess);
      navigate(PATHS.CHECKOUT_SUCCESS);
    }
  } catch (error) {
    message.error(CHECKOUT_MESSAGE.checkoutFailed);
  }
};

 const checkOutDiscountProps ={
      addedCoupon: cartInfo?.discountCode,
      handleAddCoupon,
      handleRemoveCoupon,
        
    }
    
  const checkoutFormProps = {
    handleCheckout,
  };

  return{
    checkOutDiscountProps,
    checkoutFormProps
  } 
  
}

export default useCheckOutPage