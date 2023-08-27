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
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import { FONTS } from "../../../Assets/fonts/AppFonts";
import Horizontal_Flatlist from "../../../ReuseableComponents/Horizontal_Flatlist";
import StarRating from "react-native-star-rating-widget";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";
import moment from "moment";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

// const digitImages = [
//     require('../../../Assets/Images/star.png'),
// ]
// const digitsArray = Array.from(String(3), (char) => parseInt(char));

const getImageSource = (num) => {
  return require("../../../Assets/Images/star.png");
};

export default function Rating_Screen() {
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const [pendingRate, setPendingRate] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);

  const [GivenRate, setGivenRate] = useState([]);
  const [GivenLoading, setGivenLoading] = useState(false);

  const [ReceivedRate, setReceivedRate] = useState([]);
  const [ReceivedLoading, setReceivedLoading] = useState(false);

  const [StarPic, setStarPic] = useState(4);

  const [list, setList] = useState([
    {
      BoxTitle: "Pending",
    },
    {
      BoxTitle: "Given",
    },
    {
      BoxTitle: "Received",
    },
  ]);

  useEffect(() => {
    changeNavigationBarColor(Colors.white);

    pendingRating_ApiCaller();
  }, [1]);

  function pendingRating_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.RATING_PENDING,
      "",
      (resp) => {
        console.log("\x1b[35m-------Pending RATING------>>>>>", resp.data);

        // return
        setPendingRate(resp.data?.rating_pending);
        setGivenLoading(false);
        setReceivedLoading(false);
        setisLoading(false);

        setPendingLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function receivedRating_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.RATING_RECEIVED,
      "",
      (resp) => {
        console.log(
          "\x1b[33m-------RECEIVED RATING------>>>>>",
          resp.data?.ratingReceived[0].rating_star
        );

        // return
        setReceivedRate(resp.data.ratingReceived);
        // setStarPic(resp.data?.ratingReceived[0].rating_star)
        setGivenLoading(false);
        setPendingLoading(false);
        setisLoading(false);

        setReceivedLoading(true);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function givenRating_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.RATING_GIVEN,
      "",
      (resp) => {
        console.log(
          "-------GIVEN RATING------>>>>>",
          resp.data?.ratingReceived
        );

        // return
        setGivenRate(resp.data.ratingReceived);
        // setStarPic(resp.data?.ratingReceived[0].rating_star)
        setReceivedLoading(false);
        setPendingLoading(false);
        setisLoading(false);

        setGivenLoading(true);
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
        backgroundColor: Colors.white_BG,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Ratings"}
      />

      {/* ======== TOP HORIZONTAL FLATLIST ============= */}
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
                  if (item.BoxTitle == "Pending") {
                    pendingRating_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Received") {
                    receivedRating_ApiCaller();
                    return;
                  }
                  if (item.BoxTitle == "Given") {
                    givenRating_ApiCaller();
                    return;
                  }
                }}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  // paddingHorizontal: index == this.state.selectedIndex ? wp(5) : 0,
                  // paddingVertical: index == this.state.selectedIndex ? hp(1) : 0,
                  // borderRadius: index == this.state.selectedIndex ? 30 : 0,
                  paddingHorizontal: wp(8),
                  paddingVertical: hp(1.3),
                  borderRadius: hp(1),
                  borderColor:
                    index == selectedIndex ? Colors.transparent : Colors.theme,
                  borderWidth: 1.5,
                  backgroundColor:
                    index == selectedIndex ? Colors.theme : "transparent",
                  marginHorizontal: wp(1),
                }}
              >
                <Text
                  style={{
                    fontSize: hp(2.3),
                    fontWeight: "500",
                    borderBottomWidth: 1,
                    borderBottomColor:
                      index == selectedIndex ? Colors.white : Colors.black,
                    color:
                      index == selectedIndex
                        ? Colors.white_text
                        : Colors.black_text,
                  }}
                >
                  {item.BoxTitle}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ==============LOADING================ */}
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

      {/* =================== Pending Flatlist ====================== */}
      {pendingLoading && (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'plum',
            marginTop: hp(2),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pendingRate}
            renderItem={({ item, index }) => {
              return (
                <View
                  // activeOpacity={0.5}
                  style={{
                    paddingVertical: hp(1.5),
                    paddingHorizontal: wp(2),
                    borderRadius: hp(1.5),
                    backgroundColor: Colors.secondary_color,
                    marginBottom: hp(1),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 0.8,
                        color: Colors.black_text,
                        // backgroundColor: 'red',
                      }}
                    >
                      Order No:
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 2,
                        color: Colors.black_text,
                        // backgroundColor: 'blue',
                      }}
                    >
                      {item.order_no}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: hp(2.2),
                      color: Colors.gray1,
                      marginTop: hp(0.5),
                    }}
                  >
                    {item.user_name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      // numberOfLines={2}
                      style={{
                        fontSize: hp(2.2),
                        color: Colors.black_text,
                      }}
                    >
                      {item.for_the}
                    </Text>

                    <Text
                      // numberOfLines={2}
                      style={{
                        fontSize: hp(2.2),
                        color: Colors.gray1,
                      }}
                    >
                      {/* {item.date} */}
                      {moment(item.date).format("MMMM D, YYYY")}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* ============ RECEIVED FLATLIST =============== */}
      {ReceivedLoading && (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'plum',
            marginTop: hp(2),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ReceivedRate}
            renderItem={({ item, index }) => {
              return (
                <View
                  // activeOpacity={0.5}
                  style={{
                    paddingVertical: hp(1.5),
                    paddingHorizontal: wp(2),
                    borderRadius: hp(1.5),
                    backgroundColor: Colors.secondary_color,
                    marginBottom: hp(1),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 0.8,
                        color: Colors.black_text,
                        // backgroundColor: 'red',
                      }}
                    >
                      Order No:
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 2,
                        color: Colors.black_text,
                        // backgroundColor: 'blue',
                      }}
                    >
                      {item.order_no}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: hp(2.2),
                      color: Colors.gray1,
                    }}
                  >
                    {item.rating_desc}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                        // data={[1, 2, 3, 4, 5]}
                                        data={StarPic}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <>
                                                <Image
                                                    source={require('../../../Assets/Images/star.png')}
                                                    style={{
                                                        width: hp(3),
                                                        height: hp(3),
                                                        // marginHorizontal: wp(2),
                                                        // backgroundColor: 'red',
                                                    }}
                                                />
                                                
                                            </>
                                        )}
                                    /> */}

                    <StarRating
                      rating={StarPic}
                      onChange={setStarPic}
                      // onChange={StarPic}
                      maxStars={StarPic}
                      starSize={25}
                      enableHalfStar={false}
                      enableSwiping={false}
                      style={
                        {
                          // backgroundColor: 'red',
                          // marginLeft: wp(-1),
                        }
                      }
                    />

                    <Text
                      // numberOfLines={2}
                      style={{
                        fontSize: hp(2.2),
                        color: Colors.gray1,
                        // backgroundColor: 'green',
                      }}
                    >
                      {moment(item.date).format("MMMM D, YYYY")}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* ============ GIVEN FLATLIST =============== */}
      {GivenLoading && (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'plum',
            marginTop: hp(2),
            marginHorizontal: wp(4),
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={GivenRate}
            renderItem={({ item, index }) => {
              return (
                <View
                  // activeOpacity={0.5}
                  style={{
                    paddingVertical: hp(1.5),
                    paddingHorizontal: wp(2),
                    borderRadius: hp(1.5),
                    backgroundColor: Colors.secondary_color,
                    marginBottom: hp(1),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 0.8,
                        color: Colors.black_text,
                        // backgroundColor: 'red',
                      }}
                    >
                      Order No:
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.5),
                        fontWeight: "600",
                        flex: 2,
                        color: Colors.black_text,
                        // backgroundColor: 'blue',
                      }}
                    >
                      {item.order_no}
                    </Text>
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: hp(2.2),
                      color: Colors.gray1,
                    }}
                  >
                    {item.rating_desc}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: hp(1),
                      // backgroundColor: 'blue',
                      justifyContent: "space-between",
                    }}
                  >
                    <StarRating
                      rating={StarPic}
                      onChange={setStarPic}
                      // onChange={StarPic}
                      maxStars={StarPic}
                      starSize={25}
                      enableHalfStar={false}
                      enableSwiping={false}
                      style={{}}
                    />

                    <Text
                      numberOfLines={2}
                      style={{
                        fontSize: hp(2.2),
                        color: Colors.gray1,
                      }}
                    >
                      {moment(item.date).format("MMMM D, YYYY")}
                    </Text>
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
