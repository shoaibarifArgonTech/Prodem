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
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import SubscriptionBox_Tab from "../../../ReuseableComponents/SubscriptionBox_Tab";
import SubscriptionBox_BenefitsTab from "../../../ReuseableComponents/SubscriptionBox_BenefitsTab";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Active_Plan() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [ISdata, setISdata] = useState(false);
  const [credits, setCredits] = useState("");
  const [activeSubscribe, setActiveSubscribe] = useState("");
  const [SubscriptionName, setSubscriptionName] = useState("");
  const [MonthBonus, setMonthBonus] = useState("");
  const [Validity, setValidity] = useState("");
  const [PlanType, setPlanType] = useState("");
  const [PlansList, setPlanList] = useState([]);

  useEffect(() => {
    changeNavigationBarColor(Colors.white);

    ActivePlan_ApiCaller();
  }, [1]);

  function ActivePlan_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.ACTIVE_PLANS_SUBSCRIPTION,
      "",
      (resp) => {
        // console.log("\x1b[33m---------Active Plan------->>>>>", resp.data?.basic[0].multi_subscription)
        // PlansList.push(resp.data)
        // console.log("\x1b[33m---------Active.------->>>>>", PlansList[0])

        // if (resp.data?.subscriptionName !== "") {
        setSubscriptionName(resp.data?.subscriptionName);
        // setBasicPlansList(resp.data)
        // setBasicPlansList_Keys(resp.data?.basic.multi_subscription)
        // setBusinessPlanLoading(false)
        setisLoading(false);
        return;
        // }
        // else {
        //     setISdata(true)
        // }

        // setBasicPlanLoading(true)
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
        Title={"Active Plan"}
      />

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

      {!isLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={PlansList}
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
                    borderColor: Colors.theme,
                  }}
                >
                  <SubscriptionBox_Tab
                    Title={"Price:"}
                    Value={""}
                    // Value={item.subs_price}
                  />
                  <SubscriptionBox_Tab
                    Title={"Quantity:"}
                    // Value={item.subs_quantity}
                    Value={""}
                  />
                  <SubscriptionBox_Tab
                    Title={"Validity:"}
                    Value={""}
                    // Value={item.subs_validity}
                  />

                  {/* {item.multi_subscription.map((itemMap, index) => (
                                    <View key={itemMap.multi_id}>
                                        <SubscriptionBox_BenefitsTab
                                            Key={itemMap.multi_key}
                                        />
                                    </View>
                                ))
                                } */}

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

                  {/* <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: hp(3),
                                    }}>
                                    <Simple_Button
                                        OnAction={() => { }}
                                        BGColor={Colors.planBoxColor}
                                        TextColor={Colors.black_text}
                                        Width={wp(82)}
                                        Height={hp(5)}
                                        BtnTitle={item.subs_name}
                                    />
                                </View> */}
                </View>
              );
            }}
          />
        </View>
      )}

      {ISdata && !isLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              color: Colors.theme,
              textAlign: "center",
            }}
          >
            No Active Plan
          </Text>
        </View>
      )}
    </View>
  );
}
