import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Items_List(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        borderRadius: hp(1.5),
        backgroundColor: Colors.white,
        marginBottom: hp(2),
      }}
    >
      <Image
        resizeMode="cover"
        // source={require('../Assets/Images/noimage.png')}
        source={{
          uri:
            props.ImageLink == "" || props.ImageLink == null
              ? "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg"
              : props.ImageLink,
        }}
        style={{
          width: hp(10),
          height: hp(10),
          borderRadius: hp(1.5),
        }}
      ></Image>

      <View
        style={{
          flex: 1,
          marginLeft: wp(2),
          // backgroundColor: 'yellow',
          // marginTop: hp(1),
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: hp(2),
            fontWeight: "500",
            color: Colors.black_text,
            // flex:1,
            // marginRight: wp(2),
            // width: wp(35),
            // textAlign: 'right'
            // alignSelf: 'flex-end',
            // backgroundColor: 'plum',
          }}
        >
          {props.ItemName}
        </Text>

        {/* ======= QTY ========= */}
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
            // marginLeft: wp(2),
            // backgroundColor: 'green',
          }}
        >
          <Text
            // numberOfLines={2}
            style={{
              fontSize: hp(2),
              fontWeight: "500",
              color: Colors.black_text,
              marginRight: wp(1),
              // backgroundColor: 'plum',
            }}
          >
            Qty:
          </Text>

          <Text
            // numberOfLines={2}
            style={{
              fontSize: hp(2),
              color: Colors.black_text,
              marginLeft: wp(1),
              // backgroundColor: 'plum',
            }}
          >
            {props.Qty == "" || props.Qty == null ? 1 : props.Qty}
          </Text>
        </View>

        {/* ======= Price ========= */}
        <View
          style={{
            flexDirection: "row",
            // flex: 1,
            // marginLeft: wp(2),
            // backgroundColor: 'blue',
          }}
        >
          <Text
            // numberOfLines={2}
            style={{
              fontSize: hp(2),
              fontWeight: "500",
              color: Colors.black_text,
              marginRight: wp(1),
              // backgroundColor: 'plum',
            }}
          >
            Price:
          </Text>

          <Text
            // numberOfLines={2}
            style={{
              fontSize: hp(2),
              color: Colors.black_text,
              marginLeft: wp(1),
              // backgroundColor: 'plum',
            }}
          >
            {props.Price}
          </Text>
        </View>

        {/* ================== REMOVE ITEM============== */}
        <TouchableOpacity
          onPress={() => {
            props.RemoveAction();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: 'green',
            alignSelf: "flex-end",
          }}
        >
          <MaterialCommunityIcons
            name="cart-remove"
            size={28}
            color={Colors.theme}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
