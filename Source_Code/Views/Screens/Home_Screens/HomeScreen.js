import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
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
import { useNavigation, CommonActions } from "@react-navigation/native";
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from "react-native-navigation-bar-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home_ItemsList_Tab from "../../../ReuseableComponents/Home_ItemsList_Tab";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // navigateAction();
    changeNavigationBarColor(Colors.bottamTabColor);

    homeItems_ApiCaller();
  }, [1]);

  const [isLoading, setisLoading] = useState(false);
  const [ItemsList, setItemsList] = useState("");

  function homeItems_ApiCaller() {
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.HOME_ITEM_LIST,
      "",
      (resp) => {
        // console.log("\x1b[35m--------Home_Items_Categories------->>>", resp.data?.categories)

        // return
        setItemsList(resp.data?.categories);
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
        backgroundColor: Colors.theme,
      }}
    >
      <StatusBar backgroundColor={Colors.theme} translucent={false} />

      <Text
        style={{
          fontSize: hp(3.5),
          color: Colors.white_text,
          // fontWeight: '500',
          textAlign: "center",
          // backgroundColor: 'plum',
          marginTop: hp(2),
        }}
      >
        Home
      </Text>

      <View
        style={{
          // position: 'absolute',
          // top: hp(10),
          backgroundColor: Colors.secondary_color,
          flex: 1,
          marginTop: hp(2),
          height: hp(100),
          width: wp(100),
          // borderTopRightRadius:hp(1),
          borderTopStartRadius: hp(2),
          borderTopEndRadius: hp(2),
        }}
      >
        {/* ========= Search Bar ========= */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.white,
            width: wp(90),
            height: hp(5.5),
            alignItems: "center",
            borderRadius: hp(10),
            alignSelf: "center",
            // marginVertical: hp(3),
            marginTop: hp(2),
            paddingHorizontal: wp(4),
          }}
        >
          <Ionicons name="search-sharp" size={20} color={Colors.gray1} />

          <Text
            onPress={() => {
              navigation.navigate("ProductList_Screen");
            }}
            style={{
              fontSize: hp(2.2),
              color: Colors.gray1,
              marginLeft: wp(2),
              // fontWeight: '500',
              // textAlign: 'center',
              // backgroundColor: 'plum',
              // marginTop: hp(2),
            }}
          >
            Search by item, part number
          </Text>

          {/* <TextInput
                        placeholder='Search by item,part number'
                        style={{
                            // textAlign:'center'
                            textAlignVertical: 'center',
                            // borderBottomWidth:1,
                            // borderBottomColor:
                            height: hp(5.5),
                            flex: 1,
                            // paddingHorizontal:wp(1),
                            // backgroundColor: 'plum',
                        }}
                    ></TextInput> */}
        </View>

        {/* ======== List ========= */}
        <Text
          style={{
            fontSize: hp(2.2),
            color: Colors.black_text,
            marginLeft: wp(5),
            marginTop: hp(2),
            fontWeight: "600",
          }}
        >
          CATEGORIES
        </Text>

        <Text
          style={{
            fontSize: hp(1.9),
            color: Colors.black_text,
            marginLeft: wp(5),
            // marginTop: hp(2),
            // fontWeight: '600'
          }}
        >
          Popular categories of the month
        </Text>

        {isLoading ? (
          <View
            style={{
              // flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp(30),
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
              // marginHorizontal: wp(5),
              marginTop: hp(1),
              flex: 1,
              // backgroundColor: 'plum',
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ItemsList}
              renderItem={({ item }) => {
                return (
                  <Home_ItemsList_Tab
                    OnAction={() => {
                      navigation.navigate("ProductList_Screen");
                    }}
                    ItemName={item.category_name}
                    ImageLink={item.category_image}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}
