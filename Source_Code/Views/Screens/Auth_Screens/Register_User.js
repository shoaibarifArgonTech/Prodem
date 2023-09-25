import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Platform,
  TextInput,
  TouchableOpacity,
  Modal,
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
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import Input_For_Auth from "../../../ReuseableComponents/Input_For_Auth";
import Register_or_Not from "../../../ReuseableComponents/Register_or_Not";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Register_User() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Device, setDevice] = useState("");
  // const [Password, setPassword] = useState("123456")

  useEffect(() => {
    // changeNavigationBarColor(Colors.AuthScreenBlack);
    if (Platform.OS == "android") {
      setDevice("android");
      return;
    }
    if (Platform.OS == "ios") {
      setDevice("iphone");
      return;
    }
    console.log("=========Device=======", Device);
    // newsApi();
    // loginController();
  }, [1]);

  function registerUser() {
    // let { email, isLoading } = this.state;

    if (Username == "") {
      helper.showTextToast("Username is empty.", Colors.theme);
      return;
    }
    if (email == "") {
      helper.showTextToast("Email is empty.", Colors.theme);
      return;
    }
    if (!helper.isValidEmail(email)) {
      helper.showTextToast("Wrong email.", Colors.theme);
      return;
    }
    if (Password == "") {
      helper.showTextToast("Password is empty.", Colors.theme);
      return;
    }
    if (Device == "") {
      helper.showTextToast("Device field is empty.", Colors.theme);
      return;
    }

    let body =
      "p_user_name=" +
      Username +
      "&p_user_email=" +
      email +
      "&p_user_password=" +
      Password +
      "&device=" +
      Device;
    setModalVisible(true); //-- indicator On

    apiHandler.sendSimplePostRequest(
      Urls.USER_REGISTER,
      body,
      (resp) => {
        // let userData = []
        console.log(
          "\x1b[36m%s\x1b[0m",
          "-------Register_User------->>>",
          resp.data
        );

        // return

        prefManager.createUserSession(resp);
        setModalVisible(false); //-- indicator off

        if (resp.status == "success") {
          // prefManager.updateLoginStatus(toggle)
          helper.showTextToast("Registered Succecssfully", Colors.theme);
          helper.resetAndGo(navigation, "LoginScreen");
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          // helper.resetAndGo(this.props.navigation, "AccessNotAllowed")
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
            marginTop: hp(3),
            marginBottom: hp(3),
          }}
        >
          {/* ========= NAME ========== */}

          {/* <Text
                    style={{
                        fontSize: hp(3),
                        color: Colors.white_text,
                        marginBottom: hp(1),
                        fontWeight: '600'
                    }}>Register User</Text> */}
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
                Enter your details to register
              </Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              // backgroundColor: 'plum',
              marginTop: hp(5),
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
              Username
            </Text>
            <Input_For_Auth
              Keyboardtype={"email-address"}
              AutoCapital={"none"}
              // placeholder='Username'
              PlaceHolder={""}
              PlaceHolderColor={""}
              Value={Username}
              OnChangeText={(text) => {
                setUsername(text);
              }}
              ReturnType={"default"}
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
              ReturnType={"default"}
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
                {Device}
              </Text>
            </View>

            {/* <Text
                        style={{
                            fontSize: hp(2.6),
                            color: Colors.theme,
                            fontWeight: '500',
                            alignSelf: 'flex-start'
                        }}>Device
                    </Text>
                    <Input_For_Auth
                        Keyboardtype={"email-address"}
                        AutoCapital={"none"}
                        // placeholder='Username'
                        PlaceHolder={"e.g Android or iphone"}
                        PlaceHolderColor={Colors.secondary_color}
                        Value={Device}
                        OnChangeText={(text) => { setDevice(text) }}
                        ReturnType={"default"}
                        Width={wp(90)}
                        Height={hp(6)}
                    ></Input_For_Auth> */}

            {/* ============== REGISTER BUTTON ============= */}
            <View
              style={{
                marginTop: hp(11),
              }}
            >
              <Simple_Button
                OnAction={() => {
                  registerUser();
                }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Register"}
              />

              <Register_or_Not
                OnAction={() => {
                  navigation.navigate("LoginScreen");
                }}
                Statement={"Already have an account"}
                Screen={"Login"}
              />
            </View>
          </ScrollView>
        </View>

        {modalVisible && (
          <Modal
            animationType="slide"
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
                style={{
                  alignSelf: "center",
                }}
              ></ActivityIndicator>
            </View>
          </Modal>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
