import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CallButton from "../../../ReuseableComponents/CallButton";
import Header from "../../../ReuseableComponents/Header";
import moment from "moment";
import RenderHtml from "react-native-render-html";
import Stars from "react-native-stars";

import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";
import axios from "axios";
const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

var HtmlSource;

export default function ProductDetail_Screen() {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // navigateAction();
    changeNavigationBarColor(Colors.white);

    productDetail_ApiCaller();

    console.log("============ID, Product Details=======", Product_ID);
  }, [1]);

  const [isLoading, setisLoading] = useState(false);
  const [BtnLoading, setBtnLoading] = useState(false);
  const [WishLoading, setWishLoading] = useState(false);
  const [Product_ID, setProduct_ID] = useState(route.params?.ProductID ?? "");
  const [ItemsList, setItemsList] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ProductColor, setProductColor] = useState("");
  const [ProducType, setProductType] = useState("");
  const [ProductBrand, setProductBrand] = useState("");
  const [HtmlDetails, setHtmlDetails] = useState({});

  // var HtmlSource

  const ProductDetailList = [
    { label: "Color :", value: ProductColor },
    { label: "Type :", value: ProducType },
    { label: "Brand :", value: ProductBrand },
  ];

  const tagsStyles = {
    p: {
      color: "#000",
    },
  };

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  function productDetail_ApiCaller() {
    let body = "product_id=" + Product_ID;
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.PRODUCT_DETAILS,
      body,
      (resp) => {
        console.log(
          "\x1b[35m--------PRODUCT DETAILS------->>>",
          resp.data?.product
        );
        // console.log("\x1b[32m--------HTML DETAILS------->>>", resp.data?.product?.product_details)

        // return
        setItemsList(resp.data?.product);
        // setHtmlDetails(resp.data?.product?.product_details)
        // setHtmlDetails({ html: resp.data?.product?.product_details })
        HtmlSource = {
          html: resp.data?.product?.product_details,
        };
        console.log("\x1b[32m--------HTML DETAILS------->>>", HtmlSource);

        setPhoneNumber(resp.data?.product?.p_user_mobile);
        setProductColor(resp.data?.product?.product_color);
        setProductType(resp.data?.product?.product_type);
        setProductBrand(resp.data?.product?.company_name);

        setisLoading(false);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function AddtoCartItem() {
    // let body = "product_id=" + Product_ID + "&qty=" + "1";
    // setBtnLoading(true); //--- Loader On
    // apiHandler.sendSecurePostRequest(
    //   Urls.ADD_CART_ITEM,
    //   body,
    //   (resp) => {
    //     console.log("\x1b[35m-----RESPONSE AddtoCartItem()----->>>", resp.data)
    //     helper.showTextToast("Item added into cart.", Colors.theme);
    //     setBtnLoading(false);
    //   },
    //   (error) => {
    //     helper.showTextToast(error, Colors.theme);
    //     setBtnLoading(false);
    //   }
    // );
    // return;
    setBtnLoading(true); //--- Loader On
    prefManager.getUserSessionData((data) => {
      console.log("Token==>", data?.data?.token);
      const formData = new FormData();
      formData.append("product_id", Product_ID);
      formData.append("qty", "1");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://demo.exultcybersolution.in/api/cart/add-item",
        headers: {
          Authorization: `Bearer ${data?.data?.token}`,
          "Content-Type": "multipart/form-data; ",
        },
        data: formData,
      };
      console.log("DATA==>", formData);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          helper.showTextToast("Item added into cart.", Colors.theme);
          setBtnLoading(false);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          helper.showTextToast(error, Colors.theme);
          setBtnLoading(false);
        });
    });
  }

  function favouriteItem() {
    // let body = "product_id=" + Product_ID;
    // setWishLoading(true); //--- Loader On
    // apiHandler.sendSecurePostRequest(
    //   Urls.WISHLIST_ADD_ITEM,
    //   body,
    //   (resp) => {
    //     console.log("\x1b[35m-----ADD TO FAVOURITE----->>>", resp.data);
    //     if (resp.code == 200) {
    //       helper.showTextToast("Item added to wishlist.", Colors.theme);
    //       setWishLoading(false);
    //       return;
    //     } else {
    //       helper.showTextToast(resp.message, Colors.theme);
    //       setWishLoading(false);
    //     }
    //   },
    //   (error) => {
    //     helper.showTextToast(error, Colors.theme);
    //     setWishLoading(false);
    //   }
    // );
    setWishLoading(true); //--- Loader On
    prefManager.getUserSessionData((data) => {
      console.log("Token==>", data?.data?.token);
      const formData = new FormData();
      formData.append("product_id", Product_ID);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://demo.exultcybersolution.in/api/wishlist/add-item",
        headers: {
          Authorization: `Bearer ${data?.data?.token}`,
          "Content-Type": "multipart/form-data; ",
        },
        data: formData,
      };
      console.log("DATA==>", formData);
      axios
        .request(config)
        .then((response) => {
          console.log(
            "\x1b[35m-----ADD TO FAVOURITE----->>>",
            response.data,
            response.status
          );
          helper.showTextToast("Item added to WishList.", Colors.theme);
          setWishLoading(false);
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          helper.showTextToast(error, Colors.theme);
          setWishLoading(false);
        });
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.blackHexColorlight,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Product Details"}
      />

      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // marginTop: hp(30),
            // backgroundColor: 'yellow',
          }}
        >
          <ActivityIndicator
            size="large"
            color={Colors.theme}
            style={
              {
                // marginTop: hp(11),
                // alignSelf: 'center',
              }
            }
          />
        </View>
      ) : (
        <View
          style={{
            // backgroundColor: 'skyblue',
            marginHorizontal: wp(3),
            // marginBottom: hp(1),
            flex: 1,
            paddingBottom: hp(10),
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: hp(1),
            }}
          >
            <View
              style={{
                marginVertical: hp(2),
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // backgroundColor: 'plum',
              }}
            >
              <Image
                resizeMode="cover"
                // source={require('../Assets/Images/noimage.png')}
                source={{
                  uri:
                    ItemsList.product_image == "" ||
                    ItemsList.product_image == null ||
                    ItemsList.product_image == undefined
                      ? "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
                      : ItemsList.product_image,
                }}
                // source={{
                //     uri: "http://auto-zon.com/image/catalog/bmcartech/AZ12325-1.jpg"
                // }}

                style={{
                  width: wp(26),
                  height: hp(18),
                  borderRadius: hp(1),
                  // backgroundColor: 'red',
                }}
              ></Image>

              {/* ======== Info View ======== */}

              <View
                style={{
                  flex: 2,
                  // marginLeft: wp(3),
                  // backgroundColor: 'yellow',
                  // height: hp(19),
                  marginHorizontal: wp(3),
                }}
              >
                <Text
                  // numberOfLines={2}
                  style={{
                    fontSize: hp(2.2),
                    fontWeight: "600",
                    color: Colors.black_text,
                    // marginRight: wp(2),
                    // width: wp(35),
                    // textAlign: 'right',
                    // alignSelf: 'flex-end',
                    // backgroundColor: 'blue',
                  }}
                >
                  {/* {props.ProductName} */}
                  {ItemsList.product_name}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: hp(2),
                    // fontWeight: '600',
                    color: Colors.black_text,
                    marginTop: hp(0.5),
                    // backgroundColor: 'plum',
                  }}
                >
                  {ItemsList.subcategory_name}
                </Text>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    // justifyContent:'center',
                    justifyContent: "flex-start",
                    // backgroundColor: 'green',
                  }}
                >
                  <Stars
                    // display={3}
                    display={ItemsList.product_views}
                    spacing={2}
                    count={5}
                    starSize={15}
                    fullStar={require("../../../Assets/Images/star.png")}
                    emptyStar={require("../../../Assets/Images/emptystar.png")}
                  />

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: hp(2),
                      // fontWeight: '600',
                      color: Colors.gray1,
                      marginLeft: wp(1.5),
                      // marginTop: hp(1),
                      // backgroundColor: 'plum',
                    }}
                  >
                    {ItemsList.product_views == "" ||
                    ItemsList.product_views == null ||
                    ItemsList.product_views == undefined
                      ? "Reviews"
                      : ItemsList.product_views + " Reviews"}
                    {/* Reviews */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: 'blue',
                    alignItems: "center",
                    marginTop: hp(1),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: hp(2.2),
                      // fontWeight: '600',
                      color: Colors.gray1,
                      width: wp(28),
                      // backgroundColor: 'plum',
                    }}
                  >
                    {ItemsList.product_price}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: hp(1.8),
                      color: Colors.white_text,
                      paddingHorizontal: wp(1),
                      paddingVertical: hp(0.3),
                      borderRadius: hp(5),
                      marginLeft: wp(2),
                      backgroundColor: "red",
                      // overflow: 'hidden',
                    }}
                  >
                    {ItemsList.product_discount == "" ||
                    ItemsList.product_discount == null
                      ? "0%"
                      : ItemsList.product_discount}
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: hp(2),
                    fontWeight: "600",
                    color: Colors.black_text,
                    marginTop: hp(1),
                    // backgroundColor: 'plum',
                  }}
                >
                  {ItemsList.product_price}
                </Text>
              </View>
            </View>

            {/* ========== Button========= */}
            <View
              style={
                {
                  // marginTop: hp(2),
                  // backgroundColor: 'plum',
                }
              }
            >
              <CallButton
                OnAction={() => {
                  makeCall();
                }}
                number={phoneNumber}
              />

              <CallButton OnAction={() => {}} number={phoneNumber} />
            </View>

            {/* ===============Box 1================ */}
            <View
              style={{
                borderRadius: hp(1),
                backgroundColor: Colors.white_BG,
                paddingHorizontal: wp(3),
                // paddingVertical: hp(2),
                marginTop: hp(2),
                paddingBottom: hp(3),
                paddingTop: hp(1),
              }}
            >
              <RenderHtml
                contentWidth={wp(90)}
                source={HtmlSource}
                tagsStyles={tagsStyles}
                // tagsStyles={{ p: { color:'#58585A',fontSize:16, } }}
                // tagsStyles={{
                //     // fontSize: hp(2.3),
                // }}
                // tagsStyles={tagsStyles}
              />
            </View>

            {/* ===============Detail Box================ */}
            <View
              style={{
                borderRadius: hp(1),
                backgroundColor: Colors.white_BG,
                paddingHorizontal: wp(3),
                // paddingVertical: hp(2),
                marginTop: hp(2),
                paddingBottom: hp(3),
                paddingTop: hp(1),
              }}
            >
              <Text
                // numberOfLines={1}
                style={{
                  fontSize: hp(2.3),
                  color: Colors.black_text,
                  fontWeight: "600",
                  marginTop: hp(1.5),
                  // backgroundColor: 'plum',
                }}
              >
                Details
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.gray1,
                }}
              >
                <Text
                  // numberOfLines={1}
                  style={{
                    fontSize: hp(2.2),
                    color: Colors.black_text,
                    // fontWeight: "600",
                    // backgroundColor: 'plum',
                  }}
                >
                  Purchase Date:
                </Text>

                <Text
                  // numberOfLines={1}
                  style={{
                    fontSize: hp(2.2),
                    color: Colors.black_text,
                    // fontWeight: "600",
                    // backgroundColor: 'plum',
                  }}
                >
                  {moment(ItemsList.product_updated_at).format("MMMM D, YYYY")}
                </Text>
              </View>

              {ProductDetailList.map((item) => (
                <View
                  key={item.value}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // backgroundColor: 'plum',
                    marginTop: hp(1.5),
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.gray1,
                  }}
                  // onPress={() => setSelectedItem(item)}
                >
                  <Text
                    // numberOfLines={1}
                    style={{
                      fontSize: hp(2.3),
                      color: Colors.black_text,
                      flex: 0.6,
                      marginRight: wp(1),
                    }}
                  >
                    {item.label}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: hp(2.3),
                      color: Colors.black_text,
                      textAlign: "right",
                      flex: 2,
                      marginLeft: wp(1),
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* ===============ADD TO CART ============== */}
      <View
        style={{
          width: wp(100),
          height: hp(10),
          backgroundColor: Colors.white_BG,
          position: "absolute",
          bottom: 0,
          // flex:0.3
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            // backgroundColor: 'plum',
            marginTop: hp(1),
          }}
        >
          {/* ========== FAVOURITE BTN ============== */}
          {WishLoading ? (
            <View
              style={{
                paddingVertical: hp(1.7),
                paddingHorizontal: wp(3.7),
                borderRadius: hp(1),
                backgroundColor: Colors.theme,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="small" color={Colors.white} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                favouriteItem();
              }}
              activeOpacity={0.5}
              style={{
                // padding: hp(1),
                paddingVertical: hp(1.2),
                paddingHorizontal: wp(3),
                borderRadius: hp(1),
                backgroundColor: Colors.theme,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="heart-outline" size={25} color={Colors.white} />
            </TouchableOpacity>
          )}

          {/* ===================ADD TO CART BTN =============== */}

          {BtnLoading ? (
            <View
              style={{
                width: wp(70),
                height: hp(6),
                borderRadius: hp(1),
                backgroundColor: Colors.theme,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="small" color={Colors.white} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                AddtoCartItem();
              }}
              activeOpacity={0.5}
              style={{
                width: wp(70),
                height: hp(6),
                borderRadius: hp(1),
                backgroundColor: Colors.theme,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  color: Colors.white_text,
                  fontWeight: "500",
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
