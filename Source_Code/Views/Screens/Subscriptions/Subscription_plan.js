import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import { FONTS } from "../../../Assets/fonts/AppFonts";
import SubscriptionBox_Tab from "../../../ReuseableComponents/SubscriptionBox_Tab";
import SubscriptionBox_BenefitsTab from "../../../ReuseableComponents/SubscriptionBox_BenefitsTab";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Subscription_plan() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [BasicPlanLoading, setBasicPlanLoading] = useState(false);
  const [BusinessPlanLoading, setBusinessPlanLoading] = useState(false);
  const [BasicPlansList, setBasicPlansList] = useState([]);
  const [BasicPlansList_Keys, setBasicPlansList_Keys] = useState([]);
  const [BusinessPlansList, setBusinessPlansList] = useState([]);
  const [BusinessPlansList_Keys, setBusinessPlansList_Keys] = useState([]);

  useEffect(() => {
    changeNavigationBarColor(Colors.white);

    basicPlan_ApiCaller();
  }, [1]);

  function basicPlan_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.SUBSCRIPTION_LIST,
      "",
      (resp) => {
        console.log(
          "\x1b[33m---------Basic Plan LIST KEYS------->>>>>",
          resp.data?.basic[0].multi_subscription
        );

        // return
        setBasicPlansList(resp.data?.basic);
        setBasicPlansList_Keys(resp.data?.basic.multi_subscription);
        setBusinessPlanLoading(false);
        setisLoading(false);

        setBasicPlanLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function businessPlan_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.SUBSCRIPTION_LIST,
      "",
      (resp) => {
        console.log("\x1b[35m---------BUSINESS Plan------->>>>>", resp.data);

        // return
        setBusinessPlansList(resp.data?.business);
        setBusinessPlansList_Keys(resp.data.business[0].multi_subscription);
        setBasicPlanLoading(false);
        setisLoading(false);

        setBusinessPlanLoading(true);
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
        backgroundColor: Colors.white,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Subscription Plans"}
      />
      {/* ===========Top Subscription Button======= */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: wp(5),
          marginTop: hp(2),
          // backgroundColor: 'plum',
        }}
      >
        <Simple_Button
          OnAction={() => {
            basicPlan_ApiCaller();
          }}
          Width={wp(42)}
          Height={hp(6)}
          BtnTitle={"BASIC PLAN"}
        />

        <Simple_Button
          OnAction={() => {
            businessPlan_ApiCaller();
          }}
          Width={wp(42)}
          Height={hp(6)}
          BtnTitle={"BUSINESS PLAN"}
        />
      </View>

      {/* =============== BASIC PLAN VIEW ============ */}
      {isLoading && (
        <View
          style={{
            // flex: 1,
            height: hp(85),
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
      )}

      {BasicPlanLoading && (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'plum',
            marginTop: hp(2),
            marginHorizontal: wp(4),
          }}
        >
          <Text
            style={{
              fontSize: hp(2.7),
              color: Colors.black_text,
              fontWeight: "500",
              marginTop: hp(1),
              marginLeft: wp(3),
            }}
          >
            Basic Plans
          </Text>

          {/* ============ BLUE BOX ============ */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={BasicPlansList}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: wp(92),
                    paddingHorizontal: wp(5),
                    paddingTop: hp(1),
                    paddingBottom: hp(2.5),
                    // paddingVertical: hp(1.5),
                    marginTop: hp(2),
                    borderRadius: hp(1.5),
                    borderWidth: 2,
                    borderColor: Colors.planBoxColor,
                  }}
                >
                  <SubscriptionBox_Tab
                    Title={"Price:"}
                    Value={item.subs_price}
                  />
                  <SubscriptionBox_Tab
                    Title={"Quantity:"}
                    Value={item.subs_quantity}
                  />
                  <SubscriptionBox_Tab
                    Title={"Validity:"}
                    Value={item.subs_validity}
                  />

                  {item.multi_subscription.map((itemMap, index) => (
                    <View key={itemMap.multi_id}>
                      <SubscriptionBox_BenefitsTab Key={itemMap.multi_key} />
                    </View>
                  ))}

                  {/* <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={item.multi_subscription}
                                        renderItem={({ innerItem }) => {
                                            return (
                                                <SubscriptionBox_BenefitsTab
                                                    Key={innerItem.multi_key}
                                                // Key={"No. maximum of ads"}
                                                />
                                            )
                                        }} /> */}

                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: hp(3),
                    }}
                  >
                    <Simple_Button
                      OnAction={() => {}}
                      BGColor={Colors.planBoxColor}
                      TextColor={Colors.black_text}
                      Width={wp(82)}
                      Height={hp(5)}
                      BtnTitle={item.subs_name}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {BusinessPlanLoading && (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'plum',
            marginTop: hp(2),
            marginHorizontal: wp(4),
          }}
        >
          <Text
            style={{
              fontSize: hp(2.7),
              color: Colors.black_text,
              fontWeight: "500",
              marginTop: hp(1),
              marginLeft: wp(3),
            }}
          >
            Business Plans
          </Text>

          {/* ============ RED BOX ============ */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={BusinessPlansList}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: wp(92),
                    paddingHorizontal: wp(5),
                    paddingTop: hp(1),
                    paddingBottom: hp(2.5),
                    // paddingVertical: hp(1.5),
                    marginTop: hp(2),
                    borderRadius: hp(1.5),
                    borderWidth: 2,
                    borderColor: Colors.planBoxColor2,
                  }}
                >
                  <SubscriptionBox_Tab
                    Title={"Price:"}
                    Value={item.subs_price}
                  />
                  <SubscriptionBox_Tab
                    Title={"Quantity:"}
                    Value={item.subs_quantity}
                  />
                  <SubscriptionBox_Tab
                    Title={"Validity:"}
                    Value={item.subs_validity}
                  />

                  {item.multi_subscription.map((itemMap, index) => (
                    <View key={itemMap.multi_id}>
                      <SubscriptionBox_BenefitsTab Key={itemMap.multi_key} />
                    </View>
                  ))}

                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: hp(3),
                    }}
                  >
                    <Simple_Button
                      OnAction={() => {}}
                      BGColor={Colors.planBoxColor2}
                      TextColor={Colors.black_text}
                      Width={wp(82)}
                      Height={hp(5)}
                      BtnTitle={item.subs_name}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
