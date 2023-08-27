import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../Colors/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const textTab = (props) => {
  return (
    <View
      style={{
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
        {props.Statement}
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
        {props.Value}
      </Text>
    </View>
  );
};

function texttabforbid(props) {
  return (
    <View
      style={{
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
        {props.Statement}
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
        {props.Value}
      </Text>
    </View>
  );
}

// export default function Bid_NewView(props) {
//     return (
//         <View
//             style={{
//                 width: wp(90),
//                 backgroundColor: Colors.iconscolor,
//                 borderRadius: hp(1),
//                 paddingVertical: hp(1),
//                 alignSelf: 'center',
//                 marginTop: hp(2),
//                 paddingHorizontal: wp(3)
//             }}
//         >
//             {/* <View style={{        //---BID ID
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 // backgroundColor: 'plum',
//                 // marginHorizontal: wp(3),
//                 marginBottom: hp(0.2),
//             }}>
//                 <Text
//                     style={{
//                         fontSize: hp(2),
//                         color: Colors.black_text,
//                         // backgroundColor: 'blue',
//                         flex: 2,
//                         marginRight: wp(1),
//                     }}>
//                     Bid ID
//                 </Text>

//                 <Text
//                     style={{
//                         fontSize: hp(2),
//                         color: Colors.black_text,
//                         // backgroundColor: 'red',
//                         flex: 2,
//                         marginLeft: wp(1),
//                     }}>
//                     4
//                 </Text>
//             </View> */}

//             {/* <textTab
//                 Statement={props.Title}
//                 Value={props.Description}
//             /> */}

//         </View>
//     )
// }

export default function Bid_NewView(props) {
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
    </View>
  );
}
