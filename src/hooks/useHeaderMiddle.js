import React, { useEffect } from "react";
import { useMainContext } from "../components/Context/MainContext";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveCart } from "../store/reducers/cartReducer";

const useHeaderMiddle = () => {
  const { handleShowNavbar } = useMainContext();
  const dispatch = useDispatch();
  const { cartInfo, cartLoading } = useSelector((state) => state.cart);
  const { product, quantity, shipping, subTotal, total, variant,totalProduct } =
    cartInfo || {};

  useEffect(() => {
    var $searchWrapper = $(".header-search-wrapper"),
      $body = $("body"),
      $searchToggle = $(".search-toggle");
    $searchToggle.on("click", function (e) {
      $searchWrapper.toggleClass("show");
      $(this).toggleClass("active");
      $searchWrapper.find("input").focus();
      e.preventDefault();
    });

    $body.on("click", function (e) {
      if ($searchWrapper.hasClass("show")) {
        $searchWrapper.removeClass("show");
        $searchToggle.removeClass("active");
        $body.removeClass("is-search-active");
      }
    });

    $(".header-search").on("click", function (e) {
      e.stopPropagation();
    });

    // Sticky header
    var catDropdown = $(".category-dropdown"),
      catInitVal = catDropdown.data("visible");

    if ($(".sticky-header").length && $(window).width() >= 992) {
      var sticky = new Waypoint.Sticky({
        element: $(".sticky-header")[0],
        stuckClass: "fixed",
        offset: -300,
        handler: function (direction) {
          // Show category dropdown
          if (catInitVal && direction == "up") {
            catDropdown
              .addClass("show")
              .find(".dropdown-menu")
              .addClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "true");
            return false;
          }

          // Hide category dropdown on fixed header
          if (catDropdown.hasClass("show")) {
            catDropdown
              .removeClass("show")
              .find(".dropdown-menu")
              .removeClass("show");
            catDropdown.find(".dropdown-toggle").attr("aria-expanded", "false");
          }
        },
      });
    }

    // Menu init with superfish plugin
    if ($.fn.superfish) {
      $(".menu, .menu-vertical").superfish({
        popUpSelector: "ul, .megamenu",
        hoverClass: "show",
        delay: 0,
        speed: 80,
        speedOut: 80,
        autoArrows: true,
      });
    }
  }, []);
  const handleRemoveProduct = (removeIndex) => {
    if (cartLoading || removeIndex < 0) return;
     dispatch(handleRemoveCart({removeIndex}));
  };
  const dropdowCartProp = {
    product: product?.map((item,index)=>{
      return {
        ...item,
        quantity:quantity?.[index],
        totalProduct:totalProduct?.[index],
        variant:variant?.[index],
      }
    }),

    handleRemoveProduct,
    total,
    shipping,
  };
  return {
    dropdowCartProp,
    handleShowNavbar
  };
};

export default useHeaderMiddle;
