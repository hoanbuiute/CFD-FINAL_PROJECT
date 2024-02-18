import Homepage from "./pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import PATHS from "./constants/paths";
import AboutPage from "./pages/AboutPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import CheckOutSuccessPage from "./pages/CheckOutSuccessPage";
import ContactPage from "./pages/ContactPage";
import DashBoardPage from "./pages/DashBoardPage";
import FaqPage from "./pages/FaqPage";
import PayMentMethodPage from "./pages/PaymentMethodPage";
import PrivatePolicyPage from "./pages/PrivatePolicyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ShippingPage from "./pages/ShippingPage";
import PrivateRoute from "./components/PrivateRoute";
import MyOrder from "./pages/DashBoardPage/MyOrder";
import MyAdresses from "./pages/DashBoardPage/MyAdresses";
import MyWishlist from "./pages/DashBoardPage/MyWishlist";
import AccoutDetail from "./pages/DashBoardPage/AccoutDetail";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "./store/reducers/authReducer";
import { handdleGetCart } from "./store/reducers/cartReducer";
import { useEffect } from "react";
import tokenMethod from "./utils/token";
import ChangePassword from "./pages/DashBoardPage/ChangePassword";
import ReturnPage from "./pages/ReturnPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
      dispatch(handdleGetCart());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG} element={<BlogSinglePage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            {/* <Route path={PATHS.DASHBOARD} element={<DashBoardPage />} /> */}
            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.CHECKOUT} element={<CheckOutPage />} />
              <Route
                path={PATHS.CHECKOUT_SUCCESS}
                element={<CheckOutSuccessPage />}
              />
              <Route path={PATHS.PROFILE.INDEX} element={<DashBoardPage />}>
                <Route index element={<AccoutDetail />} />
                <Route
                  path={PATHS.PROFILE.PROFILE_ORDER}
                  element={<MyOrder />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_ADDRESS}
                  element={<MyAdresses />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_WISHLIST}
                  element={<MyWishlist />}
                />
                <Route
                  path={PATHS.PROFILE.CHANGE_PASSWORD}
                  element={<ChangePassword />}
                />
              </Route>
            </Route>
            <Route path={PATHS.FAQ} element={<FaqPage />} />
            <Route
              path={PATHS.PAYMENT_MENTHOD}
              element={<PayMentMethodPage />}
            />
            <Route
              path={PATHS.PRIVATE_POLICY}
              element={<PrivatePolicyPage />}
            />
            <Route
              path={PATHS.PRODUCTS_DETAIL}
              element={<ProductDetailPage />}
            />
            <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
            <Route path={PATHS.RETURN} element={<ReturnPage />} />
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />
            <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
