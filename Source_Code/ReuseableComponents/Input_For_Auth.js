import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Input_For_Auth(props) {
  const [Username, setUsername] = useState();

  return (
    <TextInput
      keyboardType={props.Keyboardtype}
      // keyboardType='email-address'
      autoCapitalize={props.AutoCapital}
      placeholder={props.PlaceHolder}
      placeholderTextColor={props.PlaceHolderColor}
      value={props.Value}
      onChangeText={props.OnChangeText}
      secureTextEntry={props.SecureText}
      returnKeyType={props.ReturnType}
      // returnKeyType="done"
      style={{
        fontSize: hp(2.2),
        color: Colors.white_text,
        // color: Colors.black,
        width: props.Width,
        height: props.Height,
        borderBottomColor: Colors.theme,
        borderBottomWidth: 1.5,
        // paddingHorizontal: wp(2),
        // marginVertical: hp(1),
        // backgroundColor: 'plum',
        marginBottom: hp(3),
      }}
    ></TextInput>
  );
}
