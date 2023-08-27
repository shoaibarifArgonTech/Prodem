import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Home_ItemsList_Tab(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.OnAction();
      }}
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        width: wp(90),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        borderRadius: hp(1.5),
        backgroundColor: Colors.white,
        marginBottom: hp(2),

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Image
        resizeMode="center"
        source={
          props?.ImageLink
            ? { uri: props?.ImageLink }
            : require("../Assets/Images/noimage.png")
        }
        style={{
          width: wp(35),
          height: hp(10),
          borderRadius: hp(1.5),
        }}
      />

      <View
        style={{
          flex: 1,
          marginLeft: wp(2),
          // backgroundColor: 'yellow',
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: hp(2.2),
            fontWeight: "600",
            color: Colors.black_text,
            marginRight: wp(2),
            // width: wp(35),
            textAlign: "right",
            alignSelf: "flex-end",
            // backgroundColor: 'plum',
          }}
        >
          {props.ItemName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
