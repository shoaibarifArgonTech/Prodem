import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
// import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Account_DetailsTab(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.OnAction();
      }}
      activeOpacity={0.6}
      style={{
        width: wp(100),
        height: hp(7.5),
        backgroundColor: Colors.white,
        borderBottomColor: Colors.gray1,
        borderBottomWidth: 1.5,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: 'space-between'
      }}
    >
      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: wp(3),
        }}
      >
        <Image
          resizeMode="contain"
          // source={require('../../../Assets/Images/enter.png')}
          source={props.TabImagePath}
          // source={{ uri: props.TabImagePath }}
          style={{
            width: hp(3.5),
            height: hp(3.5),
            tintColor: Colors.theme,
          }}
        ></Image>

        {/* <props.IconFamily name={props.TabIcon} size={30} color={Colors.gray1} /> */}
      </View>

      <Text
        numberOfLines={1}
        style={{
          fontSize: hp(2.5),
          // fontWeight: '500',
          color: Colors.black_text,
          textAlign: "left",
          flex: 1,
          // backgroundColor: 'red',
          marginLeft: wp(2),
        }}
      >
        {props.TabTitle}
      </Text>

      {props.TabTitle == "Notifications" && (
        <View
          style={{
            width: hp(3.5),
            height: hp(3.5),
            backgroundColor: Colors.NotifCounter,
            borderRadius: hp(10),
            alignItems: "center",
            justifyContent: "center",
            // marginLeft: wp(-12),
            left: wp(-33),
          }}
        >
          <Text
            // numberOfLines={1}
            style={{
              fontSize: hp(2),
              // fontWeight: '500',
              color: Colors.white_text,
              // textAlign: 'left',
              // flex: 1,
              // backgroundColor: 'red',
            }}
          >
            {props.NotifyCounter}
          </Text>
        </View>
      )}

      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: wp(3),
          // alignSelf: ,
        }}
      >
        <Ionicons name="chevron-forward" size={25} color={Colors.gray1} />
      </View>
    </TouchableOpacity>
  );
}
