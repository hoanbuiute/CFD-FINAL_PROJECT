import React from "react";

const Checkbox = ({ id, label, ...restProps }) => {
    // console.log('🚀...restProps---->', restProps);
  return (
    <div className="filter-item">
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id={id} {...restProps} />
        <label
          className="custom-control-label"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {/* <span className="item-count">{0}</span> */}
    </div>
  );
};

export default Checkbox;
