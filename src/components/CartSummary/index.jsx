import React from "react";
import { formatCurrency } from "../../utils/format";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { message } from "antd";
import RadioGroup from "../RadioGroup";
import { SHIPPING_OPTIONS } from "../../constants/general";

const CartSummary = ({ total, subTotal, typeShip, handleUpdateShipping }) => {
  const navigate = useNavigate();
  const onProccedCheckout = (e) => {
    e?.preventDefault();
    if (!typeShip) {
      message.error("Please select shipping method");
    } else {
      navigate(PATHS.CHECKOUT);
    }
  };
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            <RadioGroup
              defaultValue={typeShip || ""}
              onChange={handleUpdateShipping}
            >
              {SHIPPING_OPTIONS.map((option, index) => {
                const { label, value, price } = option || {};
                return (
                  <tr key={value || index} className="summary-shipping-row">
                    <td>
                      <RadioGroup.Item value={value}>{label}</RadioGroup.Item>
                    </td>
                    <td>${formatCurrency(price) || 0}</td>
                  </tr>
                );
              })}
            </RadioGroup>
            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.PROFILE.PROFILE_ADDRESS}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <a
          href="#"
          className="btn btn-outline-primary-2 btn-order btn-block"
          onClick={onProccedCheckout}
        >
          PROCEED TO CHECKOUT
        </a>
      </div>
      <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-block mb-3">
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartSummary;
