import React from "react";

import ProductToolbox from "./ProductToolbox ";

import Pagination from "./Pagination";
import ProductFilter from "./ProductFilter";
import Breadcrumb from "../../components/Breadcrumb";
import ProductList from "./productList";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import useProductPage from "../../hooks/useProductPage";

const ProductPage = () => {
  const {productListProps,pagiProps,toolboxProps,filterProps} =useProductPage();
  // console.log('🚀productListProps---->', productListProps);
  
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <Breadcrumb className={`mb-2`}>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps}/>
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
