import React, { useEffect, useMemo, useRef } from "react";
import useMutation from "./useMutation";
import { productService } from "../services/productsService";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { SORT_OPTIONS } from "../constants/general";
import useQuery from "./useQuery";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  
  ///////////////////////////---------xỬ LÍ PHẦN LISTPRODUCT--------------///////////////////
  const { search } = useLocation();
  // console.log("seach", search);
  const queryObject = queryString.parse(search);

  const queryObjectRef = useRef();
  useEffect(() => {
    if (queryObject) {
      queryObjectRef.current = queryObject;
    }
  }, [queryObject]);

  const {
    data: productsData,
    error: productError,
    loading: productsLoading,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );

  ////call API
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];
  /////

  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const productListProps = {
    isLoading: productsLoading,
    isError: !!productError,
    products,
  };
  ///////////////////////////---------xỬ LÍ PHẦN PAGINATION--------------///////////////////
  ///Dùng hook useSearchParams để setSeachParam
  const [param, setSearchParams] = useSearchParams();

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({

      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };
  /////Giữ những query object hiện tại chỉ thay đổi page
  const onPagiChange = (page) => {
    updateQueryString({
      ...queryObject,
      page: page,
    });
  };
  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

  //////////////////--------------------TOOLBOX-------------/////////////////////////////////////////
  //function set lại seach khi chọn option
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    // console.log('sortType🚀---->',sortType );
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi.total || 0,
    activeSort,
    onSortChange,
  };
  //////////////////--------------------FILTER CHANGE-------------/////////////////////////////////////////

  const handleCateFilterChange = (cateId, isChecked) => {
    ////CateID Là lúc click Checkbox
    // console.log('🚀cateId---->',cateId );
    // console.log('🚀isChecked---->', isChecked);
    ///// Array.isArray kiểm tra xem đối tượng có phải 1 mảng hay không? nếu là
    //////mảng thì lấy tất cả querryOnject.category bị select và gắn thêm catelory bị change vào
    let newCategoryQuery = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];
    // console.log('🚀newCategoryQuery---->', newCategoryQuery);
    ///Nếu là uncheck
    ///Lọc newCategoryQuery = newCategoryQuery cái nào khác với Cateid được mới vu
    if (!isChecked) {
      newCategoryQuery = newCategoryQuery.filter(
        (category) => category !== cateId
      );
    }

    ///Nếu không có thì cho về rỗngF
    if (!cateId) {
      newCategoryQuery = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };

  /////function Change Price

  // console.log('queryObjectRef---->',queryObjectRef );
  // console.log("🚀queryObject---->", queryObject);

  const priceFilterTimeout = useRef();

  // console.log('🚀queryObjectNew---->',queryObjectNew );
  const handlePriceFilterChange = (priceRange) => {
    ////Phải có 2 giá trị min và max
    if (priceRange?.length === 2) {
      if (priceFilterTimeout.current) {
        clearTimeout(priceFilterTimeout.current);
      }

      priceFilterTimeout.current = setTimeout(() => {
        // console.log('🚀queryObject---->',queryObject.current );
        updateQueryString({
          ...queryObject,
          ...queryObjectRef.current,
          // category: Array.isArray(queryObject.category)
          //   ? queryObject.category
          //   : [queryObject.category],
          // / priceRange[0] là phần tử thứ 1 .Cắt phần tử đầu $ đưa vô updateQueryString
          minPrice: priceRange[0].substring(1),
          maxPrice: priceRange[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };

  //Prop FILTER CHANGE
  const filterProps = {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 1500,
    ],
    handleCateFilterChange,
    handlePriceFilterChange,
  };

  return {
    productListProps,
    pagiProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
