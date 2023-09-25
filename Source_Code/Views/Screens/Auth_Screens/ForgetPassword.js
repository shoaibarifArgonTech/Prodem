import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
import TextInputs from "../../../ReuseableComponents/TextInputs";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Input_For_Auth from "../../../ReuseableComponents/Input_For_Auth";

import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

const ForgetPassword = () => {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    changeNavigationBarColor(Colors.transparent);
  }, [1]);

  function forgetPass_Controller() {
    // navigation.navigate("Verification", { OTP: "8888", USER_ID: email })
    // return

    if (email == "") {
      helper.showTextToast("Email empty.", Colors.theme);
      return;
    }
    if (!helper.isValidEmail(email)) {
      helper.showTextToast("Wrong email.", Colors.theme);
      return;
    }

    let body = "username=" + email;
    setisLoading(true); //-- indicator On
    apiHandler.sendSecurePostRequest(
      Urls.USER_FORGET,
      body,
      (resp) => {
        console.log("\x1b[33m -------FORGET RESP------->>>", resp);
        setisLoading(false); //-- indicator off
        // return

        if (resp.status == "success") {
          helper.showTextToast(resp.message, Colors.theme);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Verification",
                  params: { USER_ID: email },
                },
              ],
            })
          );
          // navigation.navigate("",)
          // helper.resetAndGo(navigation, "Verification")
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          // helper.resetAndGo(navigation, "AccessNotAllowed")
        }
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        backgroundColor={Colors.AuthScreenBlack}
        translucent={false}
        barStyle="light-content"
        // barStyle="dark-content"
      />

      <View
        style={{
          marginHorizontal: wp(5),
          marginTop: hp(9),
          marginBottom: hp(9),
          flex: 1,
          justifyContent: "space-between",
          // backgroundColor: 'plum',
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // backgroundColor: 'blue',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                // backgroundColor: 'plum',
                alignSelf: "flex-start",
              }}
            >
              <Ionicons name="close" size={30} color={Colors.theme} />
            </TouchableOpacity>

            <View
              style={{
                // backgroundColor: 'yellow',
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: hp(3),
                  color: Colors.white_text,
                  marginBottom: hp(1),
                  fontWeight: "600",
                  // alignSelf: 'center',
                  textAlign: "center",
                }}
              >
                Forget Password
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: hp(2),
              color: Colors.white_text,
              marginTop: hp(4),
              textAlign: "center",
            }}
          >
            Enter your email to recover password
          </Text>

          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: "500",
              alignSelf: "flex-start",
              marginTop: hp(10),
            }}
          >
            Email
          </Text>

          <Input_For_Auth
            Keyboardtype={"email-address"}
            AutoCapital={"none"}
            // placeholder='Username'
            PlaceHolder={"example@gmail.com"}
            PlaceHolderColor={Colors.gray1}
            Value={email}
            OnChangeText={(text) => {
              setEmail(text);
            }}
            ReturnType={"default"}
            Width={wp(90)}
            Height={hp(6)}
          />
        </View>
        <View>
          {isLoading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp(43),
              }}
            >
              <ActivityIndicator
                size="large"
                color={Colors.theme}
                style={{
                  alignSelf: "center",
                }}
              />
            </View>
          ) : (
            <View
              style={{
                // marginTop: hp(43),
                marginBottom: hp(1),
              }}
            >
              <Simple_Button
                OnAction={() => {
                  forgetPass_Controller();
                }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Send"}
              />
            </View>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetPassword;
