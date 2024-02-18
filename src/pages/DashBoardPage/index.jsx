import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import AccoutDetail from "./AccoutDetail";
import MyOrder from "./MyOrder";
import MyAdresses from "./MyAdresses";
import MyWishlist from "./MyWishlist";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/reducers/cartReducer";
import { handleLogout } from "../../store/reducers/authReducer";

const DashBoardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onLogout = () => {
    
    dispatch(handleLogout());
    dispatch(clearCart());
    navigate(PATHS.HOME);
  };
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Account
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul
                  className="nav nav-dashboard flex-column mb-3 mb-md-0"
                  role="tablist"
                >
                  <li className="nav-item ">
                    <NavLink end className="nav-link " to={PATHS.PROFILE.INDEX}>
                      Account Details
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={PATHS.PROFILE.PROFILE_ORDER}
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-address-link"
                      to={PATHS.PROFILE.PROFILE_ADDRESS}
                    >
                      Adresses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      id="tab-wishlist-link"
                      to={PATHS.PROFILE.PROFILE_WISHLIST}
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={PATHS.PROFILE.CHANGE_PASSWORD}
                      className="nav-link"
                      href="#"
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"  onClick={_onLogout}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  {/* <AccoutDetail/> */}
                  <Outlet/>
                  {/* <AccoutDetail />
                  <MyOrder />
                  <MyAdresses />
                  <MyWishlist /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardPage;
