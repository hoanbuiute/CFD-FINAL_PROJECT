import React, { useContext, useEffect, useState} from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";

///
const MainContext = createContext({});
//   const [isShowNavbar, setIsShowNavbar] = useState(false);

const MainContextProvider = ({ children }) => {
  const [isShowProfile, setIsShowProfile] = useState(false)
    const [isShowNavbar,setIsShowNavbar] = useState(false);
    const  {pathname} = useLocation();

    useEffect(() => {
      const scrollTop = (e) => {
        e?.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          800
          );
        };
        handleCloseNavbar();
    }, [pathname])
///Cờ với biến ishow
    const handleShowNavbar = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      $("body").addClass("mmenu-active");
      // console.log("isShow",isShow);
    };

    const handleCloseNavbar = (e) =>{
      e?.preventDefault();
      e?.stopPropagation();
      $("body").removeClass("mmenu-active");
    }

  return (
    <MainContext.Provider value={{handleCloseNavbar,handleShowNavbar}}>
    {children}
  </MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
