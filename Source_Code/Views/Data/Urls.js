import AppConfig from "./AppConfig";
let DOMAIN = AppConfig.domain;
const ROUTE = AppConfig.route;

DOMAIN = DOMAIN + ROUTE;
export default {
  //----------------AUTH------------------------------
  USER_REGISTER: DOMAIN + "user/signup",
  USER_LOGIN: DOMAIN + "user/login",
  USER_ACCOUNT_EXIST: DOMAIN + "user/account-exists",
  USER_FORGET: DOMAIN + "user/forget",
  USER_VERIFY: DOMAIN + "user/forget-verification",
  USER_RESEND_OTP: DOMAIN + "user/resend-forgot-code",
  USER_NEW_PASSWORD: DOMAIN + "user/set-new-password",
  USER_LOGOUT: DOMAIN + "user/logout",

  //-----------------PROFILE---------------------------
  PROFILE_DETAILS: DOMAIN + "profile/details",
  PROFILE_UPDATE: DOMAIN + "profile/update-profile",
  PROFILE_NAME: DOMAIN + "profile/update-name",
  UPDATE_PASSWORD: DOMAIN + "profile/update-password",
  UPDATE_PHOTO: DOMAIN + "profile/update-photo",

  //-----------------HOME---------------------------
  HOME_ITEM_LIST: DOMAIN + "home",

  //-----------------PRODUCTS---------------------------
  PRODUCT_LIST: DOMAIN + "shop",
  PRODUCT_DETAILS: DOMAIN + "shop/product-details",
  PRODUCT_FILTER_LIST: DOMAIN + "shop/filters-list",

  //-----------------ADD PART---------------------------
  ADD_PART: DOMAIN + "sell/create",

  //-----------------CART---------------------------
  CART_DETAILS: DOMAIN + "cart/details",
  ADD_CART_ITEM: DOMAIN + "cart/add-item",
  REMOVE_CART_ITEM: DOMAIN + "cart/remove-item",

  //-----------------WISHLIST---------------------------
  WISHLIST_DETAILS: DOMAIN + "wishlist",
  WISHLIST_ADD_ITEM: DOMAIN + "wishlist/add-item",
  WISHLIST_REMOVE_ITEM: DOMAIN + "wishlist/remove-item",

  //-----------------NOTIFICATION---------------------------
  NOTIFICATION_LIST: DOMAIN + "notification",

  //-----------------WINNING BIDS---------------------------
  BID_NEW: DOMAIN + "mypartrequest/winning/new",
  BID_CONFIRM: DOMAIN + "mypartrequest/winning/confirm",
  BID_DELIVERED: DOMAIN + "mypartrequest/winning/deliverd",
  BID_COMPLETED: DOMAIN + "mypartrequest/winning/completed",
  BID_CANCEL: DOMAIN + "mypartrequest/winning/cancle",
  BID_ALL: DOMAIN + "mypartrequest/winning/all",

  BID_ACTIVE_RECEIVED: DOMAIN + "mypartrequest/bids-received/active",
  BID_INACTIVE_RECEIVED: DOMAIN + "mypartrequest/bids-received/inactive",
  BID_LOST_RECEIVED: DOMAIN + "mypartrequest/bids-received/lost",

  //-----------------SUBSCRIPTION---------------------------
  SUBSCRIPTION_LIST: DOMAIN + "subscrition/list",
  ACTIVE_PLANS_SUBSCRIPTION: DOMAIN + "subscrition/current-active-plan",
  BUY_PLANS_SUBSCRIPTION: DOMAIN + "subscrition/buy-plan/5",

  //-----------------RATINGS---------------------------
  RATING_PENDING: DOMAIN + "qualifying/rating-pending",
  RATING_RECEIVED: DOMAIN + "qualifying/rating-received",
  RATING_GIVEN: DOMAIN + "qualifying/rating-received",

  //------------------DROPDOWN ADD_PART-----------------
  DROPDOWN_ADDPART_CATEGORY: DOMAIN + "sell/dropdown-list",

  //------------------ASK OFFER-----------------
  ASK_OFFER: DOMAIN + "mypartrequest/create",
  DROPDOWN_ASK_OFFER: DOMAIN + "mypartrequest/create-dropdown-list",
};
