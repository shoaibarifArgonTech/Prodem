import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Colors } from "../../../Colors/Colors";
import Header from "../../../ReuseableComponents/Header";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function MyPart_Screen() {
  const navigation = useNavigation();

  useEffect(() => {
    // navigateAction();
    // changeNavigationBarColor(Colors.bottamTabColor);

    productDetail_ApiCaller();
  }, [1]);

  const [isLoading, setisLoading] = useState(false);
  const [productList, setproductList] = useState([{}]);

  function productDetail_ApiCaller() {
    // if (Device == "") {
    //     helper.showTextToast("Device empty.", Colors.theme)
    //     return
    // }

    // let body = "username=" + email + "&password=" + Password
    let body = "product_id=" + "59";

    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.PRODUCT_DETAILS,
      body,
      (resp) => {
        console.log(
          "\x1b[35m-----MY PART----->>>",
          resp.data?.cartDetails?.items
        );

        // return
        setproductList(resp.data?.cartDetails?.items);
        // setItemsList(resp.data?.categories)
        setisLoading(false);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function editCartItem() {
    return helper.showTextToast("Item Added.", Colors.theme);
  }
  function removeCartItem() {
    let body = "product_id=" + "59";

    // setisLoading(true)       //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.REMOVE_CART_ITEM,
      body,
      (resp) => {
        console.log("\x1b[34m-----REMOVE_CART.ITEM----->>>", resp.data);

        // return
        // setproductList(resp.data?.cartDetails?.items)
        // setisLoading(false)

        helper.showTextToast("Item Removed.", Colors.theme);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }
  function upCartItem() {
    return helper.showTextToast("Sorry not avail now.", Colors.theme);
  }
  function promoteCartItem() {
    return helper.showTextToast("Thanks for Promoting Item.", Colors.theme);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary_color,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"My Parts"}
      />

      {/* ========== SORT BY ============ */}
      <View
        style={{
          // flex: 1,
          // backgroundColor: 'plum',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.white,
          paddingVertical: hp(0.7),
        }}
      >
        <TouchableOpacity onPress={() => {}} activeOpacity={0.3}>
          <Text
            // numberOfLines={1}
            style={{
              fontSize: hp(2.2),
              color: Colors.black,
              fontWeight: "500",
              // marginTop: hp(1),
              // fontFamily: FONTS.font1,
              borderBottomWidth: 1,
              borderBottomColor: Colors.black,
            }}
          >
            Sort By
          </Text>
        </TouchableOpacity>
      </View>

      {/* ================================= */}
      {/* {isLoading ?
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: hp(30),
                    // backgroundColor: 'yellow',
                }}>
                    <ActivityIndicator size="large" color={Colors.theme}
                        style={{
                            // marginTop: hp(11),
                            // alignSelf: 'center',
                        }} />
                </View>
                :
                <View
                    style={{
                        marginHorizontal: wp(5),
                        marginTop: hp(1),
                        flex: 1,
                        // backgroundColor: 'plum',
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={productList}
                        renderItem={({ item }) => {
                            return (
                                <Product_Tab
                                    ImageLink={item.product_image}
                                    ProductName={item.product_name}
                                    Comment={item.sold_by}
                                    Reviews={item.userRating + " Reviews"}
                                    Discount={item.product_discount}
                                    Price={"$ " + item.product_price}
                                    EditAction={() => { editCartItem() }}
                                    UpAction={() => { upCartItem() }}
                                    PromoteAction={() => { promoteCartItem() }}
                                    RemoveAction={() => { removeCartItem() }}
                                />
                            )
                        }}
                    />
                </View>
            } */}
    </View>
  );
}
