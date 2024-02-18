import React from "react";
import ProductImageZoom from "../../components/ProductImageZoom";
import { formatCurrency, tranformNumberToPercent } from "../../utils/format";
import ProductColor from "../../components/ProductColor";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import ShareLink from "../../components/ShareLink";
import ProductQuatity from "../../components/ProductQuatity";

const ProductDetailTop = ({
  images,
  name,
  rating,
  handleAddToCart,

  handleAddToWishlist,
  review,
  price,
  description,
  category,
  color,
  colorRef,
  quatityRef,
  stock,
}) => {
  // console.log('colorRef---->', colorRef);
  const pathUrl = window.location.href;
  const catagoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;
  
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom image={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${tranformNumberToPercent(rating)}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                {review?.length} Reviews
              </a>
            </div>
            <div className="product-price"> ${formatCurrency(price)} </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {/* <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing. Sed lectus.{" "}
              </p> */}

            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor  ref={colorRef} color={color} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <ProductQuatity max={stock} ref={quatityRef} />
              </div>
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={(e) => {
                  e.preventDefault;
                  e.stopPropagation;
                  handleAddToCart();
                }}
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
             
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                  onClick={(e) => {
                    e.preventDefault;
                    e.stopPropagation;
                    handleAddToWishlist();
                  }}
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                {/* ///querry string */}
                <Link to={catagoryPath}>{category?.name}</Link>
              </div>
              <div
                className="social-icons social-icons-sm"
                style={{ gap: "0 5px" }}
              >
                <span className="social-label">Share:</span>
                <ShareLink type="facebook" title={"Facebook"} path={pathUrl}>
                  <i className="icon-facebook-f" />
                </ShareLink>
                <ShareLink type="twitter" title={"Twitter"} path={pathUrl}>
                  <i className="icon-twitter" />
                </ShareLink>
                <ShareLink type="instagram" title={"Instagram"} path={pathUrl}>
                  <i className="icon-instagram" />
                </ShareLink>
                <ShareLink type="pinterest" title={"Pinterest"} path={pathUrl}>
                  <i className="icon-pinterest" />
                </ShareLink>

                {/* <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a> */}
                {/* <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram" />
                </a> */}
                {/* <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
