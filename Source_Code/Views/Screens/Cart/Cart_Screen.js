import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import Items_List from "../../../ReuseableComponents/Items_List";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Cart_Screen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [CartDetailList, setCartDetailList] = useState("");

  useEffect(() => {
    // changeNavigationBarColor(Colors.primary_color);
    cartDetail_ApiCaller();
  }, [1]);

  function cartDetail_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.CART_DETAILS,
      "",
      (resp) => {
        console.log(
          "\x1b[33m--------Cart_Detail_Items--------->>>>>>>",
          resp.data
        );

        // return
        setCartDetailList(resp.data?.items);
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

    // setisLoading(true)       //--- Loader On
    apiHandler.sendSecurePostRequest(
      Urls.REMOVE_CART_ITEM,
      body,
      (resp) => {
        console.log("\x1b[34m-----REMOVE_CART.ITEM----->>>", resp.data);

        if (resp.code == 200) {
          const newCartItems = [...CartDetailList];
          newCartItems.splice(index, 1);
          setCartDetailList(newCartItems);

          helper.showTextToast("Item has removed from cart.", Colors.theme);
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
        }

        // return
        // setisLoading(false)
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
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
        backButton={false}
        GoBack={() => {}}
        Title={"Cart List"}
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
        (CartDetailList == "" ? (
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
              data={CartDetailList}
              renderItem={({ item, index }) => {
                return (
                  <Items_List
                    RemoveAction={() => {
                      removeCartItem(item.product_id, index);
                    }}
                    ItemName={item.product_name}
                    Qty={item.user_cart_qty}
                    Price={item.product_price}
                  />
                );
              }}
            />
          </View>
        ))}

      {/* =========== RELOAD ========= */}
      <TouchableOpacity
        onPress={() => {
          cartDetail_ApiCaller();
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
    </View>
  );
}
