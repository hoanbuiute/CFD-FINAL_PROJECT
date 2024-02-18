import React, { useState } from "react";
import { cn } from "../../utils/cn";
import { formatDate, formatNumber } from "../../utils/format";

const TABS = {
  desc: "Description",
  shipping: "shipping&returns",
  review: "review",
};
const ProductDetailTab = ({ description, shippingReturn, review }) => {
  const [selectTab, setSelectTab] = useState(TABS.desc);

  const onChangeTab = (e, tab) => {
    e.preventDefault();
    e.stop;
    setSelectTab(tab);
  };
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectTab === TABS.desc,
            })}
            id="product-desc-link"
            data-toggle="tab"
            href="#product-desc-tab"
            role="tab"
            aria-controls="product-desc-tab"
            aria-selected="true"
            onClick={(e) => onChangeTab(e, TABS.desc)}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectTab === TABS.shipping,
            })}
            id="product-shipping-link"
            data-toggle="tab"
            href="#product-shipping-tab"
            role="tab"
            aria-controls="product-shipping-tab"
            aria-selected="false"
            onClick={(e) => onChangeTab(e, TABS.shipping)}
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectTab === TABS.review,
            })}
            id="product-review-link"
            data-toggle="tab"
            href="#product-review-tab"
            role="tab"
            aria-controls="product-review-tab"
            aria-selected="false"
            onClick={(e) => onChangeTab(e, TABS.review)}
          >
            Reviews ({review.length})
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectTab === TABS.desc && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div
              className="product-desc-content"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </div>
        )}
        {selectTab === TABS.shipping && (
          <div
            className="tab-pane fade show active"
            id="product-shipping-tab"
            role="tabpanel"
            aria-labelledby="product-shipping-link"
          >
            <div
              className="product-desc-content "
              dangerouslySetInnerHTML={{
                __html: shippingReturn,
              }}
            />
            {/* <h3>Delivery &amp; returns</h3>
            <p>
              We deliver to over 100 countries around the world. For full
              details of the delivery options we offer, please view our{" "}
              <a href="#">Delivery information</a>
              <br /> We hope you’ll love every purchase, but if you ever
              need to return an item you can do so within a month of
              receipt. For full details of how to make a return, please
              view our <a href="#">Returns information</a>
            </p> */}
            {/* </div> */}
          </div>
        )}
        {selectTab === TABS.review && (
          <div
            className="tab-pane fade show active"
            id="product-review-tab"
            role="tabpanel"
            aria-labelledby="product-review-link"
          >
            <div className="reviews">
              <h3>
                {review.length
                  ? ` (review (${review.length})) `
                  : "Không có review nào"}
              </h3>
              {review.map((review) => {
                const {
                  id,
                  rate,
                  order,
                  title,
                  description: reviewDesc,
                  createdAt,
                  updatedAt,
                } = review || {};
                return (
                  <div className="review">
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">Samanta J.</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{
                                width: `${(formatNumber(rate) || 0) * 20}%`,
                              }}
                            />
                          </div>
                        </div>
                        <span className="review-date">
                          {formatDate(updatedAt)}
                        </span>
                      </div>
                      <div className="col">
                        <h4>{title}</h4>
                        <div className="review-content">
                          <p>{reviewDesc}</p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="review">
            <div className="row no-gutters">
              <div className="col-auto">
                <h4>
                  <a href="#">Samanta J.</a>
                </h4>
                <div className="ratings-container">
                  <div className="ratings">
                    <div
                      className="ratings-val"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <span className="review-date">6 days ago</span>
              </div>
              <div className="col">
                <h4>Good, perfect size</h4>
                <div className="review-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Ducimus cum dolores assumenda asperiores
                    facilis porro reprehenderit animi culpa atque
                    blanditiis commodi perspiciatis doloremque,
                    possimus, explicabo, autem fugit beatae quae
                    voluptas!
                  </p>
                </div>
                <div className="review-action">
                  <a href="#">
                    <i className="icon-thumbs-up" />
                    Helpful (2){" "}
                  </a>
                  <a href="#">
                    <i className="icon-thumbs-down" />
                    Unhelpful (0){" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="review">
            <div className="row no-gutters">
              <div className="col-auto">
                <h4>
                  <a href="#">John Doe</a>
                </h4>
                <div className="ratings-container">
                  <div className="ratings">
                    <div
                      className="ratings-val"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <span className="review-date">5 days ago</span>
              </div>
              <div className="col">
                <h4>Very good</h4>
                <div className="review-content">
                  <p>
                    Sed, molestias, tempore? Ex dolor esse iure hic
                    veniam laborum blanditiis laudantium iste amet. Cum
                    non voluptate eos enim, ab cumque nam, modi, quas
                    iure illum repellendus, blanditiis perspiciatis
                    beatae!
                  </p>
                </div>
                <div className="review-action">
                  <a href="#">
                    <i className="icon-thumbs-up" />
                    Helpful (0){" "}
                  </a>
                  <a href="#">
                    <i className="icon-thumbs-down" />
                    Unhelpful (0){" "}
                  </a>
                </div>
              </div>
            </div>
          </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTab;
