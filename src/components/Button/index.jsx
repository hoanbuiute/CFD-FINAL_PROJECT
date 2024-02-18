import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  className = "",
  link,
  loading,
  disabled,
  children = "Button",
  ...restProps
}) => {
  let variantClass = "";
  switch (variant) {
    case "primary":
      variantClass = "btn btn-primary";
      break;
    case "outline":
      variantClass = "btn btn-outline-primary-2";
      break;
    case "outline-white":
      variantClass = "btn btn-outline-white";
      break;
    case "outline-dark":
      variantClass = "btn btn-outline-dark-2";
      break;
    default:
      break;
  }

// if(disabled){
//   variantClass = "btn btn--grey";
//   restProps.onClick = () =>{};
// }

if(!!link){
  return <Link to = {link} className={`${variantClass} ${className}  ` } 
 
  {...restProps}>{children}</Link>
}else

  return (
    <button className={`${variantClass} ${className}`} {...restProps}>
        {children}
      </button>
  );
};

export default Button;
