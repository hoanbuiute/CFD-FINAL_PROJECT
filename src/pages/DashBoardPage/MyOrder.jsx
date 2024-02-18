import React from "react";
import styled from "styled-components";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";
import useQuery from "../../hooks/useQuery";
import { orderService } from "../../services/orderService";
import { Link } from "react-router-dom";
import ProductColor from "../../components/ProductColor";
import { formatCurrency } from "../../utils/format";
const ProductTitleWrapper = styled.div`
  .product-variant {
    display: flex;
    align-items: center;
    gap: 6px;

    .product-nav-dots {
      margin: 0;
    }

    p {
      margin-bottom: 0;
    }
  }
`;
const ORDER_LIMITS = 2;
const MyOrder = () => {
  const { data: ordersData, loading: ordersLoading } = useQuery(
    orderService.getOrders
  );
  const orders = ordersData?.orders || [];
  return (
    <div className="tab-pane fade active show">
      {!ordersLoading && orders?.length === 0 && (
        <>
          <p>No order has been made yet.</p>
          <Button link={PATHS.PRODUCTS} variant="outline">
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </>
      )}
      {/* <p>No order has been made yet.</p>
      <a href="category.html" className="btn btn-outline-primary-2">
        <span>GO SHOP</span>
        <i className="icon-long-arrow-right" />
      </a> */}
 {!ordersLoading &&
        orders?.length > 0 &&
        orders.map((order, index) => {
          const { id, product, quantity, totalProduct, variant } = order || {};
          return (
            <table key={id || index} className="table table-cart table-mobile">
              <thead>
                <tr style={{ fontWeight: 700 }}>#{index + 1}</tr>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {product?.map((item, index) => {
                  const { id, images, name, price, slug } = item || {};
                  const detailPath = PATHS.PRODUCTS + `/${slug}`;
                  // Image path
                  let imagePath = images?.[0];
                  if (imagePath?.split("https")?.length > 2) {
                    imagePath = imagePath.split("https");
                    imagePath = `https${imagePath[2]}`;
                  }
                  return (
                    <tr key={id + index}>
                      <td className="product-col">
                        <div className="product">
                          <figure className="product-media">
                            <Link to={detailPath}>
                              <img src={imagePath} alt={name} />
                            </Link>
                          </figure>
                          <ProductTitleWrapper>
                            <h3 className="product-title">
                              <Link to={detailPath}>{name || ""}</Link>
                            </h3>
                            <div className="product-variant">
                              <p>Color:</p>
                              <ProductColor colors={[variant[index]]} />
                            </div>
                          </ProductTitleWrapper>
                        </div>
                      </td>
                      <td className="price-col text-center">
                        ${formatCurrency(price) || 0}
                      </td>
                      <td className="quantity-col text-center">
                        {quantity[index]}{" "}
                      </td>
                      <td className="total-col text-center">
                        ${formatCurrency(totalProduct[index]) || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
    </div>
  );
};

export default MyOrder;
