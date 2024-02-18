import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import ProductQuatity from "../../components/ProductQuatity";

const CartTable = ({
  product,
  quantity,
  handleRemoveProduct,
  total,
  shipping,
  quantityRef,
  handleUpdateQuantity,
  

}) => {
  // console.log('totalProduct---->',totalProduct);
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
  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
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
              console.log('🚀product---->', product);
              const productPath = PATHS.PRODUCTS + `/${slug}`;
              let imagePath = images?.[0];
              if (imagePath?.split("https")?.length > 2) {
                imagePath = imagePath?.split("https");
                imagePath = "https" + imagePath[2];
              }

              return (
                <tr>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <a href="#">
                          <img
                            src={imagePath}
                            alt={name}
                          />
                        </a>
                      </figure>
                      <h3  className="product-title">
                        <Link to={productPath}>{name}</Link>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col">${formatCurrency(price)}</td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <ProductQuatity
                        className="form-control"
                        defaultValue={quantity}
                        max={100}
                        step={1}
                        ref= {(thisRef)=>
                          (quantityRef.current[index] = thisRef )
                        
                        }
                        required
                        onChange={(value)=>{
                          handleUpdateQuantity?.(value,index)
                        }}
                      />
          
                    </div>
                  </td >
                  <td className="total-col">${formatCurrency?.(totalProduct)}</td>
                  <td className="remove-col">
                    <button className="btn-remove" onClick={(e)=> _onRemoveClick(e,index)} >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <p>
                Therer is no product in cart -
                <Link to={PATHS.PRODUCTS}>Go to shop</Link>
              </p>
            </tr>
          )}
        </tbody>
      </table>
      <div className="cart-bottom">
        <div className="cart-discount">
          <form action="#">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-error"
                required
                placeholder="Coupon code"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary-2" type="submit">
                  <i className="icon-long-arrow-right" />
                </button>
              </div>
            </div>
            <p className="form-error">Please fill in this field</p>
          </form>
        </div>
        <a href="#" className="btn btn-outline-dark-2">
          <span>UPDATE CART</span>
          <i className="icon-refresh" />
        </a>
      </div>
    </div>
  );
};

export default CartTable;
