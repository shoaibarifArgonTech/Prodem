import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Horizontal_NoBorder_Flatlist(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View
      style={{
        justifyContent: "space-between",
        marginTop: hp(3),
      }}
    >
      <FlatList
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={props.DataList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
              }}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: wp(8),
                paddingVertical: hp(1.3),
                borderBottomWidth: 1.5,
                borderBottomColor:
                  index == selectedIndex ? Colors.theme : Colors.transparent,
                marginHorizontal: wp(1),
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  fontWeight: "500",
                  borderBottomWidth: 1,
                  borderBottomColor:
                    index == selectedIndex ? Colors.theme : Colors.black,
                  color:
                    index == selectedIndex ? Colors.theme : Colors.black_text,
                }}
              >
                {item.BoxTitle}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
