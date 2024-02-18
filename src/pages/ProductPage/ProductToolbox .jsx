import React from 'react'
import Input from '../../components/Input';
import Select from '../../components/Select';
import { SORT_OPTIONS } from '../../constants/general';
import styled from 'styled-components';


const ToolboxRightWrapper = styled.div`
  .form-group {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ProductToolbox  = ({onSortChange,showNumb,totalNumb, activeSort}) => {

  
  // console.log('🚀showNumb---->', showNumb);
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
// console.log('DataOnchange🚀---->',e.target.value );
    // console.log('🚀1---->', 1);
  };
  return (
    <div className="toolbox">
    <div className="toolbox-left">
      <div className="toolbox-info">
        {" "}
        Showing <span>{showNumb} of {totalNumb}</span> Products{" "}
      </div>
    </div>
    <ToolboxRightWrapper className="toolbox-right" >
    <Input
  className="toolbox-sort"
  label="Sort by:"
  renderInput={
    (inputProps) =>{

      return (
        <Select
        defaultValue={SORT_OPTIONS.popularity.value}
        options={[
          SORT_OPTIONS.popularity,
          SORT_OPTIONS.pricelow,
          SORT_OPTIONS.pricehigh,
          SORT_OPTIONS.newest,
          SORT_OPTIONS.rating,
        ]}
        {...inputProps}
        value={activeSort}
        onChange={onSelectChange}
      />
      )
    }
  }
  />

    </ToolboxRightWrapper>
   
  </div>
  )
}

export default ProductToolbox;