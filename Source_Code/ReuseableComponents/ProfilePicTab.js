import React, { useState, useEffect } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

const ProfilePicTab = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.OnAction();
      }}
      activeOpacity={0.4}
      style={{
        // backgroundColor: 'plum',
        borderColor: Colors.AuthScreenBlack,
        borderWidth: 1,
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        borderRadius: hp(1),
      }}
    >
      <Image
        // source={require('../Assets/Images/AccountScreen/camprofile.png')}
        source={props.TabIcon}
        style={{
          width: hp(10),
          height: hp(10),
          // backgroundColor: 'red',
        }}
      ></Image>
      <Text
        style={{
          fontSize: hp(2.5),
          color: Colors.black_text,
          marginTop: hp(1),
          textAlign: "center",
        }}
      >
        {props.TabTitle}
        {/* Camera */}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfilePicTab;
