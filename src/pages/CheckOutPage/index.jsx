import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";

import useCheckOutPage from "../../hooks/useCheckOutPage";
import CheckoutDiscount from "./CheckoutDiscount";
import CheckoutForm from "./CheckoutForm";

const CheckOutPage = () => {
  const { checkOutDiscountProps, checkoutFormProps } = useCheckOutPage();
  // const {} = checkOutDiscountProps
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <Breadcrumb className={`mb-2`}>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item  >     <Link to={PATHS.PRODUCTS}>Product</Link></Breadcrumb.Item>
        <Breadcrumb.Item isActive>Check Out</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
       <CheckoutDiscount {...checkOutDiscountProps}/>
       <CheckoutForm {...checkoutFormProps}/>
           
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOutPage;
