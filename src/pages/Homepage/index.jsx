import React, { useEffect } from "react";
import IntroSection from "./IntroSection";
import FeaturedSection from "./FeaturedSection";
import DealSection from "./DealSection";
import BrandList from "./BrandList";
import FearedProductsSection from "./FearedProductsSection";
import ServiceSection from "./ServiceSection";
import SocialShopSection from "./SocialShopSection";
import useHomePage from "../../hooks/useHomePage";
import FeaturedProductsSection from "./FearedProductsSection";





const Homepage = () => {
  const {
    introProps,
    hotProductsProps,
    dealProductsProps,
    brandsProps,
    featureProps,
    serviceProps,
    getDealProps,
  } = useHomePage();
  console.log("dealProductsProps",dealProductsProps)

console.log("introProps",introProps);
  return (
    <main className="main">
      <IntroSection {...introProps}/>
      <FeaturedSection {...hotProductsProps}  />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealProductsProps} />
      <BrandList {...brandsProps} />
      <FeaturedProductsSection {...featureProps}/>
      <ServiceSection {...serviceProps} />
      <SocialShopSection {...getDealProps} />
    </main>
  );
};

export default Homepage;
