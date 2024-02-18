const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = "/profile/order";
const PROFILE_ADDRESS = "/profile/address";
const PROFILE_WISHLIST = "/profile/wishlist";
const CHANGE_PASSWORD  =  "/profile/change-password";


const PATHS = {
    HOME: "/",
    PRODUCTS: PRODUCTS_PATH,
    PRODUCTS_DETAIL: PRODUCTS_PATH + "/:slug",
    CART: "/cart",
    CHECKOUT:"/checkout",
    CHECKOUT_SUCCESS:"/checkout_success",
    DASHBOARD:"/dashboard",
    FAQ:"/FQA",
    PAYMENT_MENTHOD:"payment_menthod",
    PRIVATE_POLICY: "/private_policy",
    RETURN:"/returns",
    SHIPPING:"/shipping",
    SHOPPING_CART:"/shopping-cart",
    PROFILE: {
        INDEX: PROFILE_PATH,
        PROFILE_ORDER: PROFILE_ORDER ,
        PROFILE_WISHLIST: PROFILE_WISHLIST ,
        PROFILE_ADDRESS: PROFILE_ADDRESS ,
        CHANGE_PASSWORD: CHANGE_PASSWORD,
       
    },
    BLOG : "/blog",
    CONTACT: "/contact",
    ABOUT: "/about",
    NOT_FOUND: "*",
};

export default PATHS;

export const FOOTER_PATHS = [
    {
      title: "Useful Links",
      path: [PATHS.ABOUT, PATHS.PRODUCTS, PATHS.FAQ, PATHS.CONTACT],
    },
    {
      title: "Customer Service",
      path: [PATHS.PAYMENT_MENTHOD, PATHS.RETURN, PATHS.SHIPPING, PATHS.PRIVACY],
    },
    {
      title: "My Account",
      path: [
        PATHS.PROFILE.INDEX,
        PATHS.CART,
        PATHS.PROFILE.PROFILE_WISHLIST,
        PATHS.PROFILE.PROFILE_ORDER,
      ],
    },
  ];