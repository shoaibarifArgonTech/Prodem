import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Horizontal_Flatlist(props) {
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
                // paddingHorizontal: index == this.state.selectedIndex ? wp(5) : 0,
                // paddingVertical: index == this.state.selectedIndex ? hp(1) : 0,
                // borderRadius: index == this.state.selectedIndex ? 30 : 0,
                paddingHorizontal: wp(8),
                paddingVertical: hp(1.3),
                borderRadius: hp(1),
                borderColor:
                  index == selectedIndex ? Colors.transparent : Colors.theme,
                borderWidth: 1.5,
                backgroundColor:
                  index == selectedIndex ? Colors.theme : "transparent",
                marginHorizontal: wp(1),
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  fontWeight: "500",
                  borderBottomWidth: 1,
                  borderBottomColor:
                    index == selectedIndex ? Colors.white : Colors.black,
                  color:
                    index == selectedIndex
                      ? Colors.white_text
                      : Colors.black_text,
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
