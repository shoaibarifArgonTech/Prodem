import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import Horizontal_NoBorder_Flatlist from "../../../ReuseableComponents/Horizontal_NoBorder_Flatlist";

export default function MyPart_Request() {
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [list, setList] = useState([
    {
      BoxTitle: "Received",
    },
    {
      BoxTitle: "Cancelled",
    },
    {
      BoxTitle: "Solved",
    },
    {
      BoxTitle: "Pending",
    },
    {
      BoxTitle: "Given",
    },
    {
      BoxTitle: "Received",
    },
  ]);

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
        Title={"My Part Request"}
      />

      <Horizontal_NoBorder_Flatlist
        DataList={list}
        // BoxTitle={}
      />

      {/* ========= NO DATA View ========= */}
      {/* <View
                style={{
                    flex: 1,
                    // backgroundColor: 'plum',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.white,
                }}>

                <Image
                    resizeMode='cover'
                    source={require('../../../Assets/Images/empty.png')}
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
                    }}>
                    No Data Found
                </Text>

            </View> */}
    </View>
  );
}
