import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import {
  useNavigation,
  CommonActions,
  useRoute,
} from "@react-navigation/native";
import Helpers from "../../Data/Helpers";

const helper = new Helpers();

const NewPasswordDone = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
    >
      <StatusBar
        backgroundColor={Colors.AuthScreenBlack}
        translucent={false}
        barStyle="light-content"
        // barStyle="dark-content"
      />

      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: "center",
          marginHorizontal: wp(5),
          marginTop: hp(9),
        }}
      >
        {/* ========= NAME ========== */}

        <Text
          style={{
            fontSize: hp(3),
            color: Colors.white_text,
            marginBottom: hp(1),
            // marginTop: hp(3),
            fontWeight: "600",
          }}
        >
          Password Changed !
        </Text>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: 'plum',
            marginTop: hp(5),
          }}
        >
          <Image
            resizeMode="cover"
            source={require("../../../Assets/Images/passdone.png")}
            style={{
              width: wp(90),
              height: hp(45),
              borderRadius: 15,
              // tintColor: Colors.theme
            }}
          ></Image>
        </View>

        <View
          style={{
            marginTop: hp(12),
          }}
        >
          <Simple_Button
            OnAction={() => {
              helper.resetAndGo(navigation, "LoginScreen");
            }}
            Width={wp(80)}
            Height={hp(6)}
            BtnTitle={"OK"}
          />
        </View>
      </View>
    </View>
  );
};

export default NewPasswordDone;
