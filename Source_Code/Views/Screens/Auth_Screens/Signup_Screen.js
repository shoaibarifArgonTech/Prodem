import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
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
import { useNavigation, CommonActions } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signup_Screen() {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent={false}
        barStyle="dark-content"
      />

      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: "center",
          marginHorizontal: wp(5),
          marginTop: hp(10),
          marginBottom: hp(10),
        }}
      >
        <Image
          resizeMode="contain"
          source={require("../../../Assets/Images/logo.png")}
          style={{
            width: wp(50),
            height: hp(15),
            marginBottom: hp(5),
          }}
        ></Image>

        <TextInputs></TextInputs>
        <TextInputs></TextInputs>
        <TextInputs></TextInputs>
        <TextInputs></TextInputs>

        <View
          style={{
            marginTop: hp(3),
          }}
        >
          <Simple_Button BtnTitle={"Signup"}></Simple_Button>

          <Register_or_Not
            OnAction={() => {
              navigation.navigate("LoginScreen");
            }}
            Statement={"Already have an account"}
            Screen={"Login"}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
