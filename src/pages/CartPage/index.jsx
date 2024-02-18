
import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import CartTable from "../../components/CartTable";
import CartSummary from "../../components/CartSummary";
import useCartpage from "../../hooks/useCartpage";


const CartPage = () => {
 const {   cartTableProps,
  CartSummaryProps,} =useCartpage()
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>
      
      <div className="container">
      <Breadcrumb className={`mb-2`}>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item  >     <Link to={PATHS.PRODUCTS}>Product</Link></Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>
      </div>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
           <CartTable {...cartTableProps}/>
            <CartSummary {...CartSummaryProps}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
