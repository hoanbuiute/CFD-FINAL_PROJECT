import React, { useEffect } from "react";
import owlCarousels from "../../utils/owlCarousels";

const BrandList = ({ brandData }) => {
  useEffect(() => {
    owlCarousels();
  }, [brandData]);
  return (
    <>
      <div className="container">
        {brandData?.length > 0 && (
          <div
            className="owl-carousel mt-5 mb-5 owl-simple"
            data-toggle="owl"
            data-owl-options='{
                                      "nav": false, 
                                      "dots": false,
                                      "margin": 30,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":2
                                          },
                                          "420": {
                                              "items":3
                                          },
                                          "600": {
                                              "items":4
                                          },
                                          "900": {
                                              "items":5
                                          },
                                          "1024": {
                                              "items":6
                                          }
                                      }
                                  }'
          >
            {/* <a href="#" className="brand">
        <img src="assets/images/brands/1.png" alt="Brand Name" />
      </a>
      <a href="#" className="brand">
        <img src="assets/images/brands/2.png" alt="Brand Name" />
      </a>
      <a href="#" className="brand">
        <img src="assets/images/brands/3.png" alt="Brand Name" />
      </a>
      <a href="#" className="brand">
        <img src="assets/images/brands/4.png" alt="Brand Name" />
      </a>
      <a href="#" className="brand">
        <img src="assets/images/brands/5.png" alt="Brand Name" />
      </a>
      <a href="#" className="brand">
        <img src="assets/images/brands/6.png" alt="Brand Name" />
      </a> */}
            {brandData?.map((brand) => {
              return (
                <div href="#" className="brand">
                  <img src={brand || ""} alt="Brand Name" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
    </>
  );
};

export default BrandList;
