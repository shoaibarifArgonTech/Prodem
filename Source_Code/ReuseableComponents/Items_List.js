import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Items_List(props) {
  const { item } = props;
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
          uri: item?.product_image
            ? item?.product_image
            : "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg",
        }}
        style={{
          width: hp(10),
          height: hp(10),
          borderRadius: hp(1.5),
        }}
      />

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
          {item?.product_name}
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
            {item?.user_cart_qty ?? "N/A"}
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
            {item?.product_price}
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
