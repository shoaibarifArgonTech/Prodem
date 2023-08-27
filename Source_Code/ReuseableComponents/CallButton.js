import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const CallButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.OnAction();
      }}
      activeOpacity={0.5}
      style={{
        width: wp(70),
        height: hp(6),
        borderRadius: hp(1),
        backgroundColor: Colors.theme,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp(10),
        flexDirection: "row",
        marginTop: hp(1),
      }}
    >
      <FontAwesome name="phone" size={25} color={Colors.white} />

      <Text
        style={{
          fontSize: hp(2.3),
          color: Colors.white_text,
          fontWeight: "500",
          borderBottomColor: Colors.white,
          borderBottomWidth: 1,
        }}
      >
        {props.number}
        {/* 0300 0022002779 */}
      </Text>
    </TouchableOpacity>
  );
};

export default CallButton;
