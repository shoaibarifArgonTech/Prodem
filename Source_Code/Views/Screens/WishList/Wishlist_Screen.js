import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextInputs from "../../../ReuseableComponents/TextInputs";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import Register_or_Not from "../../../ReuseableComponents/Register_or_Not";
import Account_DetailsTab from "../../../ReuseableComponents/Account_DetailsTab";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import { FONTS } from "../../../Assets/fonts/AppFonts";
import Items_List from "../../../ReuseableComponents/Items_List";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Wishlist_Screen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [WishlistDetail, setWishlistDetail] = useState("");
  const [getWishlist, setGetWishlist] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // changeNavigationBarColor(Colors.primary_color);

    // getWishlistData();
    wishlistDetail_ApiCaller();
  }, [1]);

  function getWishlistData() {
    prefManager.getSaveCartData((data) => {
      console.log("\x1b[34m====GET WISHLIST DATA====", JSON.stringify(data));
      setGetWishlist(data);
    });
  }

  function wishlistDetail_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.WISHLIST_DETAILS,
      "",
      (resp) => {
        console.log(
          "------------WISHLIST_DETAILS--------->>>>>>>",
          resp.data?.items
        );

        // return
        setWishlistDetail(resp.data?.items);
        setisLoading(false);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function removeCartItem(removeProductId, index) {
    let body = "product_id=" + removeProductId;

    setModalVisible(true); //--- Loader On
    apiHandler.sendSecurePostRequest(
      Urls.WISHLIST_REMOVE_ITEM,
      body,
      (resp) => {
        // console.log("\x1b[34m-----REMOVE WISH_ITEM----->>>", resp.data)

        if (resp.code == 200) {
          // const newCartItems = [...WishlistDetail, ...getWishlist];
          const newCartItems = [...WishlistDetail];
          newCartItems.splice(index, 1);
          setWishlistDetail(newCartItems);
          // setGetWishlist(newCartItems);
          setModalVisible(false);

          helper.showTextToast("Item has removed from wishlist.", Colors.theme);
          return;
        } else {
          setModalVisible(false);
          helper.showTextToast(resp.message, Colors.theme);
        }
      },
      (error) => {
        setModalVisible(false);
        helper.showTextToast(error, Colors.theme);
      }
    );
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
        Title={"Wishlist"}
      />

      {isLoading && (
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
      )}

      {!isLoading &&
        (WishlistDetail == "" ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.white,
              // backgroundColor: 'plum',
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../Assets/Images/empty.png")}
              style={{
                width: hp(16),
                height: hp(16),
                // backgroundColor: 'red',
                // marginBottom: hp(5),
              }}
            ></Image>

            <Text
              // numberOfLines={1}
              style={{
                fontSize: hp(2.5),
                color: Colors.theme,
                marginTop: hp(1),
                // fontFamily: FONTS.font1,
              }}
            >
              No Data Found
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: Colors.white,
              // backgroundColor: 'skyblue',
              marginTop: hp(2),
              marginHorizontal: wp(4),
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={WishlistDetail}
              renderItem={({ item, index }) => {
                return (
                  <Items_List
                    RemoveAction={() => {
                      removeCartItem(item.product_id, index);
                    }}
                    ItemName={item.product_name}
                    Qty={item.user_cart_qty}
                    Price={item.product_price}
                    ImageLink={item.product_image}
                    item={item}
                  />
                );
              }}
            />
          </View>
        ))}

      {/* =========== RELOAD ========= */}
      <TouchableOpacity
        onPress={() => {
          wishlistDetail_ApiCaller();
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: hp(4.5),
          right: wp(6),
          borderRadius: hp(50),
          padding: hp(0.5),
          backgroundColor: Colors.white,
        }}
      >
        <Ionicons name="reload" size={20} color={Colors.theme} />
      </TouchableOpacity>

      {modalVisible && (
        <View
          style={{
            // flex: 1,
            width: wp(100),
            height: hp(100),
            backgroundColor: Colors.blackHexColorlight,
            position: "absolute",
            // top: hp(35),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size={"large"}
            color={Colors.theme}
            style={
              {
                // alignSelf: 'center',
              }
            }
          ></ActivityIndicator>
        </View>
      )}
    </View>
  );
}
