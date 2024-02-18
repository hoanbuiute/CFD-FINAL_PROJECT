import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import styled from "styled-components";
import { formatCurrency } from "../../utils/format";
import ProductColor from "../ProductColor";
import { Modal } from "antd";

const DropDownContainer = styled.div`
  max-height: 30vh;
  overflow-y: scroll;
  padding-right: 25px;
`;

const ProductCartDetailWrapper = styled.h3`
  display: flex !important;
  flex-direction: column;
  gap: 10px;
  .product-variant {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
  }
  .product-nav-dots {
    margin: 0;
  }
`;

const CartDropdown = ({
  product,
  quantity,
  handleRemoveProduct,
  total,
  shipping,
}) => {
  const { confirm } = Modal;
  const _onRemoveClick = (e, removeIndex) => {
    e?.preventDefault();
    e?.stopPropagation();
    const removedProduct = product?.[removeIndex] || {};
    // console.log("🚀removeIndex---->", removeIndex);
    // console.log("🚀removeProduct---->", removedProduct);
    confirm({
      title: "Do you want remove item from cart ?",
      content: (
        <>
          <p>{`${removedProduct.name || ""}`}</p>
          <p>{`${removedProduct.quantity || 0} x $${removedProduct.price}`}</p>
        </>
      ),
      onOk() {
        if (removeIndex > -1) {
          handleRemoveProduct?.(removeIndex);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // console.log('🚀 product---->', product );
  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart" />
        <span className="cart-count">{product?.length || 0}</span>
      </a>
      <div
        className="dropdown-menu dropdown-menu-right"
        style={{ width: "400" }}
      >
        <DropDownContainer className="dropdown-cart-products">
          {product?.length > 0 ? (
            product?.map((product, index) => {
              const {
                slug,
                images,
                id,
                price,
                totalProduct,
                name,
                variant,
                quantity,
              } = product || {};
              const productPath = PATHS.PRODUCTS + `/${slug}`;
              let imagePath = images?.[0];
              if (imagePath?.split("https")?.length > 2) {
                imagePath = imagePath?.split("https");
                imagePath = "https" + imagePath[2];
              }

              return (
                <div className="product" key={id + index}>
                  <ProductCartDetailWrapper className="product-cart-details">
                    <h4 className="product-title">
                      <Link to={productPath}>{name}</Link>
                    </h4>
                    <div className="product-variant">
                      color: <ProductColor color={[variant]} />
                    </div>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">{quantity}</span> x $
                      {formatCurrency(price)}{" "}
                    </span>
                  </ProductCartDetailWrapper>
                  <figure className="product-image-container">
                    <Link to={productPath} className="product-image">
                      <img src={imagePath} alt={name} />
                    </Link>
                  </figure>
                  <a
                    href="#"
                    className="btn-remove"
                    title="Remove Product"
                    onClick={(e) => {
                      _onRemoveClick(e, index);
                    }}
                  >
                    <i className="icon-close" />
                  </a>
                </div>
              );
            })
          ) : (
            <p>
              Therer is no product in cart -
              <Link to={PATHS.PRODUCTS}>Go to shop</Link>
            </p>
          )}
        </DropDownContainer>
        <div className="dropdown-cart-total">
          <span>Total</span>
          <span className="cart-total-price">${formatCurrency(total)}</span>
        </div>
        <div className="dropdown-cart-action">
          <Link to={PATHS.CART} className="btn btn-primary">
            View Cart
          </Link>
          <Link to={PATHS.CHECKOUT} className="btn btn-outline-primary-2">
            <span>Checkout</span>
            <i className="icon-long-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
