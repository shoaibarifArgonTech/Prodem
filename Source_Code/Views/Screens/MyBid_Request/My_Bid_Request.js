import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import Bid_ConfirmView from "../../../ReuseableComponents/Bid_ConfirmView";
import Bid_NewView from "../../../ReuseableComponents/Bid_NewView";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";
// import axios from 'axios';

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function My_Bid_Request() {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [ActiveBidLoading, setActiveBidLoading] = useState(false);
  const [InactiveBidLoading, setInactiveBidLoading] = useState(false);
  const [LostBidLoading, setLostBidLoading] = useState(false);

  const [ActiveBid_List, setActiveBid_List] = useState([]);
  const [InactiveBid_List, setInactiveBid_List] = useState([]);
  const [LostBid_List, setLostBid_List] = useState([]);

  const [list, setList] = useState([
    {
      BoxTitle: "Active",
    },
    {
      BoxTitle: "Inactive",
    },
    {
      BoxTitle: "Lost",
    },
    {
      BoxTitle: "Cancelled",
    },
    {
      BoxTitle: "Given",
    },
    {
      BoxTitle: "Received",
    },
  ]);

  useEffect(() => {
    // prefManager.getUserSessionData((data) => {
    //     console.log("====NOtificationScreen GetData====", JSON.stringify(data))

    //     // var Token = data.data?.token
    //     setToken(data.data?.token)
    //     // console.log("============= Token State =========", token)
    // })

    ActiveBid_ApiCaller();
  }, [1]);

  function ActiveBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_ACTIVE_RECEIVED,
      "",
      (resp) => {
        // console.log('---------Active Bid ------- ', resp.data.bids)
        // return
        setActiveBid_List(resp.data.bids);
        // console.log("=============>> ", ActiveBid_List)
        setisLoading(false);
        setInactiveBidLoading(false);
        setActiveBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function InActiveBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_INACTIVE_RECEIVED,
      "",
      (resp) => {
        // console.log(" ======== ========= InActive Bid ========== ", resp.data.bids)
        // return
        setInactiveBid_List(resp.data.bids);
        // console.log("=============inAct===========>>>> ", InactiveBid_List)
        setActiveBidLoading(false);
        setisLoading(false);
        setInactiveBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function LostBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_LOST_RECEIVED,
      "",
      (resp) => {
        // console.log(" ======== ========= InActive Bid ========== ", resp.data.bids)
        // return
        // setInactiveBid_List(resp.data.bids)
        setLostBid_List(resp.data.bids);
        // console.log("=============Lost===========>>>> ", LostBid_List)
        setActiveBidLoading(false);
        setInactiveBidLoading(false);
        setisLoading(false);

        setLostBidLoading(true);
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
        // backgroundColor: Colors.gray2,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"My Bid Request"}
      />

      {/* ========= Top Tab FLatlist =========== */}
      <View
        style={{
          justifyContent: "space-between",
          marginTop: hp(3),
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={list}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedIndex(index);
                  if (item.BoxTitle == "Active") {
                    ActiveBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Inactive") {
                    InActiveBid_ApiCaller();
                    // NewBid_ApiCaller()
                    return;
                  }
                  if (item.BoxTitle == "Lost") {
                    LostBid_ApiCaller();
                    // DeliverBid_ApiCaller()
                    return;
                  }
                }}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: wp(8),
                  paddingVertical: hp(1.3),
                  borderBottomWidth: 1.5,
                  borderBottomColor:
                    index == selectedIndex ? Colors.theme : Colors.transparent,
                  marginHorizontal: wp(1),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(2.3),
                    fontWeight: "500",
                    borderBottomWidth: 1,
                    borderBottomColor:
                      index == selectedIndex ? Colors.theme : Colors.black,
                    color:
                      index == selectedIndex ? Colors.theme : Colors.black_text,
                  }}
                >
                  {item.BoxTitle}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

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

      {ActiveBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            marginHorizontal: wp(4),
            paddingBottom: hp(1),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ActiveBid_List}
            renderItem={({ item }) => {
              return (
                <Bid_ConfirmView
                  BidID={item.partoffer_bid_id}
                  UserID={item.partoffer_bid_user_id}
                  BidTitle={item.partoffer_bid_title_text}
                  BidRemark={item.partoffer_bid_private_remark}
                  BidPrice={item.partoffer_bid_price}
                  BidCreatedDate={item.partoffer_bid_created_at}
                  PartRequestTitle={item.partrequest_title}
                  PartRequestVehicle={item.partrequest_vehicle}
                  PartRequestYear={item.partrequest_year}
                  PartRequestVeriant={item.partrequest_varient}
                  PartRequestEngine={item.partrequest_engines}
                  PartRequestDeliveryLocation={
                    item.partrequest_delivery_location
                  }
                  PartRequestCreatedDate={item.partrequest_created_at}
                  PartRequestCompanyName={item.p_user_company_name}
                  PartRequestCompanyTrade={item.company_trade}
                />
              );
            }}
          />
        </View>
      )}

      {InactiveBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            marginHorizontal: wp(4),
            paddingBottom: hp(1),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={InactiveBid_List}
            renderItem={({ item }) => {
              return (
                <Bid_NewView
                  BidID={item.partoffer_bid_id}
                  UserID={item.partoffer_bid_user_id}
                  BidTitle={item.partoffer_bid_title_text}
                  // BidRemark={item.partoffer_bid_private_remark}
                  BidPrice={item.partoffer_bid_price}
                  BidCreatedDate={item.partoffer_bid_created_at}
                  PartRequestTitle={item.partrequest_title}
                  PartRequestVehicle={item.partrequest_vehicle}
                  // PartRequestYear={item.partrequest_year}
                  PartRequestVeriant={item.partrequest_varient}
                  PartRequestEngine={item.partrequest_engines}
                  PartRequestDeliveryLocation={
                    item.partrequest_delivery_location
                  }
                />
              );
            }}
          />
        </View>
      )}

      {LostBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            marginHorizontal: wp(4),
            paddingBottom: hp(1),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={LostBid_List}
            renderItem={({ item }) => {
              return (
                <Bid_ConfirmView
                  BidID={item.partoffer_bid_id}
                  UserID={item.partoffer_bid_user_id}
                  BidTitle={item.partoffer_bid_title_text}
                  BidRemark={item.partoffer_bid_private_remark}
                  BidPrice={item.partoffer_bid_price}
                  BidCreatedDate={item.partoffer_bid_created_at}
                  PartRequestTitle={item.partrequest_title}
                  PartRequestVehicle={item.partrequest_vehicle}
                  PartRequestYear={item.partrequest_year}
                  PartRequestVeriant={item.partrequest_varient}
                  PartRequestEngine={item.partrequest_engines}
                  PartRequestDeliveryLocation={
                    item.partrequest_delivery_location
                  }
                  PartRequestCreatedDate={item.partrequest_created_at}
                  PartRequestCompanyName={item.p_user_company_name}
                  PartRequestCompanyTrade={item.company_trade}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
