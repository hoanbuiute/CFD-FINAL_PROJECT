import React, { useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styled from "styled-components";
import { cn } from "../../utils/cn";
import { MODAL_TYPE } from "../../constants/general";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal, handleShowModal } from "../../store/reducers/authReducer";

// const AuthenModalContainer = styled.div`
//   display: ${(props)=>(props?.isShow ? "block" :"none")};
// `

const AuthModal = () => {
  ///ShowModal là state chưa login và register
  // const {  handleCloseModal, handleShowModal,showModal } = useAuthContext();
  const dispatch = useDispatch();
  const {showModal} = useSelector((state)=>state.auth);
  const _onclickRegister = (e) => {
    e.stopPropagation();
    // handleShowModal("register");
    dispatch(handleShowModal(MODAL_TYPE.register))
  
  };
  const _onclickLogin = (e) => {
    e?.stopPropagation();
    dispatch(handleShowModal(MODAL_TYPE.login))
  };

  const closeModal = (e) =>{
    e.stopPropagation();
    dispatch(handleCloseModal())
  }
  
  return (
    <>
      <div
        // className="modal fade"
        className={cn("modal", { "fade show": !!showModal })}
        style={{ display: !!showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showModal === MODAL_TYPE.login,
                        })}
                        id="signin-tab"
                        data-toggle="tab"
                        href="#signin"
                        role="tab"
                        aria-controls="signin"
                        aria-selected="true"
                        onClick={_onclickLogin}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showModal === MODAL_TYPE.register,
                        })}
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                        onClick={_onclickRegister}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div className="tab-pane fade show active">
                      {showModal === MODAL_TYPE.login && <LoginForm />}
                      {showModal === MODAL_TYPE.register && <RegisterForm />}
                    </div>

                    {/* .End .tab-pane */}

                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
        {!!showModal && (
          <div
            className="modal-backdrop fade show"
            onClick={closeModal}
            style={{ zIndex: -1 }}
          ></div>
        )}
      </div>
      {/* <div
        onClick={handleCloseModal}
        className={cn("", { "modal-backdrop fade show": !!showModal })}
      ></div> */}
    </>
  );
};

export default AuthModal;
