import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";

export default function Bid_ConfirmView(props) {
  return (
    <View
      style={{
        width: wp(90),
        backgroundColor: Colors.iconscolor,
        borderRadius: hp(1),
        paddingVertical: hp(1),
        alignSelf: "center",
        marginTop: hp(2),
        paddingHorizontal: wp(3),
      }}
    >
      <View
        style={{
          //---BID ID
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
          marginBottom: hp(0.2),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Bid ID
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.BidID}
        </Text>
      </View>

      <View
        style={{
          //---User ID
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.2),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          User ID
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.UserID}
        </Text>
      </View>

      <View
        style={{
          //---BID TITLE
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Bid Title
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.BidTitle}
        </Text>
      </View>

      <View
        style={{
          //---BID REMARK
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Bid Remark
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.BidRemark}
        </Text>
      </View>

      <View
        style={{
          //---BID Price
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Bid Price
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.BidPrice}
        </Text>
      </View>

      <View
        style={{
          //---BID CREATED AT
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Bid Created at
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.BidCreatedDate}
        </Text>
      </View>

      <View
        style={{
          //---PART REQUEST TITLE
          flexDirection: "row",
          marginBottom: hp(0.3),
          alignItems: "center",
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Title
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestTitle}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ VEHCLE
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Vehicle
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestVehicle}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ YEAR
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Year
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestYear}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ VERIANT
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Veriant
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestVeriant}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ ENGINE
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Engine
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestEngine}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ DELIVERY LOCATION
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Delivery Location
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestDeliveryLocation}
        </Text>
      </View>

      <View
        style={{
          //---PART REQ CREATED
          flexDirection: "row",
          marginBottom: hp(0.3),
          alignItems: "center",
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Part Request Created at
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestCreatedDate}
        </Text>
      </View>

      <View
        style={{
          //---Company Name
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(0.3),
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Company Name
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestCompanyName}
        </Text>
      </View>

      <View
        style={{
          //---Company Trade
          flexDirection: "row",
          // marginBottom: hp(0.3),
          alignItems: "center",
          // backgroundColor: 'plum',
          // marginHorizontal: wp(3),
        }}
      >
        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'blue',
            flex: 2,
            marginRight: wp(1),
          }}
        >
          Company Trade
        </Text>

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.black_text,
            // backgroundColor: 'red',
            flex: 2,
            marginLeft: wp(1),
          }}
        >
          {props.PartRequestCompanyTrade}
        </Text>
      </View>
    </View>
  );
}
