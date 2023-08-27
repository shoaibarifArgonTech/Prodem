import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import { FONTS } from "../../../Assets/fonts/AppFonts";
import Horizontal_NoBorder_Flatlist from "../../../ReuseableComponents/Horizontal_NoBorder_Flatlist";
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

export default function Winning_Bids() {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);

  const [NewBidLoading, setNewBidLoading] = useState(false);
  const [ConfirmBidLoading, setConfirmBidLoading] = useState(false);
  const [DeliverBidLoading, setDeliverBidLoading] = useState(false);
  const [CompleteBidLoading, setCompleteBidLoading] = useState(false);
  const [CancleBidLoading, setCancleBidLoading] = useState(false);
  const [AllBidLoading, setAllBidLoading] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [ConfirmBid_List, setConfirmBid_List] = useState([]);
  const [NewBid_List, setNewBid_List] = useState([]);
  const [DeliverBid_List, setDeliverBid_List] = useState([]);
  const [CompleteBid_List, setCompleteBid_List] = useState([]);
  const [CancleBid_List, setCancleBid_List] = useState([]);
  const [AllBid_List, setAllBid_List] = useState([]);
  const [list, setList] = useState([
    {
      BoxTitle: "New",
      // Action: NewBid_ApiCaller(),
    },
    {
      BoxTitle: "Confirm",
      // Action: ConfirmBid_ApiCaller(),
    },
    {
      BoxTitle: "Delivered",
    },
    {
      BoxTitle: "Completed",
    },
    {
      BoxTitle: "Cancel",
    },
    {
      BoxTitle: "All",
    },
  ]);

  useEffect(() => {
    // prefManager.getUserSessionData((data) => {
    //     console.log("====NOtificationScreen GetData====", JSON.stringify(data))

    //     // var Token = data.data?.token
    //     setToken(data.data?.token)
    //     // console.log("============= Token State =========", token)
    // })

    // alert('heloo')

    NewBid_ApiCaller();
  }, [1]);

  function NewBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_NEW,
      "",
      (resp) => {
        console.log("------------NEW BID--------->>>>>>>", resp.data);
        // return
        // setCartDetailList(resp.data?.items)
        setNewBid_List(resp.data?.bids);
        setisLoading(false);
        setConfirmBidLoading(false);
        setDeliverBidLoading(false);
        setCompleteBidLoading(false);
        setCancleBidLoading(false);
        setAllBidLoading(false);

        setNewBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function ConfirmBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_CONFIRM,
      "",
      (resp) => {
        console.log("------------CONFIRM BID--------->>>>>>>", resp.data?.bids);
        // return
        setConfirmBid_List(resp.data?.bids);

        setNewBidLoading(false);
        setDeliverBidLoading(false);
        setCompleteBidLoading(false);
        setCancleBidLoading(false);
        setAllBidLoading(false);
        setisLoading(false);

        setConfirmBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function DeliverBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_DELIVERED,
      "",
      (resp) => {
        console.log("------------Delivered BID--------->>>>>>>", resp.data);
        // return
        // setCartDetailList(resp.data?.items)
        setDeliverBid_List(resp.data?.bids);
        setNewBidLoading(false);
        setConfirmBidLoading(false);
        setCompleteBidLoading(false);
        setCancleBidLoading(false);
        setAllBidLoading(false);
        setisLoading(false);

        setDeliverBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function CompleteBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_COMPLETED,
      "",
      (resp) => {
        console.log("------------Completed BID--------->>>>>>>", resp.data);
        // return
        setCompleteBid_List(resp.data?.bids);

        setNewBidLoading(false);
        setConfirmBidLoading(false);
        setDeliverBidLoading(false);
        setCancleBidLoading(false);
        setAllBidLoading(false);
        setisLoading(false);

        setCompleteBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function CancelBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_CANCEL,
      "",
      (resp) => {
        console.log("------------CANCEL BID--------->>>>>>>", resp.data);
        // return
        setCancleBid_List(resp.data?.bids);

        setisLoading(false);
        setNewBidLoading(false);
        setConfirmBidLoading(false);
        setDeliverBidLoading(false);
        setCompleteBidLoading(false);
        setAllBidLoading(false);
        setCancleBidLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function AllBid_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.BID_ALL,
      "",
      (resp) => {
        console.log("------------ALL BIDS--------->>>>>>>", resp.data);
        // return
        setAllBid_List(resp.data?.bids);

        setisLoading(false);
        setNewBidLoading(false);
        setConfirmBidLoading(false);
        setDeliverBidLoading(false);
        setCompleteBidLoading(false);
        setCancleBidLoading(false);
        setAllBidLoading(true);
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
        Title={"Winning Bids"}
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
                  if (item.BoxTitle == "Confirm") {
                    ConfirmBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "New") {
                    NewBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Delivered") {
                    DeliverBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Completed") {
                    CompleteBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Cancel") {
                    CancelBid_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "All") {
                    AllBid_ApiCaller();
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

      {NewBidLoading && (
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
            data={NewBid_List}
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

      {ConfirmBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'red',
            marginTop: hp(1),
            marginHorizontal: wp(4),
            paddingBottom: hp(1),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ConfirmBid_List}
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

      {DeliverBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            paddingBottom: hp(1),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DeliverBid_List}
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

      {CompleteBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            paddingBottom: hp(1),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CompleteBid_List}
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

      {CancleBidLoading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: 'center',
            // backgroundColor: Colors.white,
            // backgroundColor: 'skyblue',
            marginTop: hp(1),
            paddingBottom: hp(1),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={CancleBid_List}
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

      {AllBidLoading && (
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
            data={AllBid_List}
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
