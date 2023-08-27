import React, { useState, useEffect } from "react";
import { View, StatusBar, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    prefManager.isUserLoggedIn((data) => {
      if (data) {
        prefManager.getUserSessionData((data) => {
          console.log("\x1b[31m---------------Splash---------------->,", data);

          navigateAction("BottamTab");
        });
      } else {
        navigateAction("Account_ExistScreen");
      }
    });

    changeNavigationBarColor("transparent");
  }, [1]);

  function navigateAction(ScreenName) {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: ScreenName,
              // name: "Account_ExistScreen",
            },
          ],
        })
      );
    }, 3000);
  }

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: Colors.theme,
        backgroundColor: Colors.primary_color,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar backgroundColor={Colors.transparent} translucent />

      <View
        style={
          {
            // backgroundColor: 'plum',
            // marginTop: hp(40),
            // alignItems: 'center',
            // justifyContent: 'center',
          }
        }
      >
        <Image
          resizeMode="contain"
          source={require("../../../Assets/Images/logo.png")}
          style={{
            width: hp(30),
            height: hp(30),
          }}
        ></Image>
      </View>
    </View>
  );
}
