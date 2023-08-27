import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import TextInputs from "../../../ReuseableComponents/TextInputs";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Header from "../../../ReuseableComponents/Header";
import Text_Statement from "../../../ReuseableComponents/Text_Statement";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Edit_Profile() {
  const navigation = useNavigation();

  const [ProfilePic, setProfilePic] = useState("");
  const [Name, setName] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // changeNavigationBarColor(Colors.primary_color);
    // nameUpdate_ApiCaller()
  }, [1]);

  function nameUpdate_ApiCaller() {
    if (Name == "") {
      helper.showTextToast("Name field Empty.", Colors.theme);
      return;
    }

    let body = "name=" + Name;
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.PROFILE_NAME,
      body,
      (resp) => {
        console.log(
          "\x1b[31m-------NAME_UPDATED-------->>>>",
          resp.data?.details?.p_user_name
        );

        // return
        // setWishlistDetail(resp.data?.details)

        // setName()
        helper.showTextToast("Name Updated", Colors.theme);
        setName("");
        // setisLoading(false)
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function passwordChange_ApiCaller() {
    if (OldPassword == "") {
      helper.showTextToast("Enter your old Password.", Colors.theme);
      return;
    }
    if (NewPassword == "") {
      helper.showTextToast("Enter your new Password.", Colors.theme);
      return;
    }

    let body =
      "current_password=" + OldPassword + "&new_password=" + NewPassword;
    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.UPDATE_PASSWORD,
      body,
      (resp) => {
        console.log("\x1b[31m-------PASSWORD CHANGED-------->>>>", resp);

        // return
        helper.showTextToast(resp.message, Colors.theme);
        setOldPassword("");
        setNewPassword("");
        // setisLoading(false)
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
        Title={"Edit Profile"}
      />

      {/* {isLoading ?
                <View style={{
                    // flex: 1,
                    height: hp(85),
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: hp(30),
                    // backgroundColor: 'yellow',
                }}>
                    <ActivityIndicator size="large" color={Colors.theme}
                        style={{
                            // marginTop: hp(11),
                            // alignSelf: 'center',
                        }} />
                </View>
                : */}
      <View
        style={{
          // marginTop: hp(2),
          marginHorizontal: wp(4),
          flex: 1,
          // backgroundColor: 'plum',
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            // flex:1,
            height: hp(80),
            // backgroundColor: 'plum',
            // paddingBottom:hp(3)
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              fontWeight: "600",
              color: Colors.black_text,
              marginTop: hp(2),
              marginBottom: hp(5),
              textAlign: "center",
              // backgroundColor: 'plum',
            }}
          >
            EDIT PERSONAL INFO
          </Text>

          <Text_Statement Statement={"Name"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={Name}
            OnChangeText={(text) => {
              setName(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          {/* ============ SAVE NAME BUTTON =========== */}
          <View
            style={{
              marginTop: hp(3),
              marginBottom: hp(5),
              // backgroundColor: 'plum',
            }}
          >
            <Simple_Button
              OnAction={() => {
                nameUpdate_ApiCaller();
              }}
              Width={wp(90)}
              Height={hp(6)}
              BtnTitle={"SAVE"}
            />
          </View>

          <Text
            style={{
              fontSize: hp(3),
              fontWeight: "600",
              color: Colors.black_text,
              marginTop: hp(2),
              // marginBottom: hp(2),
              textAlign: "center",
              // backgroundColor: 'plum',
            }}
          >
            CHANGE PASSWORD
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              // fontWeight: '600',
              color: Colors.black_text,
              marginTop: hp(2),
              marginBottom: hp(5),
              textAlign: "center",
              // backgroundColor: 'plum',
            }}
          >
            To reset your password, enter your current password and the new
            password below.
          </Text>

          <Text_Statement Statement={"Current Password"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={OldPassword}
            OnChangeText={(text) => {
              setOldPassword(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />
          <Text_Statement Statement={"New Password"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={NewPassword}
            OnChangeText={(text) => {
              setNewPassword(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          {/* ============ CHANGED PASSWORD BUTTON =========== */}
          <View
            style={{
              marginTop: hp(3),
              marginBottom: hp(15),
              // backgroundColor: 'plum',
            }}
          >
            <Simple_Button
              OnAction={() => {
                passwordChange_ApiCaller();
              }}
              Width={wp(90)}
              Height={hp(6)}
              BtnTitle={"RESET"}
            />
          </View>
        </ScrollView>
      </View>

      {/* } */}
    </View>
  );
}
