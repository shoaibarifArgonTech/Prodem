import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Register_or_Not(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(3),
        // backgroundColor: 'plum',
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: hp(2.2),
          color: Colors.secondary_color,
        }}
      >
        {props.Statement}
      </Text>

      <TouchableOpacity
        onPress={() => {
          props.OnAction();
        }}
        activeOpacity={0.5}
        style={{
          marginLeft: wp(1),
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: 'red',
        }}
      >
        <Text
          style={{
            fontSize: hp(2.2),
            color: Colors.theme,
            fontWeight: "600",
          }}
        >
          {props.Screen}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
