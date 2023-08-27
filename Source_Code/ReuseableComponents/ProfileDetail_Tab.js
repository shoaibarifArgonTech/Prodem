import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function ProfileDetail_Tab(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        // borderRadius:
        borderBottomColor: Colors.gray1,
        borderBottomWidth: 1.5,
        // backgroundColor: 'skyblue',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: hp(4.3),
      }}
    >
      <Text
        style={{
          fontSize: hp(2.6),
          fontWeight: "600",
          color: Colors.black_text,
          flex: 1,
          // backgroundColor: 'red',
          marginRight: wp(1),
          marginBottom: hp(1),
        }}
      >
        {props.Title}
      </Text>

      <Text
        style={{
          fontSize: hp(2.3),
          // fontWeight: '500',
          color: Colors.black_text,
          flex: 2,
          // backgroundColor: 'yellow',
          marginLeft: wp(1),
          textAlign: "right",
          marginBottom: hp(1),
        }}
      >
        {props.Value}
      </Text>
    </View>
  );
}
