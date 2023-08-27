import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function SubscriptionBox_BenefitsTab(props) {
  return (
    <View
      style={{
        // flexDirection: 'row',
        // borderRadius:
        borderBottomColor: Colors.gray2,
        borderBottomWidth: 1,
        // backgroundColor: 'skyblue',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        marginTop: hp(1),
      }}
    >
      <Text
        style={{
          fontSize: hp(2.3),
          fontWeight: "600",
          color: Colors.black_text,
          flex: 1,
          // backgroundColor: 'red',
          // marginRight: wp(1),
          marginBottom: hp(1),
        }}
      >
        {props.Key}
      </Text>
    </View>
  );
}
