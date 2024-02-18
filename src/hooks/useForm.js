import React, { useState } from "react";
import validate from "../utils/validate";

const useForm = (initialValue, rules) => {
  const [form, setForm] = useState(initialValue);
  const [error, setError] = useState({});

  const _validate = () => {
    const errorObject = validate(rules, form);
    setError(errorObject);
    return errorObject;
  };
  const register = (registerFied) => {
    return {
      name: registerFied,
      value: form[registerFied],
      error: error[registerFied],
      onChange: (e) => {
        setForm({ ...form, [registerFied]: e.target.value });
      },
    };
  };
  return {
    form,
    error,
    register,
    // setError,
    validate: _validate,
    setForm,
  };
};

export default useForm;
