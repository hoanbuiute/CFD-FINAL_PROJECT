import classNames from 'classnames'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const ProductColor = ({color,defaultColor,onChange},ref) => {
// console.log('🚀onChange---->',onChange );

  const [selectedColor, setSelectedColor] = useState(defaultColor)

useImperativeHandle(
ref,()=>{
  return {
    value : selectedColor,
    reset: ()=>{
      setSelectedColor(defaultColor);
    }
  }
}
)
const onChangeColor = (e,color)=>{
  e.preventDefault;
  e.stopPropagation;
  setSelectedColor(color)
  onChange?.(color)

}
  return (
    <div className="product-nav product-nav-dots">
      {
        !!color?.length && color.map( (color,index) =>
          <div
          key={index}
          onClick={(e)=>onChangeColor(e,color)}
          // className="product-nav-item active"
          className={classNames("product-nav-item ", {active: selectedColor === color})}
          style={{ background: `${color}` }}
        >
          <span className="sr-only">Color name</span>
        </div>
        )
      }
    {/* <div
      className="product-nav-item active"
      style={{ background: "#e2e2e2" }}
    >
      <span className="sr-only">Color name</span>
    </div>
    <div
      className="product-nav-item"
      style={{ background: "#333333" }}
    >
      <span className="sr-only">Color name</span>
    </div>
    <div
      className="product-nav-item"
      style={{ background: "#f2bc9e" }}
    >
      <span className="sr-only">Color name</span>
    </div> */}
  </div>
  )
}

export default forwardRef(ProductColor) ;