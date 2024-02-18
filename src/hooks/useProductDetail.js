import useMutation from "./useMutation";
import { useParams } from "react-router-dom";
import { productService } from "../services/productsService";
import useQuery from "./useQuery";
import { useRef } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handdleAddCart } from "../store/reducers/cartReducer";
import { handleAddWishList } from "../store/reducers/authReducer";

const useProductDetail = () => {
  const params = useParams();
  const { slug } = params;
  const quatityRef = useRef();
  const colorRef = useRef();
  const dispatch = useDispatch();
  // console.log('🚀slug---->', slug);
  // const { data: productsData,loading:productsLoading } = useQuery(productService.getProducts);
  const {
    data: dataProductDetail,
    error: errorProductDetail,
    loading: loadingProductDetail,
  } = useQuery(() => productService?.getProductDetail(slug), []);

  // const product = dataProductDetail
  // console.log('🚀dataProductDetailproduct---->', dataProductDetail);
  const { color, id, name, description, shippingReturn ,price,discount} = dataProductDetail;
  // console.log('🚀discount---->',discount );
  // console.log('discount---->',id );

  const { data: dataProductReiew } = useQuery(
    () => productService.getProductReview(id),
    [id]
  );

  // console.log('🚀dataProductReiew---->',dataProductReiew );
  // console.log('🚀colorRef---->', colorRef);

  const handleAddToCart = async () => {
    const { value: color, reset: colorReset } = colorRef.current || {};
    const { value: quatity, reset: quatityReset } = quatityRef.current || {};

    if (!color) {
      message.error("Bạn vui lòng chọn màu");
      return;
    } else if (isNaN(quatity) && quatity < 1) {
      message.error("Số lượng này không phù hợp ");
      return;
    }

    // const {adddedId, addedColor, addedQuatity, addedPrice} = activePayload;
    // console.log('🚀color---->',discount );
    const addPayload = {
      addedId: id,
      addedColor: color,
      addedQuatity: quatity,
      addedPrice: price - discount,
    };

    try {
      const res = dispatch(handdleAddCart(addPayload)).unwrap();
      if (res) {
        colorReset?.();
        quatityReset?.();
      }
    } catch (error) {
      console.log("🚀error---->", error);
    }
  };

  const handleAddToWishlist = () => {
    dispatch(handleAddWishList(id));
  };
  const ProductsDetailTopProps = {
    ...dataProductDetail,
    handleAddToWishlist,
    handleAddToCart,
    review: dataProductReiew,
    colorRef,
    quatityRef,
  };

  const productDetailTabProps = {
    description,
    shippingReturn,
    review: dataProductReiew,
  };
  return {
    ProductsDetailTopProps,
    productName: name,
    productDetailTabProps,
  };
};

export default useProductDetail;
