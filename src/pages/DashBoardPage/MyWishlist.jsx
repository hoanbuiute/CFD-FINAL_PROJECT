import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handdleAddCart } from '../../store/reducers/cartReducer';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { handleRemoveInWishList } from '../../store/reducers/authReducer';
import { formatCurrency } from '../../utils/format';

const MyWishlist = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { whiteList } = profile || {};

  const _onAddToCart = (e, addedProduct) => {
    e?.preventDefault();
    const { id, color, price, discount } = addedProduct || {};
    const addedPayload = {
      addedId: id,
      addedColor: color?.[0],
      addedQuantity: 1,
      addedPrice: price - discount,
    };
    dispatch(handdleAddCart(addedPayload));
  };

  const onRemoveProduct = (e, removedId) => {
    e?.preventDefault();
    dispatch(handleRemoveInWishList(removedId));
  };
  return (
    <div className="tab-pane fade active show">
      <table className="table table-wishlist table-mobile">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Stock Status</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {whiteList?.length > 0 &&
            whiteList.map((item, index) => {
              const { id, images, name, slug, price, stock } = item || {};
              const detailPath = PATHS.PRODUCTS + `/${slug}`;
              return (
                <tr key={id || index}>
                  <td>#{index + 1}</td>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        {/* <Link to={detailPath}>
                          <img src={images?.[0]} alt={name} />
                        </Link> */}
                      </figure>
                      <h3 className="product-title">
                        <Link to={detailPath}>{name || ""}</Link>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${formatCurrency(price) || 0}
                  </td>
                  <td className="stock-col text-center">
                    {stock > 0 ? (
                      <span className="in-stock">In stock</span>
                    ) : (
                      <span className="out-of-stock">Out of stock</span>
                    )}
                  </td>
                  <td className="action-col">
                    <Button
                      className="btn-block"
                      variant="outline"
                      onClick={(e) => _onAddToCart(e, item)}
                    >
                      <i className="icon-cart-plus" />
                      Add to Cart{" "}
                    </Button>
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) => onRemoveProduct(e, id)}
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
         
        </tbody>
      </table>
    </div>
  )
}

export default MyWishlist