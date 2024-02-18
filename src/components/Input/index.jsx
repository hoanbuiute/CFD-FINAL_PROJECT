import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = ({ label, required, error, renderInput,name, ...restProps },ref) => {
  return (
    <div className="form-group">
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({...restProps, error,ref:ref }) || (
        <input
         ref={ref}
          {...restProps}
          name={name}
          id={name}
          // className={`form-control ${error ? "input-error" : ""}`}
          className={cn("form-control",{"input-error": !!error} )}
        />
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default  forwardRef(Input) ;
