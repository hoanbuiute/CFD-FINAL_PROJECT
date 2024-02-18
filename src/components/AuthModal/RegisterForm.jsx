import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import { regrexRule, requireRule } from "../../utils/validate";

import ComponentLoading from "../ComponentLoading";
import { message } from "antd";
import { useForm } from "react-hook-form";
import Input from "../Input";
import { MESSEAGE, REGREX } from "../../constants/validate";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../store/reducers/authReducer";
import useDebounce from "../../hooks/useDebounce";

const rules = {
  name: [requireRule("Vui lòng nhập tên")],
  email: [
    requireRule("Vui lòng nhập email"),
    regrexRule("email", "Vui lòng nhập đúng định dạng email"),
  ],
  password: [
    requireRule("Vui lòng nhập password"),
    regrexRule("password", "Vui lòng nhập đúng định dạng password"),
  ],
  confirmPassword: [
    requireRule("Vui lòng nhập xác nhận password"),
    // regrexRule("password", "Vui lòng nhập đúng định dạng password"),
    /////Function nhận vào giá trị valuePass và ValuesForm
    (valuePass, valuesForm) => {
      /////Nếu tồn tại  và value hiện tại khác value pass thì lỗi
      if (valuesForm.password && valuePass !== valuesForm.password) {
        return "Xác nhận password sai";
      } else return false;
    },
  ],
};

const RegisterForm = () => {
  // const { showModal, handleShowModal, handleCloseModal, handleRegister } =
  //   useAuthContext();
    // const [loading, setLoading] = useState(false); 
    const dispatch= useDispatch();
    const loading = useSelector((state)=>state.auth.loading.register);
    
    // const loadingRender = useDebounce(loading,300)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    console.log("data", data);
    if(data){
      // setLoading(true);
      // handleRegister?.(data, ()=>{
      //   setTimeout(() => {

      //     setLoading(false);
         
      //   }, 1000);
      // })
     try {
      dispatch(handleRegister(data))
     } catch (error) {
      // console.log(3)
     }
    }
  };
  return (
    <>
      <form action="#" onSubmit={handleSubmit(_onSubmit)}>
        {
          loading && <ComponentLoading/>
        }
        <Input
          required
          name="email"
          label=" Email "
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
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </button>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="register-policy"
              required
            />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <a href="privacy-policy.html">privacy policy</a> *
            </label>
          </div>
          {/* End .custom-checkbox */}
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
            <a href="#" className="btn btn-login  btn-f">
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
    </>
  );
};

export default RegisterForm;
