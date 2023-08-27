import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  Modal,
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
import Register_or_Not from "../../../ReuseableComponents/Register_or_Not";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Input_For_Auth from "../../../ReuseableComponents/Input_For_Auth";

import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function LoginScreen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState(__DEV__ ? "avinashsaini37@gmail.com" : "");
  const [Password, setPassword] = useState(__DEV__ ? "1234567" : "");

  // const [Password, setPassword] = useState("123456")

  function loginController() {
    // let { email, isLoading } = this.state;

    if (email == "") {
      helper.showTextToast("Email empty.", Colors.theme);
      return;
    }
    if (!helper.isValidEmail(email)) {
      helper.showTextToast("Wrong email.", Colors.theme);
      return;
    }
    if (Password == "") {
      helper.showTextToast("Password empty.", Colors.theme);
      return;
    }

    let body =
      "username=" + email + "&password=" + Password + "&device=" + Platform.OS;
    setModalVisible(true); //-- indicator On

    apiHandler.sendSimplePostRequest(
      Urls.USER_LOGIN,
      body,
      (resp) => {
        // let userData = []
        console.log("\x1b[36m%s\x1b[0m -------Login_User------->>>", resp.data);
        console.log("\x1b[33m -------Token------->>>", resp.data.token);

        // return
        prefManager.createUserSession(resp);

        if (resp.status == "success") {
          prefManager.updateLoginStatus(true);

          setModalVisible(false); //-- indicator off
          helper.showTextToast(resp.message, Colors.theme);
          helper.resetAndGo(navigation, "BottamTab");
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          setModalVisible(false); //-- indicator off

          // helper.resetAndGo(navigation, "AccessNotAllowed")
        }
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setModalVisible(false);
      }
    );
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.AuthScreenBlack,
      }}
    >
      <StatusBar
        backgroundColor={Colors.AuthScreenBlack}
        translucent={false}
        barStyle="light-content"
        // barStyle="dark-content"
      />

      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: "center",
          marginHorizontal: wp(5),
          marginTop: hp(4),
        }}
      >
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
              Enter your details to login
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: hp(10),
          }}
        >
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
            PlaceHolder={""}
            PlaceHolderColor={""}
            Value={email}
            OnChangeText={(text) => {
              setEmail(text);
            }}
            SecureText={false}
            ReturnType={"done"}
            Width={wp(90)}
            Height={hp(6)}
          ></Input_For_Auth>

          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: "500",
              alignSelf: "flex-start",
            }}
          >
            Password
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // backgroundColor: 'plum',
            }}
          >
            <Input_For_Auth
              Keyboardtype={"default"}
              AutoCapital={"none"}
              PlaceHolder={""}
              PlaceHolderColor={""}
              Value={Password}
              OnChangeText={(text) => {
                setPassword(text);
              }}
              SecureText={!isPasswordVisible}
              ReturnType={"done"}
              Width={wp(80)}
              Height={hp(6)}
            ></Input_For_Auth>

            <TouchableOpacity
              onPress={() => {
                togglePasswordVisibility();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: hp(0.5),
                // backgroundColor: Colors.white,
              }}
            >
              <Ionicons
                name={isPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ==========DEVICE TEXT FIELD ============ */}
        <View
          style={
            {
              // backgroundColor: 'red',
            }
          }
        >
          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: "500",
              alignSelf: "flex-start",
            }}
          >
            Device
          </Text>

          <Text
            style={{
              fontSize: hp(2.2),
              color: Colors.white_text,
              // color: Colors.black,
              width: wp(90),
              // height: hp(6),
              borderBottomColor: Colors.theme,
              borderBottomWidth: 1.5,
              marginTop: hp(1),
              paddingBottom: hp(1),
              paddingHorizontal: wp(0.7),
              // marginVertical: hp(1),
              // backgroundColor: 'plum',
              // marginBottom: hp(1),
            }}
          >
            {Platform.OS}
          </Text>
        </View>

        {/* =============== LOGIN BUTTON ============== */}
        <View
          style={{
            marginTop: hp(20),
          }}
        >
          <Simple_Button
            OnAction={() => {
              loginController();
            }}
            Width={wp(90)}
            Height={hp(6)}
            BtnTitle={"Login"}
          />

          {/* <Register_or_Not
            OnAction={() => { navigation.navigate("Signup_Screen") }}
            Statement={"Don't have an account"}
            Screen={"Signup"}
          /> */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
            activeOpacity={0.5}
            style={{
              marginLeft: wp(1),
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp(2),
              // backgroundColor: 'red',
            }}
          >
            <Text
              style={{
                fontSize: hp(2.2),
                color: Colors.theme,
                fontWeight: "600",
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
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
    </View>
  );
}
