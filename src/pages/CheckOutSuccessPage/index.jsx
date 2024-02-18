import React from "react";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";

const CheckOutSuccessPage = () => {
  return (
    <main className="main">
    <div className="content-success text-center">
      <div className="container">
        <h1 className="content-title">Your Order is Completed!</h1>
        <p>
          Your order has been completed. Your order details are shown for your
          personal accont.
        </p>
        <Button
          variant="outline"
          className="btn-minwidth-lg"
          link={PATHS.PROFILE.PROFILE_ORDER}
        >
          <span>VIEW MY ORDERS</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </div>
    </div>
  </main>
  )
};

export default CheckOutSuccessPage;
