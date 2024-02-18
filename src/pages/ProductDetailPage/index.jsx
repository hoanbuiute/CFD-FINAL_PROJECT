import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import ProductDetailTop from "./ProductDetailTop";
import ProductDetailTab from "./ProductDetailTab";
import useProductDetail from "../../hooks/useProductDetail";

const ProductDetailPage = () => {
  const {ProductsDetailTopProps,productName,productDetailTabProps} = useProductDetail();
// console.log('🚀ProductsDetailProps---->',ProductsDetailTopProps );
// console.log('🚀dataProductDetail---->', dataProductDetail);

// console.log('🚀ProductsDetailTopProps---->',ProductsDetailTopProps );
// console.log('🚀---->ProductsDetailTopProps', ProductsDetailTopProps);
// console.log('🚀review---->', review);
  return (
    <main className="main">
      <Breadcrumb className={`mb-2`}>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{productName || ""}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...ProductsDetailTopProps}/>
          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
