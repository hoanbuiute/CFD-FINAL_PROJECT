import React from 'react'
import { useMainContext } from '../Context/MainContext'

const OverplayMobile = () => {
  const {handleShowNavbar,handleCloseNavbar} = useMainContext();

  return (
    <div>
      {/* <!-- Mobile Menu --> */}
      <div className="mobile-menu-overlay" onClick={handleCloseNavbar} />

      {/* <!-- End .mobil-menu-overlay --> */}
    </div>
  );
}

export default OverplayMobile