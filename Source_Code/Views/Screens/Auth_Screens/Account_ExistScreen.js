import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Ionicons from "react-native-vector-icons/Ionicons";
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import Input_For_Auth from "../../../ReuseableComponents/Input_For_Auth";
import Register_or_Not from "../../../ReuseableComponents/Register_or_Not";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Account_ExistScreen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(__DEV__ ? "ainashsaini37@gmail.com" : "");

  // const [Password, setPassword] = useState("123456")

  useEffect(() => {
    // changeNavigationBarColor(Colors.AuthScreenBlack);
    // newsApi();
    // checkAccount_Api();
  }, [1]);

  function checkAccount_Api() {
    // let { email, isLoading } = this.state;

    if (email == "") {
      helper.showTextToast("Email empty.", Colors.theme);
      return;
    }
    if (!helper.isValidEmail(email)) {
      helper.showTextToast("Wrong email.", Colors.theme);
      return;
    }

    // let body = "email=" + email + "&password=" + password
    let body = "email=" + email;
    setModalVisible(true); //-- indicator On

    apiHandler.sendSimplePostRequest(
      Urls.USER_ACCOUNT_EXIST,
      body,
      (resp) => {
        // let userData = []
        console.log(
          "\x1b[36m%s\x1b[0m",
          "-------Check_Account_Exist------->>>",
          resp.data
        );

        // return
        // prefManager.createUserSession(resp)

        setModalVisible(false); //-- indicator off

        if (resp.status == "success") {
          // prefManager.updateLoginStatus(toggle)
          helper.showTextToast(resp.message, Colors.theme);
          helper.resetAndGo(navigation, "LoginScreen");
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          helper.resetAndGo(navigation, "Register_User");
        }
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        // this.setState({ isLoading: false })
        setModalVisible(false);
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
        flex: 1,
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
          flex: 1,
          alignItems: "center",
          marginHorizontal: wp(5),
          marginTop: hp(5),
          marginBottom: hp(5),
          justifyContent: "space-between",
        }}
      >
        <View>
          {/* ========= Close ========== */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            style={{
              // backgroundColor: 'plum',
              alignSelf: "flex-start",
            }}
          >
            <Ionicons name="close" size={30} color={Colors.theme} />
          </TouchableOpacity>

          {/* ======= Text with Logo ========= */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(2),
              // backgroundColor: 'plum',
            }}
          >
            <Image
              resizeMode="contain"
              source={require("../../../Assets/Images/logo.png")}
              style={{
                width: wp(30),
                height: hp(11),
                // marginBottom: hp(5),
              }}
            ></Image>

            <View
              style={{
                marginLeft: wp(2),
              }}
            >
              <Text
                style={{
                  fontSize: hp(3),
                  color: Colors.white_text,
                  marginBottom: hp(1),
                  fontWeight: "600",
                }}
              >
                Welcome to prodem
              </Text>

              <Text
                style={{
                  fontSize: hp(1.8),
                  color: Colors.white_text,
                }}
              >
                Enter your email to login or register
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: "500",
              alignSelf: "flex-start",
            }}
          >
            Email
          </Text>

          <Input_For_Auth
            Keyboardtype={"email-address"}
            AutoCapital={"none"}
            // placeholder='Username'
            PlaceHolder={""}
            PlaceHolderColor={""}
            Value={email}
            OnChangeText={(text) => {
              setEmail(text);
            }}
            ReturnType={"done"}
            Width={wp(90)}
            Height={hp(6)}
          />

          {/* ======== Term & Condition & Policy ======== */}
          <View
            style={{
              width: wp(80),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "flex-start",
              marginLeft: wp(0.5),
            }}
          >
            <TouchableOpacity
              style={{
                borderBottomColor: Colors.theme,
                borderBottomWidth: 1.5,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.2),
                  color: Colors.theme,
                  fontWeight: "600",
                }}
              >
                Terms and Conditions
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderBottomColor: Colors.theme,
                borderBottomWidth: 1.5,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.2),
                  color: Colors.theme,
                  fontWeight: "600",
                }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: hp(40),
            marginBottom: hp(1),
          }}
        >
          <Simple_Button
            // OnAction={() => { navigation.navigate("BottamTab") }}
            OnAction={() => {
              checkAccount_Api();
            }}
            Width={wp(90)}
            Height={hp(6)}
            BtnTitle={"Next"}
          />

          <Register_or_Not
            OnAction={() => {
              navigation.navigate("Register_User");
            }}
            Statement={"Don't have an account"}
            Screen={"Register"}
          />
        </View>
      </View>

      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              width: wp(40),
              height: hp(20),
              backgroundColor: Colors.secondary_color,
              borderRadius: hp(1),
              position: "absolute",
              top: hp(35),
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              size={"large"}
              color={Colors.theme}
              style={
                {
                  // alignSelf: 'center',
                }
              }
            ></ActivityIndicator>
          </View>
        </Modal>
      )}
    </KeyboardAwareScrollView>
  );
}
