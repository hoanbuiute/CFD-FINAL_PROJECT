import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { MODAL_TYPE } from "../../constants/general";
import tokenMethod from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleShowModal } from "../../store/reducers/authReducer";

const HeaderTop = () => {
  // const {showModal, handleShowModal,handleLogout } = useAuthContext();
  const {profile,loading} = useSelector((state)=>state.auth)
  // console.log("profile",profile);
  const { firstName, email } = profile || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //function hiển thị modal
  const _onShowModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    ///Nhận vào pay load
    dispatch(handleShowModal(MODAL_TYPE.login));
    // console.log("1",1);

  };
  const logOut = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleLogout())
    navigate(PATHS.HOME);
  }

  // console.log('5555')

  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0969621355">
            <i className="icon-phone" /> Hotline: 0969621355{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod.get() ? (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  // data-toggle="modal"
                  className="top-menu-login"
                  onClick={_onShowModal}
                >
                  <i className="icon-user" />
                  Login | Resgister
                </a>
              </li>
            </ul>
          ) : (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user" />
                  {firstName || email || "Guest"}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_ORDER}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.PROFILE.PROFILE_WISHLIST}>
                          Wishlist <span>({profile?.whiteList?.length})</span>
                        </Link>
                      </li>
                      <li>
                        <a href="#" 
                         onClick={logOut}
                        >Sign Out</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
