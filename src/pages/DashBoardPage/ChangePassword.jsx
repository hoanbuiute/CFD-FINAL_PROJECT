import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { customerService } from '../../services/customerService';
import Button from '../../components/Button';
import { MESSEAGE } from '../../constants/validate';
import { message } from 'antd';
import Input from '../../components/Input';

const ChangePassword = () => {
    const { profile } = useSelector((state) => state.auth);
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
  
    const password = useRef({});
    const newPassword = useRef({});
  
    password.current = watch("password", "");
    newPassword.current = watch("newPassword", "");
  
    // Submit form
    const onSubmit = async (data) => {
      try {
        const res = await customerService.updateProfile({ ...profile, ...data });
        if (res.statusCode === 200) {
          message.success("Change password successfully");
        }
      } catch (error) {
        message.error(error?.response?.data?.message);
      }
    };
  return (
    <div className="tab-pane fade show active">
    <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Current password (leave blank to leave unchanged)"
        placeholder="Enter your current password"
        defaultValue={null}
        type="password"
        {...register("password", {
          required: MESSEAGE.required,
        })}
        error={errors?.password?.message || ""}
      />

      {/* New Password */}
      <Input
        label="New password (leave blank to leave unchanged)"
        placeholder="Enter new password"
        type="password"
        {...register("newPassword", {
          required: MESSEAGE.required,
          validate: (value) =>
            value !== password.current ||
            "Must not be the same as the old password",
        })}
        error={errors?.newPassword?.message || ""}
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        placeholder="Confirm your new password"
        type="password"
        {...register("confirmPassword", {
          required: MESSEAGE.required,
          validate: (value) =>
            value === newPassword.current ||
            "Confirm password does not match",
        })}
        error={errors?.confirmPassword?.message || ""}
      />
      <Button type="submit" variant="outline">
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right" />
      </Button>
    </form>
  </div>
  )
}

export default ChangePassword;