import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import Notification_Tab from "../../../ReuseableComponents/Notification_Tab";
import OneSignal from "react-native-onesignal";

import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Notification_Screen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [CartDetailList, setCartDetailList] = useState([]);

  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId("68b7ac74-bbbb-4b9e-82f3-56e042ddeb62");

    // OneSignal.promptForPushNotificationsWithUserResponse();

    //   // OneSignal.setNotificationOpenedHandler(notification => {
    //   //   console.log("OneSignal: notification opened:", notification);
    //   // });

    notificationList_ApiCaller();
  }, [1]);

  function notificationList_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.NOTIFICATION_LIST,
      "",
      (resp) => {
        // console.log('\x1b[36m======== Notifications List ======== ', resp.data)
        setCartDetailList(resp.data);

        // console.log('\x1b[33m--------------- Set Notify Data ----------------', CartDetailList)
        setisLoading(false);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary_color,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Notifications"}
      />

      {isLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // marginTop: hp(30),
            // backgroundColor: 'yellow',
          }}
        >
          <ActivityIndicator
            size="large"
            color={Colors.theme}
            style={
              {
                // marginTop: hp(11),
                // alignSelf: 'center',
              }
            }
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CartDetailList}
            renderItem={({ item }) => {
              return (
                <Notification_Tab
                  NotificationTitle={item.notification_title}
                  NotificationMessage={item.notification_msg}
                  NotificationDate={item.notification_created_at}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
