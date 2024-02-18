import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import Button from "../Button";
import { regrexRule, requireRule } from "../../utils/validate";
import ComponentLoading from "../ComponentLoading";
import { message } from "antd";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { MESSEAGE, REGREX } from "../../constants/validate";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../store/reducers/authReducer";
import useSelection from "antd/es/table/hooks/useSelection";
import useDebounce from "../../hooks/useDebounce";

const LoginForm = () => {
  // const [loading, setLoading] = useState(false)
  const loading = useSelector((state) => state.auth.loading.login);
  console.log("🚀loading---->", loading);
  // const loadingLogin =loading?.login
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const {handleLogin} = useAuthContext();
  // console.log('🚀loadingformLoading---->', loading);
  const dispatch = useDispatch();
  const _onSubmit = async (data) => {
    if (data) {
      // setLoading(true);
      // handleLogin?.(data, () => {
      // 	setTimeout(() => {
      // 		setLoading(false);
      // 	}, 300);
      // });
      try {
        const res = await dispatch(handleLogin(data)).unwrap();
        // console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  // const loadingFormLoginX = auth.loading.login
  const loadingFormLoginRender = useDebounce(loading, 3000);
  console.log("🚀useDebounceLoading---->", loadingFormLoginRender);

  return (
    <>
      <form onSubmit={handleSubmit(_onSubmit)} action="#">
        {loading && <ComponentLoading />}
        <Input
          name="email"
          label=" Email "
          required
          placeholder="Email"
          {...register("email", {
            required: MESSEAGE.requiredEmail,
            pattern: {
              value: REGREX.email,
              message: MESSEAGE.email,
            },
          })}
          error={errors?.email?.message || ""}
        />
        {/* End .form-group */}
        <Input
          name="password"
          label="password"
          required
          type="password"
          // onChange={_onChange}
          placeholder="password"
          {...register("password", {
            required: MESSEAGE.requiredPassword,
          })}
          error={errors?.password?.message || ""}
        />
        {/* End .form-group */}
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="signin-remember"
            />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div>
          {/* End .custom-checkbox */}
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>

        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
    </>
    // <div
    //   className="tab-pane fade show active"
    //   id="signin"
    //   role="tabpanel"
    //   aria-labelledby="signin-tab"
    // >

    //   {/* End .form-choice */}
    // </div>
  );
};

export default LoginForm;
