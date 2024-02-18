import React from 'react'
import { Link } from 'react-router-dom'
import PATHS from '../../constants/paths'
import styled from 'styled-components';
import { Empty } from 'antd';
import { formatCurrency, formatNumber } from '../../utils/format';
import { useDispatch } from 'react-redux';
import { handdleAddCart } from '../../store/reducers/cartReducer';

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;
// const overflowText = {
//     display: "-webkit-inline-box"
//     -webkit-line-clamp : "2",
//     -webkit-box-orient : "vertical",
//     text-overflow: "ellipsis",
//     overflow: "hidden",
// };

const ProductCard = (item) => {
  const {name,price,images,slug,title,discount,rating,id,
    color} = item || {};
  // console.log('🚀item---->',item );
  // console.log("images",images);
  const productPath = PATHS.PRODUCTS + `/${slug}`;
  const dispatch = useDispatch();
  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // ADD CART

    // Set up data cart
    const addPayload = {
      addedId: id,
      addedColor: color?.[0] || "",
      addedQuatity: 1,
      addedPrice: price - discount,
    };

    // Gọi `handleAddCart` và truyền payload vào - hàm `handleAddCart` này được tạo từ `cartReducer`
    dispatch(handdleAddCart(addPayload));
  };

  return (
    <div className="product product-2">
    <figure className="product-media">
    {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
      <Link to={productPath} style={{ height: 275 }}>
      {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty
                description=""
                // props này mặc định của Antd Empty, dùng để thay đổi ảnh của Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </ImageWrapper>
          )}
      </Link>
      <div className="product-action-vertical">
        <a
          href="#"
          className="btn-product-icon btn-wishlist btn-expandable"
        >
          <span>add to wishlist</span>
        </a>
      </div>
      <div className="product-action product-action-dark">
        <a
          href="#"
          className="btn-product btn-cart"
          title="Add to cart"
          onClick={_onAddToCart}
        >
          <span>add to cart</span>
        </a>
      </div>
    </figure>
    <div className="product-body">
      <h3 className="product-title">
        <Link to={productPath} className='product-title-item'  >
         {title || ""}
        </Link>
      </h3>
      <div className="product-price">{
        discount ? (
          <>
            {" "}
            <span className="new-price">
              ${formatCurrency(price - discount || 0)}
            </span>
            <span className="old-price">
              Was ${formatCurrency(price || 0)}
            </span>{" "}
          </>
        ) : (
          <>${formatCurrency(price || 0)}</>
        )
      }
      </div>
      <div className="ratings-container">
        <div className="ratings">
          <div className="ratings-val"   style={{
                width: `${(formatNumber(rating) || 0) * 20}%`,
              }} />
        </div>
        <span className="ratings-text">( {formatNumber(rating)} Reviews )</span>
      </div>
    </div>
  </div>
  )
}

export default ProductCard