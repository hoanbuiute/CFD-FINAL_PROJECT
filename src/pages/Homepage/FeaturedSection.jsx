import React, { useEffect, useState } from "react";

import owlCarousels from "../../utils/owlCarousels";
import { cn } from "../../utils/cn";
import ProductCard from "../../components/ProductCard";
import useDebounce from "../../hooks/useDebounce";
import { Empty, Skeleton } from "antd";

const TABS = {
  featured: "Featured",
  onSale: "On Sale",
  topRated: "Top Rated",
};

const FeaturedSection = ({
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
  productsLoading,
}) => {
  /////Giá trị mắc định là TABS.featured
  const [selectTab, setSelectTab] = useState(TABS.featured);
  const [loadingCarosel, setLoadingCarosel] = useState(false)
  const loading = useDebounce(productsLoading, 500);


  useEffect(() => {
    setTimeout(() => {
      owlCarousels();
    }, 500);
  }, [selectTab, featuredProducts, onSaleProducts, topRatedProducts]);
  ////Sự kiện click Change Tab
  const onChangeTab = (e, tab) => {
    e.preventDefault();
    setSelectTab("");
    setLoadingCarosel(true)
    setTimeout(() => {
      setSelectTab(tab);
      setLoadingCarosel(false)
    }, 300);
  };
  // console.log('🚀loadingCarosel---->', loadingCarosel);

  ////Hàm xử lí để render khi click tab
  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return featuredProducts;

      case TABS.onSale:
        return onSaleProducts;

      case TABS.topRated:
        return topRatedProducts;

      default:
        return [];
    }
  };

  // console.log("selectTab",selectTab)

  const renderProducts = _getSelectedProducts(selectTab);

  return (
    <>
      <div className="container featured" style={{ height: 550 }}>
        <ul
          className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectTab === TABS.featured,
              })}
              id="products-featured-link"
              onClick={(e) => onChangeTab(e, TABS.featured)}
            >
              Featured
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectTab === TABS.onSale,
              })}
              id="products-sale-link"
           
              onClick={(e) => onChangeTab(e, TABS.onSale)}
            >
              On Sale
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectTab === TABS.topRated,
              })}
              id="products-top-link"
             
              onClick={(e) => onChangeTab(e, TABS.topRated)}
            >
              Top Rated
            </a>
          </li>
        </ul>
        <div className="tab-content tab-content-carousel">
          <div
            // className="tab-pane p-0 fade show active"
            className={cn("tab-pane p-0 fade", {
              "show active": renderProducts?.length > 0,
            })}
            id="products-featured-tab"

          >
            {!loading && renderProducts?.length === 0 && (
              <Empty description="Không thấy khoá học nào" />
            )}
            {
              <div className="row">
                {loading && 
                  Array(4)
                    .fill("")
                    .map((_, index) => (
                      <div key={index} className="owl-item col-3">
                        <Skeleton
                          active
                          style={{
                            width: "276.668px",
                          }}
                        />
                        <br />
                        <Skeleton active />
                      </div>
                    ))}
              </div>
            }
   

            {  renderProducts?.length > 0 && (
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                                          "nav": true, 
                                          "dots": true,
                                          "margin": 20,
                                          "loop": false,
                                          "responsive": {
                                              "0": {
                                                  "items":2
                                              },
                                              "600": {
                                                  "items":2
                                              },
                                              "992": {
                                                  "items":3
                                              },
                                              "1200": {
                                                  "items":4
                                              }
                                          }
                                      }'
              >
     
                {renderProducts?.map((item) => {
                  // console.log("item",item)
                  return <ProductCard key={item.id} {...item} />;
                })}
              </div>
            )}
          </div>
          {/* <div
            className="tab-pane p-0 fade"
            id="products-sale-tab"
            role="tabpanel"
            aria-labelledby="products-sale-link"
          >
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                          "nav": true, 
                                          "dots": true,
                                          "margin": 20,
                                          "loop": false,
                                          "responsive": {
                                              "0": {
                                                  "items":2
                                              },
                                              "600": {
                                                  "items":2
                                              },
                                              "992": {
                                                  "items":3
                                              },
                                              "1200": {
                                                  "items":4
                                              }
                                          }
                                      }'
            >
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-4.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      Sony - Alpha a5100 Mirrorless Camera
                    </a>
                  </h3>
                  <div className="product-price"> $499.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "70%" }} />
                    </div>
                    <span className="ratings-text">( 11 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-1.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      GoPro - HERO7 Black HD Waterproof Action
                    </a>
                  </h3>
                  <div className="product-price"> $349.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "60%" }} />
                    </div>
                    <span className="ratings-text">( 2 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-3.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">Lenovo - 330-15IKBR 15.6"</a>
                  </h3>
                  <div className="product-price">
                    <span className="out-price">$339.99</span>
                    <span className="out-text">Out of Stock</span>
                  </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "60%" }} />
                    </div>
                    <span className="ratings-text">( 3 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <span className="product-label label-circle label-new">
                    New
                  </span>
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-2.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                    <img
                      src="assets/images/demos/demo-3/products/product-2-2.jpg"
                      alt="Product image"
                      className="product-image-hover"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      Apple - Apple Watch Series 3 with White Sport Band
                    </a>
                  </h3>
                  <div className="product-price"> $214.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "0%" }} />
                    </div>
                    <span className="ratings-text">( 0 Reviews )</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane p-0 fade"
            id="products-top-tab"
            role="tabpanel"
            aria-labelledby="products-top-link"
          >
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                          "nav": true, 
                                          "dots": true,
                                          "margin": 20,
                                          "loop": false,
                                          "responsive": {
                                              "0": {
                                                  "items":2
                                              },
                                              "600": {
                                                  "items":2
                                              },
                                              "992": {
                                                  "items":3
                                              },
                                              "1200": {
                                                  "items":4
                                              }
                                          }
                                      }'
            >
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-3.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">Lenovo - 330-15IKBR 15.6"</a>
                  </h3>
                  <div className="product-price">
                    <span className="out-price">$339.99</span>
                    <span className="out-text">Out of Stock</span>
                  </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "60%" }} />
                    </div>
                    <span className="ratings-text">( 3 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-1.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      GoPro - HERO7 Black HD Waterproof Action
                    </a>
                  </h3>
                  <div className="product-price"> $349.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "60%" }} />
                    </div>
                    <span className="ratings-text">( 2 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-4.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      Sony - Alpha a5100 Mirrorless Camera
                    </a>
                  </h3>
                  <div className="product-price"> $499.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "70%" }} />
                    </div>
                    <span className="ratings-text">( 11 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <span className="product-label label-circle label-new">
                    New
                  </span>
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-2.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                    <img
                      src="assets/images/demos/demo-3/products/product-2-2.jpg"
                      alt="Product image"
                      className="product-image-hover"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      Apple - Apple Watch Series 3 with White Sport Band
                    </a>
                  </h3>
                  <div className="product-price"> $214.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "0%" }} />
                    </div>
                    <span className="ratings-text">( 0 Reviews )</span>
                  </div>
                </div>
              </div>
              <div className="product product-2">
                <figure className="product-media">
                  <a href="product-detail.html">
                    <img
                      src="assets/images/demos/demo-3/products/product-1.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
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
                    >
                      <span>add to cart</span>
                    </a>
                  </div>
                </figure>
                <div className="product-body">
                  <h3 className="product-title">
                    <a href="product-detail.html">
                      GoPro - HERO7 Black HD Waterproof Action
                    </a>
                  </h3>
                  <div className="product-price"> $349.99 </div>
                  <div className="ratings-container">
                    <div className="ratings">
                      <div className="ratings-val" style={{ width: "60%" }} />
                    </div>
                    <span className="ratings-text">( 2 Reviews )</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FeaturedSection;
