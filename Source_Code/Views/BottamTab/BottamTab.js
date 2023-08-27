import React from "react";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../Colors/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// -----------------------
import HomeScreen from "../Screens/Home_Screens/HomeScreen";
import {
  useRoute,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import AddParts from "../Screens/Add_Parts/AddParts";
import Cart_Screen from "../Screens/Cart/Cart_Screen";
import Ask_OfferScreen from "../Screens/Ask_Offers/Ask_OfferScreen";
import Account_Screen from "../Screens/My_Account/Account_Screen";

const GetRoutes = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log("========&&&&&&&&& ", routeName);
  if (routeName?.includes("ShortVideos")) {
    return "none";
  }
  return "flex";
};
export default function BottamTab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: hp(8),
          backgroundColor: Colors.bottamTabColor,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: Colors.white,
                  top: -5,
                  fontWeight: "700",
                  // fontFamily: "JosefinSans-Medium",
                  // backgroundColor: 'plum',
                }}
              >
                Home
              </Text>
            );
          },
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <View
                    style={{
                      width: hp(7.5),
                      height: hp(7.5),
                      backgroundColor: Colors.bottamTabColor,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      top: hp(-1),
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/BottomTab/home.png")}
                      style={{
                        width: hp(4),
                        height: hp(4),
                        tintColor: Colors.theme,
                        // backgroundColor: 'yellow',
                      }}
                    ></Image>
                  </View>
                ) : (
                  <Image
                    source={require("../../Assets/Images/BottomTab/home.png")}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: Colors.theme,
                      // backgroundColor: 'yellow',
                    }}
                  ></Image>
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="AddParts"
        component={AddParts}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: Colors.white,
                  top: -5,
                  fontWeight: "700",
                  // fontFamily: "JosefinSans-Medium",
                  // backgroundColor: 'plum',
                }}
              >
                Add Part
              </Text>
            );
          },
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <View
                    style={{
                      width: hp(7.5),
                      height: hp(7.5),
                      backgroundColor: Colors.bottamTabColor,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      top: hp(-1),
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/BottomTab/add.png")}
                      style={{
                        width: hp(4),
                        height: hp(4),
                        tintColor: Colors.theme,
                        // backgroundColor: 'yellow',
                      }}
                    ></Image>
                  </View>
                ) : (
                  <Image
                    source={require("../../Assets/Images/BottomTab/add.png")}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: Colors.theme,
                      // backgroundColor: 'yellow',
                    }}
                  ></Image>
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart_Screen"
        component={Cart_Screen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: Colors.white,
                  top: -5,
                  fontWeight: "700",
                  // fontFamily: "JosefinSans-Medium",
                  // backgroundColor: 'plum',
                }}
              >
                Cart
              </Text>
            );
          },
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <View
                    style={{
                      width: hp(7.5),
                      height: hp(7.5),
                      backgroundColor: Colors.bottamTabColor,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      top: hp(-1),
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/BottomTab/cart.png")}
                      style={{
                        width: hp(4),
                        height: hp(4),
                        tintColor: Colors.theme,
                        // backgroundColor: 'yellow',
                      }}
                    ></Image>
                  </View>
                ) : (
                  <Image
                    source={require("../../Assets/Images/BottomTab/cart.png")}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: Colors.theme,
                      // backgroundColor: 'yellow',
                    }}
                  ></Image>
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="Ask_OfferScreen"
        component={Ask_OfferScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: Colors.white,
                  top: -5,
                  fontWeight: "700",
                  // fontFamily: "JosefinSans-Medium",
                  // backgroundColor: 'plum',
                }}
              >
                Ask Offer
              </Text>
            );
          },
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <View
                    style={{
                      width: hp(7.5),
                      height: hp(7.5),
                      backgroundColor: Colors.bottamTabColor,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      top: hp(-1),
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/BottomTab/offer.png")}
                      style={{
                        width: hp(4),
                        height: hp(4),
                        tintColor: Colors.theme,
                        // backgroundColor: 'yellow',
                      }}
                    ></Image>
                  </View>
                ) : (
                  <Image
                    source={require("../../Assets/Images/BottomTab/offer.png")}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: Colors.theme,
                      // backgroundColor: 'yellow',
                    }}
                  ></Image>
                )}
              </>
            );
          },
        }}
      />

      <Tab.Screen
        name="Account_Screen"
        component={Account_Screen}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  fontSize: hp(1.7),
                  color: Colors.white,
                  top: -5,
                  fontWeight: "700",
                  // fontFamily: "JosefinSans-Medium",
                  // backgroundColor: 'plum',
                }}
              >
                Account
              </Text>
            );
          },
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarActiveTintColor: Colors.primary_color,
          // tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => {
            return (
              <>
                {focused ? (
                  <View
                    style={{
                      width: hp(7.5),
                      height: hp(7.5),
                      backgroundColor: Colors.bottamTabColor,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      top: hp(-1),
                    }}
                  >
                    <Image
                      source={require("../../Assets/Images/BottomTab/account.png")}
                      style={{
                        width: hp(4),
                        height: hp(4),
                        tintColor: Colors.theme,
                        // backgroundColor: 'yellow',
                      }}
                    ></Image>
                  </View>
                ) : (
                  <Image
                    source={require("../../Assets/Images/BottomTab/account.png")}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      tintColor: Colors.theme,
                      // backgroundColor: 'yellow',
                    }}
                  ></Image>
                )}
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
