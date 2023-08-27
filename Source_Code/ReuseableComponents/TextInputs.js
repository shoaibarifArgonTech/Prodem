import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function TextInputs(props) {
  return (
    <TextInput
      keyboardType={props.Keyboardtype}
      // keyboardType='default'
      // autoCapitalize={'sentences'}
      autoCapitalize={props.AutoCapital}
      placeholder={props.PlaceHolder}
      placeholderTextColor={props.PlaceHolderColor}
      value={props.Value}
      onChangeText={props.OnChangeText}
      returnKeyType={props.ReturnType}
      numberOfLines={props.NumOfLines}
      multiline={props.MultiLines}
      // returnKeyType="default"
      style={{
        fontSize: hp(2.2),
        color: Colors.black,
        width: props.Width,
        height: props.Height,
        borderRadius: hp(1),
        borderWidth: 1,
        borderColor: Colors.gray2,
        paddingHorizontal: wp(2),
        marginVertical: hp(1),
      }}
    ></TextInput>
  );
}
