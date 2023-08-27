import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import ProfileDetail_Tab from "../../../ReuseableComponents/ProfileDetail_Tab";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function ProfileDetails() {
  const navigation = useNavigation();

  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Bank, setBank] = useState("");
  const [Company, setCompany] = useState("");
  const [lastLogin, setLastlogin] = useState("");
  const [TaxCode, setTaxCode] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [ProfileDetail, setWishlistDetail] = useState("");

  useEffect(() => {
    // changeNavigationBarColor(Colors.primary_color);

    profileDetail_ApiCaller();
  }, [1]);

  function profileDetail_ApiCaller() {
    // let body = "p_user_city=" + CountryCity + "&p_user_address=" + Address

    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.PROFILE_DETAILS,
      "",
      (resp) => {
        console.log(
          "\x1b[31m-------PROFILE_Detail-------->>>>",
          resp.data?.details.p_user_photo
        );

        // return

        setName(resp.data?.details.p_user_name);
        setAddress(resp.data?.details.p_user_address);
        setBank(resp.data?.details.p_user_bank);
        setCompany(resp.data?.details.p_user_email);
        setLastlogin(resp.data?.details.p_user_lastlogin);
        setTaxCode(resp.data?.details.p_user_tax_registration_code);

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
        backgroundColor: Colors.new_BG,
      }}
    >
      <Header
        StatusbarColor={Colors.theme}
        BarStyle={"dark-content"}
        backButton={true}
        GoBack={() => {
          navigation.goBack();
        }}
        Title={"Profile Details"}
      />

      {isLoading ? (
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
      ) : (
        <View
          style={{
            marginTop: hp(2),
            marginHorizontal: wp(4),
            flex: 1,
            // backgroundColor: 'plum',
          }}
        >
          <View
            style={{
              // marginTop: hp(2),
              // marginHorizontal: wp(4),
              // flex: 1
              backgroundColor: Colors.white_BG,
              borderRadius: hp(1),
              paddingBottom: hp(2),
              height: hp(58),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                // flex:1,
                // height: hp(30),
                borderRadius: hp(1),
                // backgroundColor: 'plum',
                paddingHorizontal: wp(2),
                // paddingBottom:hp(3)
              }}
            >
              <ProfileDetail_Tab Title={"Name"} Value={Name} />

              <ProfileDetail_Tab Title={"Address"} Value={Address} />

              <ProfileDetail_Tab Title={"Bank"} Value={Bank} />

              <ProfileDetail_Tab Title={"Company"} Value={Company} />

              <ProfileDetail_Tab Title={"Last Login"} Value={lastLogin} />

              <ProfileDetail_Tab Title={"Tax Code"} Value={TaxCode} />
            </ScrollView>
          </View>

          {/* ========== Button========= */}
          <View
            style={{
              marginTop: hp(5),
              // backgroundColor: 'plum',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Edit_Profile");
              }}
              activeOpacity={0.5}
              style={{
                width: wp(92),
                height: hp(6),
                // width: props.Width,
                // height: props.Height,
                borderRadius: hp(1),
                backgroundColor: Colors.theme,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: wp(10),
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.3),
                  color: Colors.white_text,
                  fontWeight: "500",
                  borderBottomColor: Colors.white,
                  borderBottomWidth: 1,
                }}
              >
                Edit Info
              </Text>

              <Feather name="edit" size={23} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* =========== RELOAD ========= */}
      <TouchableOpacity
        onPress={() => {
          profileDetail_ApiCaller();
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: hp(4.5),
          right: wp(5),
          borderRadius: hp(50),
          padding: hp(0.5),
          backgroundColor: Colors.white,
        }}
      >
        <Ionicons name="reload" size={20} color={Colors.theme} />
      </TouchableOpacity>
    </View>
  );
}
