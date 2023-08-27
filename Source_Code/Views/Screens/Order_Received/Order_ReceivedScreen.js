import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import { FONTS } from "../../../Assets/fonts/AppFonts";

export default function Order_ReceivedScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: Colors.gray2,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Order Received"}
      />

      {/* ========== SORT BY ============ */}
      {/* <View
                style={{
                    // flex: 1,
                    // backgroundColor: 'plum',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.white,
                    paddingVertical: hp(0.7),
                }}>
                <TouchableOpacity
                    onPress={() => { }}
                    activeOpacity={0.3}>
                    <Text
                        // numberOfLines={1}
                        style={{
                            fontSize: hp(2.2),
                            color: Colors.black,
                            // marginTop: hp(1),
                            fontFamily: FONTS.font1,
                            borderBottomWidth: 2,
                            borderBottomColor: Colors.black
                        }}>
                        Sort By
                    </Text>
                </TouchableOpacity>
            </View> */}

      {/* ========= NO DATA View ========= */}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'plum',
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.white,
        }}
      >
        <Image
          resizeMode="cover"
          source={require("../../../Assets/Images/empty.png")}
          style={{
            width: hp(16),
            height: hp(16),
            // backgroundColor: 'red',
            // marginBottom: hp(5),
          }}
        ></Image>

        <Text
          // numberOfLines={1}
          style={{
            fontSize: hp(2.5),
            color: Colors.theme,
            marginTop: hp(1),
            fontFamily: FONTS.font1,
          }}
        >
          No Data Found
        </Text>
      </View>
    </View>
  );
}
