import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Simple_Button(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.OnAction();
      }}
      activeOpacity={0.5}
      style={{
        // width: wp(90),
        // height: hp(6),
        width: props.Width,
        height: props.Height,
        borderRadius: hp(1),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: props.BGColor ? props.BGColor : Colors.theme,
      }}
    >
      <Text
        style={{
          fontSize: hp(2.3),
          color: props.TextColor ? props.TextColor : Colors.white_text,
          fontWeight: "500",
          borderBottomColor: props.TextColor ? props.TextColor : Colors.white,
          borderBottomWidth: 1,
        }}
      >
        {props.BtnTitle}
      </Text>
    </TouchableOpacity>
  );
}
