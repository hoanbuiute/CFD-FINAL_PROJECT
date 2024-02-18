import React, { createContext, useContext, useEffect, useState } from 'react'

const RadioContext = createContext();

const RadioGroup = ({
    disabled,
    className = "",
    defaultValue,
    children,
    onChange,
}) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    useEffect(() => {
        setSelectedValue(defaultValue);
      }, [defaultValue]);

      const _onCheckChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
        onChange?.(value);
      };
  return (
    <RadioContext.Provider
      value={{ disabled, selectedValue, _onCheckChange }}
      className={className}
    >
      {children}
    </RadioContext.Provider>
  )
  
}
const RadioItem = ({ disabled = false, children, value }) => {
    const { selectedValue, _onCheckChange } = useContext(RadioContext);
    return (
      <div className="custom-control custom-radio">
        <input
          className="custom-control-input"
          type="radio"
          id={value}
          name={value}
          value={value}
          disabled={disabled}
          checked={selectedValue === value}
          onChange={_onCheckChange}
        />
        <label
          className="custom-control-label"
          htmlFor={value}
          style={{ cursor: "pointer" }}
        >
          {children}
        </label>
      </div>
    );
  };
  
  RadioGroup.Item = RadioItem;

export default RadioGroup