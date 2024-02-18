export const COURSE_ITEM_TYPE ={
    normal: "normal",
    comming :"coming",
};

export const MODAL_TYPE = {

    login : "login",
    register:"register"
};

export const PAYMENT_METHOD = {
  cash: "cash",
  card: "card",
}

export const SORT_OPTIONS = {
    popularity: {
      value: "popularity",
      label: "Most Popular",
      queryObject: { orderBy: undefined, order: undefined },
    },
    pricelow: {
      value: "pricelow",
      label: "Price Low to High",
      queryObject: { orderBy: "price", order: "1" },
    },
    pricehigh: {
      value: "pricehigh",
      label: "Price Hight to Low",
      queryObject: { orderBy: "price", order: "-1" },
    },
    newest: {
      value: "newest",
      label: "Newest",
      queryObject: { orderBy: "createdAt", order: "-1" },
    },
    rating: {
      value: "rating",
      label: "Most Rated",
      queryObject: { orderBy: "rating", order: "-1" },
    },
  };

  export const SHIPPING_OPTIONS = [
    {
      label: "Free Shipping",
      value: "freeshipping",
      price: 0,
    },
  
    {
      label: "Standard",
      value: "standard",
      price: 10,
    },
  
    {
      label: "Express",
      value: "express",
      price: 20,
    },
  ];