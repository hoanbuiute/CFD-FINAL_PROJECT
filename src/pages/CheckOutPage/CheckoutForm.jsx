import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useAddress from '../../hooks/useAddress';
import { PAYMENT_METHOD, SHIPPING_OPTIONS } from '../../constants/general';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import Input from '../../components/Input';
import { MESSEAGE, REGREX } from '../../constants/validate';
import { formatCurrency } from '../../utils/format';
import { cn } from '../../utils/cn';
import { Select, message } from 'antd';
const FormContainer = styled.form`
  .form-group {
    margin: 0;

    .form-error {
      line-height: normal;
    }
  }

  .customSelect {
    padding: 0;
    border-radius: 6px;
    &:hover,
    &:focus {
      .ant-select-selector {
        border-color: #fcb941 !important;
        box-shadow: unset !important;
        outline: unset !important;
      }
    }
  }
`;
const CheckoutForm = ({handleCheckout }) => {
    const { profile } = useSelector((state) => state.auth);
    const { cartInfo } = useSelector((state) => state.cart);
    const {
        product,
        totalProduct,
        subTotal,
        total,
        quantity,
        variant,
        shipping,
        discount,
        discountCode,
      } = cartInfo || {};
      const renderProductInfo = product?.map((item, index) => {
        return {
          ...item,
          variant: variant?.[index],
          quantity: quantity?.[index],
          totalProduct: totalProduct?.[index],
        };
      });
      const { firstName, phone, email, province, district, ward, street } =
        profile || {};
    
      const {
        provinceId,
        districtId,
        wardId,
        provinces,
        districts,
        wards,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
      } = useAddress();
    
      const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        formState: { errors },
      } = useForm({
        defaultValues: {
          fullName: firstName,
          phone,
          email,
          province,
          district,
          ward,
          street,
        },
      });

      useEffect(() => {
        if (!profile) return;
        reset({
          fullName: firstName,
          phone,
          email,
          province,
          district,
          ward,
          street,
        });
        handleProvinceChange?.(province);
        handleDistrictChange?.(district);
        handleWardChange?.(ward);
      }, [profile]);

      const [currentPayment, setCurrentPayment] = useState();
      const isCash = PAYMENT_METHOD.cash === currentPayment;
      const isCard = PAYMENT_METHOD.card === currentPayment;

       // Events handler
  const _onSubmit = (data) => {
    if (!shipping?.typeShip) {
      message.error("Please select shipping");
      return;
    }

    if (!currentPayment) {
      message.error("Please select payment method");
      return;
    }

    const formInfo = {
      ...data,
      province: provinces?.find((province) => province.value === provinceId),
      district: districts?.find((district) => district.value === districtId),
      ward: wards?.find((ward) => ward.value === wardId),
      paymentMethod: currentPayment,
    };

    handleCheckout?.({
      formInfo,
      cartInfo,
    });
  };

  const _onProvinceChange = (changedId) => {
    handleProvinceChange?.(changedId);
    reset({
      ...getValues(),
      province: changedId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changedId) => {
    handleDistrictChange?.(changedId);
    reset({
      ...getValues(),
      district: changedId,
      ward: undefined,
    });
  };

  const _onWardChange = (changedId) => {
    handleWardChange?.(changedId);
    reset({
      ...getValues(),
      ward: changedId,
    });
  };
  return (
    <FormContainer
    action="#"
    className="checkout-form"
    onSubmit={handleSubmit(_onSubmit)}
  >
    <div className="row">
      {/* Billing details */}
      <div className="col-lg-9">
        <h2 className="checkout-title">Billing Details</h2>
        <div className="row">
          <div className="col-sm-4">
            {/* Fullname */}
            <Input
              label="Full Name"
              placeholder="Full Name"
              required
              {...register("fullName", {
                required: MESSEAGE.required,
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-4">
            {/* Phone */}
            <Input
              label="Phone number"
              placeholder="Phone number"
              required
              {...register("phone", {
                required: MESSEAGE.required,
                pattern: {
                  value: REGREX.phone,
                  message: MESSEAGE.phone,
                },
              })}
              error={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-4">
            {/* Email */}
            <Input
              label="Email address"
              placeholder="Email address"
              required
              disabled
              {...register("email", {
                required: MESSEAGE.required,
                pattern: {
                  value: REGREX.email,
                  message: MESSEAGE.email,
                },
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          {/* Province/City */}
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              control={control}
              name="province"
              rules={{
                required: MESSEAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control customSelect"
                      showSearch
                      suffixIcon={<></>}
                      optionFilterProp="children"
                      placeholder="Please select Province/City"
                      options={provinces}
                      value={provinceId}
                      onChange={_onProvinceChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              rules={{
                required: MESSEAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control customSelect"
                      disabled={!!!provinceId}
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select District/Town"
                      optionFilterProp="children"
                      options={districts}
                      value={districtId}
                      onChange={_onDistrictChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label || "")
                          .toLowerCase()
                          .includes(removeAccents(input).toLowerCase())
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.district?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{
                required: MESSEAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control customSelect"
                      disabled={!!!districtId}
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Ward"
                      optionFilterProp="children"
                      options={wards}
                      value={wardId}
                      onChange={_onWardChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label || "")
                          .toLowerCase()
                          .includes(removeAccents(input).toLowerCase())
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.ward?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>

        {/* Street */}
        <Input
          label="Street address"
          required
          placeholder="House number and Street name"
          {...register("street", {
            required: MESSEAGE.required,
          })}
          error={errors?.street?.message || ""}
        />

        {/* Order Notes */}
        <Input
          label="Order notes (optional)"
          renderInput={({ inputProps }) => {
            return (
              <textarea
                placeholder="Note about your order, e.g. special notes for delivery"
                className="form-control"
                cols={30}
                rows={4}
                {...register("note")}
                {...inputProps}
                style={{ resize: "none" }}
              />
            );
          }}
        />
      </div>

      {/* Your order */}
      <aside className="col-lg-3">
        <div className="summary">
          <h3 className="summary-title">Your Order</h3>
          <table className="table table-summary">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {renderProductInfo?.map((item, index) => {
                const { id, name, price, slug, quantity, totalProduct } =
                  item || {};
                return (
                  <tr key={id + index}>
                    <td>
                      <Link to={PATHS.PRODUCTS + `${slug}`}>
                        {name || ""}
                      </Link>
                      <p>
                        {quantity || 0} x $
                        {formatCurrency(price) || 0}
                      </p>
                    </td>
                    <td>${formatCurrency(totalProduct) || 0}</td>
                  </tr>
                );
              })}

              <tr className="summary-subtotal">
                <td>Subtotal:</td>
                <td>${formatCurrency(subTotal) || 0}</td>
              </tr>
              {shipping?.typeShip ? (
                <tr>
                  <td>Shipping:</td>
                  <td>{shipping.typeShip}</td>
                </tr>
              ) : (
                <tr>
                  <td>Shipping</td>
                  <td>
                    <Link to={PATHS.SHOPPING_CART}>Select shipping</Link>
                  </td>
                </tr>
              )}
              {!!discount && (
                <tr>
                  <td>Discount:</td>
                  <td>
                    {discountCode} - ${formatCurrency(discount) || 0}
                  </td>
                </tr>
              )}
              <tr className="summary-total">
                <td>Total:</td>
                <td>${formatCurrency(total) || 0}</td>
              </tr>
            </tbody>
          </table>
          <div className="accordion-summary" id="accordion-payment">
            <div className="card">
              <div
                className="card-header"
                id="heading-1"
                onClick={() => setCurrentPayment(PAYMENT_METHOD.card)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="card-title">
                  <a
                    role="button"
                    className={cn({
                      collapsed: !isCard,
                    })}
                  >
                    {" "}
                    Direct bank transfer{" "}
                  </a>
                </h2>
              </div>
              <div
                id="collapse-1"
                className={cn("collapse", {
                  show: isCard,
                })}
              >
                <div className="card-body">
                  {" "}
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not
                  be shipped until the funds have cleared in our account.{" "}
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                id="heading-3"
                onClick={() => setCurrentPayment(PAYMENT_METHOD.cash)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="card-title">
                  <a
                    className={cn({
                      collapsed: !isCash,
                    })}
                    role="button"
                  >
                    {" "}
                    Cash on delivery{" "}
                  </a>
                </h2>
              </div>
              <div
                id="collapse-3"
                className={cn("collapse", {
                  show: isCash,
                })}
              >
                <div className="card-body">
                  Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                  consectetuer adipiscing elit. Donec odio. Quisque volutpat
                  mattis eros.{" "}
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="btn-order btn-block"
            variant="outline"
          >
            <span className="btn-text">Place Order</span>
            <span className="btn-hover-text">Proceed to Checkout</span>
          </Button>
        </div>
      </aside>
    </div>
  </FormContainer>
  )
}

export default CheckoutForm