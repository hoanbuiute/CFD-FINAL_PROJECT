import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useAddress from '../../hooks/useAddress';
import { customerService } from '../../services/customerService';
import { handleGetProfile } from '../../store/reducers/authReducer';
import { Select, message } from 'antd';
import { UPDATE_PROFILE_MESSAGE } from '../../constants/message';
import { removeAccents } from '../../utils/format';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { MESSEAGE, REGREX } from '../../constants/validate';
import dayjs from 'dayjs';

const AccoutDetail = () => {
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    phone,
    birthday,
    street,
    province,
    district,
    ward,
  } = profile || {};
  const {
    register,
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

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
  
  useEffect(() => {
    if (!profile) return;
    reset({
      firstName,
      email,
      phone,
      birthday: birthday
        ? dayjs(birthday).format("YYYY/MM/DD").replaceAll("/", "-")
        : "",
      province,
      district,
      ward,
      street,
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);
    /* ------------------------------------ Handle events ------------------------------ */
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

    const _onSubmit = async (data) => {
      const payload = {
        ...data,
        lastName: lastName || "",
      };
      try {
        const res = await customerService.updateProfile(payload);
        console.log('res---->', res);
        if (res?.statusCode === 200) {
          
          dispatch(handleGetProfile());
          message.success(UPDATE_PROFILE_MESSAGE.success)
        }
      } catch (error) {
        message.error(
          error?.response?.data?.message || UPDATE_PROFILE_MESSAGE.failed
        );
      }
    };
    const filterOption = (input, option) => {
      removeAccents(option?.label ?? "")
        .toLowerCase()
        .includes(removeAccents(input).toLowerCase());
    };
  return (
<>
<div className="tab-pane fade show active" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link" >
<form
        action="#"
        className="account-form"
        onSubmit={handleSubmit(_onSubmit)}
      >
        <div className="row">
          {/* Full Name */}
          <div className="col-sm-6">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              required
              {...register("firstName", {
                required: MESSEAGE.required,
              })}
              error={errors?.firstName?.message || ""}
            />
          </div>
          {/* Email address */}
          <div className="col-sm-6">
            <Input
              label="Email address"
              placeholder="Enter your email address"
              disabled
              required
              {...register("email", {
                required: MESSEAGE.required,
              })}
              error={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          {/* Phone number */}
          <div className="col-sm-6">
            <Input
              label="Phone number"
              placeholder="Enter your phone number"
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
          {/* Date of birth */}
          <div className="col-sm-6">
            <Input
              type="date"
              label="Date of birth"
              required
              {...register("birthday", {
                required: MESSEAGE.required,
              })}
              error={errors?.birthday?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          {/* Province/City */}
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{
                required: MESSEAGE.required,
              }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="customSelect select-custom"
                      showSearch
                      placeholder="Select your province/city"
                      suffixIcon={<></>}
                      optionFilterProp="children"
                      value={provinceId}
                      options={provinces}
                      onChange={_onProvinceChange}
                      filterOption={filterOption}
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
                      className="customSelect select-custom"
                      showSearch
                      disabled={!provinceId}
                      placeholder="Select your district/town"
                      suffixIcon={<></>}
                      optionFilterProp="children"
                      value={districtId}
                      options={districts}
                      onChange={_onDistrictChange}
                      filterOption={filterOption}
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
                      className="customSelect select-custom"
                      showSearch
                      disabled={!districtId}
                      placeholder="Select your ward"
                      suffixIcon={<></>}
                      optionFilterProp="children"
                      value={wardId}
                      options={wards}
                      onChange={_onWardChange}
                      filterOption={filterOption}
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
        <Input
          label="Street Address"
          placeholder="Enter your street address"
          required
          {...register("street", {
            required: MESSEAGE.required,
          })}
          error={errors?.street?.message || ""}
        />
        <Button type="submit" variant="outline">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </Button>
      </form>
</div>
</>

 
  )
}

export default AccoutDetail