import React, { useEffect } from 'react'
import tokenMethod from '../../utils/token';
import { MODAL_TYPE } from '../../constants/general';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

const PrivateRoute  = ({ redirectPath = "/" }) => {
  return (
    <>
    <Outlet/>
  </>
  )
}

export default PrivateRoute 