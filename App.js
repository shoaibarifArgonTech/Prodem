import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OneSignal from "react-native-onesignal";
// --------------------SCREENS-----------------------
import HomeScreen from "./Source_Code/Views/Screens/Home_Screens/HomeScreen";
import BottamTab from "./Source_Code/Views/BottamTab/BottamTab";
import LoginScreen from "./Source_Code/Views/Screens/Auth_Screens/LoginScreen";
import Signup_Screen from "./Source_Code/Views/Screens/Auth_Screens/Signup_Screen";
import MyPart_Screen from "./Source_Code/Views/Screens/My_Parts/MyPart_Screen";
import Order_PlacedScreen from "./Source_Code/Views/Screens/Order_Placed/Order_PlacedScreen";
import Notification_Screen from "./Source_Code/Views/Screens/Notifications/Notification_Screen";
import Wishlist_Screen from "./Source_Code/Views/Screens/WishList/Wishlist_Screen";
import PartsOffer_Screen from "./Source_Code/Views/Screens/Parts_Offer/PartsOffer_Screen";
import Order_ReceivedScreen from "./Source_Code/Views/Screens/Order_Received/Order_ReceivedScreen";
import UpdateProfile_Screen from "./Source_Code/Views/Screens/Update_Profile/UpdateProfile_Screen";
import Subscription_plan from "./Source_Code/Views/Screens/Subscriptions/Subscription_plan";
import Rating_Screen from "./Source_Code/Views/Screens/Ratings/Rating_Screen";
import MyPart_Request from "./Source_Code/Views/Screens/My_Parts/MyPart_Request";
import My_Bid_Request from "./Source_Code/Views/Screens/MyBid_Request/My_Bid_Request";
import Winning_Bids from "./Source_Code/Views/Screens/Winning_Bids/Winning_Bids";
import Account_ExistScreen from "./Source_Code/Views/Screens/Auth_Screens/Account_ExistScreen";
import Register_User from "./Source_Code/Views/Screens/Auth_Screens/Register_User";
import SplashScreen from "./Source_Code/Views/Screens/Welcome_Screen/SplashScreen";
import ProfileDetails from "./Source_Code/Views/Screens/Profile/ProfileDetails";
import Edit_Profile from "./Source_Code/Views/Screens/Profile/Edit_Profile";
import ProductDetail_Screen from "./Source_Code/Views/Screens/Product_Screens/ProductDetail_Screen";
import ProductList_Screen from "./Source_Code/Views/Screens/Product_Screens/ProductList_Screen";
import ForgetPassword from "./Source_Code/Views/Screens/Auth_Screens/ForgetPassword";
import Verification from "./Source_Code/Views/Screens/Auth_Screens/Verification";
import SetNewPassword from "./Source_Code/Views/Screens/Auth_Screens/SetNewPassword";
import NewPasswordDone from "./Source_Code/Views/Screens/Auth_Screens/NewPasswordDone";
import TestScreen from "./Source_Code/Views/Screens/TestScreen/TestScreen";
import Active_Plan from "./Source_Code/Views/Screens/Subscriptions/Active_Plan";
import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Colors } from "./Source_Code/Colors/Colors";
// import Splash_Screen from './Source_Code/Views/Screens/Welcome_Screen/Splash_Screen';

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    OneSignal.setAppId("68b7ac74-bbbb-4b9e-82f3-56e042ddeb62");
    // OneSignal.init('68b7ac74-bbbb-4b9e-82f3-56e042ddeb62', { kOSSettingsKeyAutoPrompt: true });

    // OneSignal.promptForPushNotificationsWithUserResponse();
    //   // OneSignal.setNotificationOpenedHandler(notification => {
    //   //   console.log("OneSignal: notification opened:", notification);
    //   // });
  }, []);

  return (
    <>
      {Platform.OS == "ios" && <SafeAreaView style={styles.topSafeArea} />}
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            {/* <Stack.Screen name="TestScreen" component={TestScreen} /> */}

            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen
              name="Account_ExistScreen"
              component={Account_ExistScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Register_User" component={Register_User} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
            <Stack.Screen name="NewPasswordDone" component={NewPasswordDone} />

            <Stack.Screen name="BottamTab" component={BottamTab} />
            <Stack.Screen
              name="ProductList_Screen"
              component={ProductList_Screen}
            />
            <Stack.Screen
              name="ProductDetail_Screen"
              component={ProductDetail_Screen}
            />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen name="Edit_Profile" component={Edit_Profile} />
            <Stack.Screen
              name="UpdateProfile_Screen"
              component={UpdateProfile_Screen}
            />
            <Stack.Screen name="MyPart_Screen" component={MyPart_Screen} />
            <Stack.Screen
              name="Order_ReceivedScreen"
              component={Order_ReceivedScreen}
            />
            <Stack.Screen
              name="Order_PlacedScreen"
              component={Order_PlacedScreen}
            />
            <Stack.Screen
              name="Notification_Screen"
              component={Notification_Screen}
            />
            <Stack.Screen name="Wishlist_Screen" component={Wishlist_Screen} />
            <Stack.Screen
              name="PartsOffer_Screen"
              component={PartsOffer_Screen}
            />
            <Stack.Screen
              name="Subscription_plan"
              component={Subscription_plan}
            />
            {/* <Stack.Screen name="Active_Plan" component={Active_Plan} /> */}

            <Stack.Screen name="Rating_Screen" component={Rating_Screen} />
            <Stack.Screen name="MyPart_Request" component={MyPart_Request} />
            <Stack.Screen name="My_Bid_Request" component={My_Bid_Request} />
            <Stack.Screen name="Winning_Bids" component={Winning_Bids} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: Colors.theme,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
