import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(256, 256, 256, 0.5);
  z-index: 900;
  opacity: 1;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const PageLoading = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default PageLoading;
