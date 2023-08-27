import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "react-native-stars";

export default function Product_Tab(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        // props.OnAction();
        // alert(props?.ImageLink)
        console.log(props?.ImageLink);
      }}
      activeOpacity={0.4}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        borderRadius: hp(1.5),
        backgroundColor: Colors.white,
        marginBottom: hp(2),
      }}
    >
      <Image
        resizeMode="cover"
        // source={require("../Assets/Images/noimage.png")}
        source={
          props?.ImageLink
            ? {
                uri: props?.ImageLink,
              }
            : require("../Assets/Images/noimage.png")
        }
        style={{
          width: wp(26),
          height: hp(18),
          borderRadius: hp(1),
        }}
      />

      {/* ======== Info View ======== */}

      <View
        style={{
          flex: 2,
          marginLeft: wp(3),
          // backgroundColor: 'yellow',
          height: hp(19),
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            fontSize: hp(2),
            fontWeight: "600",
            color: Colors.black_text,
            // marginRight: wp(2),
            // width: wp(35),
            // textAlign: 'right',
            // alignSelf: 'flex-end',
            // backgroundColor: 'plum',
          }}
        >
          {props.ProductName}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            // fontWeight: '600',
            color: Colors.black_text,
            marginTop: hp(0.5),
            // backgroundColor: 'plum',
          }}
        >
          {props.Comment}
        </Text>

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            // justifyContent:'center',
            justifyContent: "flex-start",
            // backgroundColor: 'green',
          }}
        >
          <Stars
            // display={3}
            display={props?.DisplayStars?.toString()}
            spacing={2}
            count={5}
            starSize={15}
            fullStar={require("../Assets/Images/star.png")}
            emptyStar={require("../Assets/Images/emptystar.png")}
          />

          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2.1),
              // fontWeight: '600',
              color: Colors.gray1,
              marginLeft: wp(1.5),
            }}
          >
            {props.Reviews == "" ||
            props.Reviews == null ||
            props.Reviews == undefined
              ? ""
              : props.Reviews}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            // backgroundColor: 'blue',
            alignItems: "center",
            marginTop: hp(1),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(2.2),
              // fontWeight: '600',
              color: Colors.gray1,
              width: wp(28),
              // backgroundColor: 'plum',
            }}
          >
            {props.Price}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: hp(1.8),
              color: Colors.white_text,
              paddingHorizontal: wp(1),
              paddingVertical: hp(0.3),
              borderRadius: hp(5),
              marginLeft: wp(2),
              backgroundColor: "red",
              // overflow: 'hidden',
            }}
          >
            {props.Discount == "" || props.Discount == null
              ? "0%"
              : props.Discount}
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={{
            fontSize: hp(2),
            fontWeight: "600",
            color: Colors.black_text,
            marginTop: hp(1),
            // backgroundColor: 'plum',
          }}
        >
          {props.Price}
        </Text>
      </View>

      {/* ======= ICONS ========= */}
      <View
        style={{
          flex: 0.4,
          // backgroundColor: 'red',
        }}
      >
        {/* =========== Edit ========= */}
        <TouchableOpacity
          onPress={() => {
            props.EditAction();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(1),
            // backgroundColor: 'green',
          }}
        >
          <Ionicons name="heart-outline" size={28} color={Colors.theme} />
        </TouchableOpacity>

        {/* =========== UP ========= */}
        <TouchableOpacity
          onPress={() => {
            props.UpAction();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(1),
            // backgroundColor: 'green',
          }}
        >
          <Ionicons name="chevron-up" size={28} color={Colors.theme} />
        </TouchableOpacity>

        {/* =========== Promoted ========= */}
        <TouchableOpacity
          onPress={() => {
            props.PromoteAction();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(1),
            // backgroundColor: 'green',
          }}
        >
          <Ionicons
            name="checkmark-done-sharp"
            size={28}
            color={Colors.theme}
          />
        </TouchableOpacity>

        {/* =========== Remove ========= */}
        <TouchableOpacity
          onPress={() => {
            props.RemoveAction();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: 'green',
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
