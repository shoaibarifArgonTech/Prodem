import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FONTS } from "../Assets/fonts/AppFonts";

export default function Text_Statement(props) {
  return (
    <Text
      style={{
        fontSize: hp(2.5),
        // fontFamily: FONTS.font1,
        color: Colors.black_text,
        fontWeight: "500",
      }}
    >
      {props.Statement}
    </Text>
  );
}
