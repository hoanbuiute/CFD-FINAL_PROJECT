import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveCart, handleUpdateCart } from "../store/reducers/cartReducer";
import { sumArray } from "../utils/calculate";
import { SHIPPING_OPTIONS } from "../constants/general";

const useCartpage = () => {
  const dispatch = useDispatch();
  const quantityRef = useRef([]);
  // console.log('🚀quantityRef---->',quantityRef );
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);
  const {
    product,
    quantity,
    shipping,
    subTotal,
    total,
    variant,
    totalProduct,
    discount,
  } = cartInfo || {};
  console.log('🚀cartInfo---->',cartInfo );

  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
    dispatch(handleRemoveCart({ removeIndex }));
  };

  const updateQuantityTimeout = useRef();
  const handleUpdateQuantity = (updateQuantity, updateIndex) => {
    console.log("🚀1---->", 1);
    const getPayload = () => {
      const newQuantity = quantity.map((item, index) => 
        index === updateIndex ? updateQuantity : item
      );
      const newTotalProduct = totalProduct?.map((item, index) => 
        index === updateIndex
          ? product[updateIndex].price * updateQuantity
          : item
      );
      const newSubTotal = sumArray(newTotalProduct);
      const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0);

      return {
        ...cartInfo,
        product: product.map((item) => item.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
      };
    };
    if (updateQuantityTimeout.current) {
      clearTimeout(updateQuantityTimeout.current);
    }
    updateQuantityTimeout.current = setTimeout(async () => {
      if (
        !cartLoading &&
        updateQuantity !== "" &&
        quantity[updateIndex] !== updateQuantity
      ) {
        try {
          const res = await dispatch(
            handleUpdateCart(getPayload())
          ).unwrap();
        } catch (error) {
          quantityRef.current[updateIndex]?.reset?.();
        }
      }
    }, 300);
  };

  // const handleUpdateShipping = (selectTypeShip)=>{

  // }
    // Handle Update Shipping
    const handleUpdateShipping = (selectedTypeShipping) => {
      const selectedShipping = SHIPPING_OPTIONS.find(
        (option) => option.value === selectedTypeShipping
      );
  
      if (selectedShipping) {
        const updatePayload = {
          ...cartInfo,
          product: product.map((item) => item.id),
          shipping: {
            typeShip: selectedShipping.value,
            price: selectedShipping.price,
          },
          total: total - (shipping?.price || 0) + selectedShipping.price,
        };
  
        dispatch(handleUpdateCart(updatePayload));
      }
    };

  const cartTableProps = {
    product: product?.map((item, index) => {
      return {
        ...item,
        quantity: quantity?.[index],
        totalProduct: totalProduct?.[index],
        variant: variant?.[index],
      };
    }),
    totalProduct,
    handleRemoveProduct,
    handleUpdateQuantity,
    quantityRef,
  };

  const CartSummaryProps = {
    total,
    subTotal,
    typeShip:shipping?.typeShip,
    handleUpdateShipping,
  };

  return {
    cartTableProps,
    CartSummaryProps,
  
  };
};

export default useCartpage;
