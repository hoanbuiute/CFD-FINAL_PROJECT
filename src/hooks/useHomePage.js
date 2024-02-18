import { useState } from "react";
import useQuery from "../hooks/useQuery";

import { productService } from "../services/productsService";
import useMutation from "./useMutation";
import { subscribeService } from "../services/subscribeService";
import { message } from "antd";
import { pageService } from "../services/pageService";
const useHomePage = () => {
  ////////////////////CALL API///////////////////////////////////
  const { data: productsData,loading:productsLoading } = useQuery(productService.getProducts);

  const { data: categoriesData,loading:categoriLoading } = useQuery(productService.getCategories);
  ///Data Brand
  const { data: homePageData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );

  const { execute: dealExecute,
    data:dealData,
    error:dealError,
    loading:dealLoading} = useMutation(subscribeService.subscribeDeal)
    ////////////////////Motify DaTa//////////////////////////////////

    ////Function
    const handleSubscribeDeal  = (email,callback) =>{
      if(email) {
        dealExecute(email,{
          onSuccess: (data) => {
            message.success("Bạn đã gửi thành công");
            callback?.();
          },
          onFail: (error) => {
            message.error("Gửi không thành công");
          },
        })

      }
    }
  const featuredData = homePageData?.data?.category;

  ////Data ProDuct
  const products = productsData?.products;
  const featuredProducts =
    products?.filter((product) => product?.featured) || [];
  // Intro Section
  const introProducts = featuredProducts?.slice(0, 3);
  const introProps = {
    introProducts,
    featuredData,
  };
  //  Hot Product Section
  const onSaleProducts = products?.filter((product) => product?.onSale) || [];

  const topRatedProducts =
    products?.filter((product) => product?.topRated) || [];
  // Deal Section
  const dealProducts =
    onSaleProducts?.filter((product) => product?.discount > 0) || [];
  //Brand
  const brandData = homePageData?.data?.brands;
  //Featured Product
  const categories = categoriesData?.products || [];
  // console.log("categories",categories)
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  ////featureProduct nếy selectedCateSlug === all thì lấy tất cả sản phẩm cuea products còn k thì filter product những slug trong category === selectdcate trong categories
  const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );
  //Service
  const service = homePageData?.data?.information;

  // console.log("service",service)
  // console.log("featureProducts",featureProducts)
//////////////////PROPS//////////////////////////////////
  const hotProductsProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
    productsLoading
  };

  const dealProductsProps = {
    dealProducts,
    productsLoading
  };

  const brandsProps = {
    brandData,
  };

  const serviceProps = {
    service,
  };

    //GetDeal
    const getDealProps = {
      handleSubscribeDeal,

    };

  const featureProps = {
    categories: [{ name: "All", slug: "all" }, ...categories], //thêm object gồm name All và slug all
    featureProducts,
    selectedCateSlug,
    handleSelecCate: (slug) => setSelectedCateSlug(slug),
    productsLoading,
  };
  return {
    introProps,
    hotProductsProps,
    dealProductsProps,
    brandsProps,
    featureProps,
    serviceProps,
    getDealProps,
  };
};

export default useHomePage;
