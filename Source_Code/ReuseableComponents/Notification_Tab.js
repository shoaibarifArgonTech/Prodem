import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Notification_Tab(props) {
  return (
    <View
      // activeOpacity={0.5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        borderRadius: hp(1.5),
        backgroundColor: Colors.primary_color,
        // backgroundColor: 'yellow',
        marginBottom: hp(1),
      }}
    >
      <Image
        resizeMode="center"
        source={require("../Assets/Images/BottomTab/account.png")}
        style={{
          width: hp(5),
          height: hp(5),
          // tintColor:Colors,
          backgroundColor: Colors.secondary_color,
          // padding:hp(1),
          borderRadius: hp(10),
        }}
      ></Image>

      <View
        style={{
          // backgroundColor: 'skyblue',
          marginHorizontal: wp(1.5),
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: hp(2.3),
            fontWeight: "600",
            color: Colors.black_text,
            // marginLeft: wp(1),
            // marginRight: wp(2),
            width: wp(75),
            // textAlign: 'right'
            // alignSelf: 'flex-end',
            // backgroundColor: 'plum',
          }}
        >
          {props.NotificationTitle}
        </Text>

        <Text
          numberOfLines={7}
          style={{
            fontSize: hp(2),
            // fontWeight: '600',
            color: Colors.black_text,
            // marginLeft: wp(1),
            // marginRight: wp(2),
            width: wp(75),
            // textAlign: 'right'
            // alignSelf: 'flex-end',
            // backgroundColor: 'plum',
          }}
        >
          {props.NotificationMessage}
        </Text>

        <Text
          // numberOfLines={7}
          style={{
            fontSize: hp(1.9),
            // fontWeight: '600',
            color: Colors.notificationDateColor,
            alignSelf: "flex-end",
            marginTop: hp(1),
            // marginLeft: wp(1),
            // marginRight: wp(2),
            // width: wp(75),
            // textAlign: 'right'
            // backgroundColor: 'plum',
          }}
        >
          {props.NotificationDate}
        </Text>
      </View>
    </View>
  );
}
