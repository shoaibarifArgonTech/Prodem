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
import Simple_Button from "../../../ReuseableComponents/Simple_Button";
import {
  useNavigation,
  CommonActions,
  useRoute,
} from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

function Verification() {
  const navigation = useNavigation();
  const route = useRoute();

  const [isLoading, setisLoading] = useState(false);
  const [Otp, setOtp] = useState();
  const [User_Id, setUser_Id] = useState(route.params?.USER_ID ?? "");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("======Routes=====", User_Id);
    console.log("======OTP=====", Otp);
  }, [Otp]);

  function Verification_Controller() {
    if (Otp == "" || Otp == undefined || Otp == null) {
      helper.showTextToast("Four digit code is not filled.", Colors.theme);
      return;
    }

    let body = "email=" + User_Id + "&verification_code=" + Otp;
    setisLoading(true); //-- indicator On

    apiHandler.sendSecurePostRequest(
      Urls.USER_VERIFY,
      body,
      (resp) => {
        console.log("\x1b[33m -------VERIFICATION RESP------->>>", resp);

        // return

        if (resp.data?.verification_code == Otp) {
          helper.showTextToast(resp.message, Colors.theme);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "SetNewPassword",
                  params: { OTPVerify: Otp, USER_IDVerify: User_Id },
                },
              ],
            })
          );

          setisLoading(false);

          return;
        } else {
          // helper.showTextToast(resp.message, Colors.theme)
          helper.showTextToast(
            "your four digit code is not matched!",
            Colors.theme
          );
          setisLoading(false);
        }
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }

  function resendOTP_Controller() {
    let body = "email=" + User_Id;
    setisLoading(true); //-- indicator On

    apiHandler.sendSecurePostRequest(
      Urls.USER_RESEND_OTP,
      body,
      (resp) => {
        console.log("\x1b[33m -------RESEND_OTP RESP------->>>", resp);
        if (resp.status == "success") {
          helper.showTextToast(
            "Again four digit code has sent to your email.",
            Colors.theme
          );

          setisLoading(false);
          return;
        }

        // return
        setisLoading(false);
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
          // backgroundColor: 'plum',
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
          Verification
        </Text>

        {/* <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // marginTop: hp(2),
                        // marginHorizontal: wp(4),
                        // backgroundColor: 'blue',
                    }}>

                    <TouchableOpacity
                        onPress={() => { navigation.goBack() }}
                        style={{
                            // backgroundColor: 'plum',
                            alignSelf: 'flex-start',
                        }}>
                        <Ionicons name="close" size={30} color={Colors.theme} />
                    </TouchableOpacity>

                    <View style={{
                        // backgroundColor: 'yellow',
                        flex: 1
                    }}>
                        <Text
                            style={{
                                fontSize: hp(3),
                                color: Colors.white_text,
                                marginBottom: hp(1),
                                fontWeight: '600',
                                // alignSelf: 'center',
                                textAlign: 'center',
                            }}>Verification</Text>
                    </View>

                </View> */}

        <Text
          style={{
            fontSize: hp(2),
            color: Colors.white_text,
            marginTop: hp(4),
            textAlign: "center",
          }}
        >
          Enter your four digits verification code
        </Text>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: 'plum',
            marginTop: hp(5),
          }}
        >
          <Image
            // resizeMode='cover'
            source={require("../../../Assets/Images/verify.png")}
            style={{
              width: hp(12),
              height: hp(12),
              // tintColor: Colors.theme
            }}
          ></Image>
        </View>

        <OTPInputView
          style={{
            width: "70%",
            height: 100,
            alignSelf: "center",
            marginTop: hp(5),
          }}
          pinCount={4}
          autoFocusOnLoad={false}
          codeInputFieldStyle={{
            width: wp(12),
            height: 45,
            color: Colors.secondary_color,
            fontSize: hp(2.3),
            borderWidth: 2,
            borderColor: Colors.secondary_color,
            borderRadius: 10,
            textAlign: "center",
          }}
          codeInputHighlightStyle={{
            borderColor: Colors.theme,
            color: Colors.theme,
            fontSize: 20,
          }}
          onCodeFilled={(code) => {
            console.log("Code is ", code, "you are good to go!");
            // this.setState({ otp: code })
            setOtp(code);
            console.log("======NEW OTP=====", Otp);
          }}
        />
        <View
          style={{
            // backgroundColor: 'plum',
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: hp(1),
          }}
        >
          <Text
            style={{
              fontSize: hp(2),
              color: Colors.white_text,
              textAlign: "center",
            }}
          >
            If you didn't receive a code!
          </Text>

          <TouchableOpacity
            onPress={() => {
              resendOTP_Controller();
            }}
            activeOpacity={0.3}
          >
            <Text
              style={{
                fontSize: hp(2.2),
                color: Colors.theme,
                textAlign: "center",
                fontWeight: "600",
                marginLeft: wp(2),
              }}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp(25),
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
              marginTop: hp(25),
            }}
          >
            <Simple_Button
              OnAction={() => {
                Verification_Controller();
              }}
              Width={wp(90)}
              Height={hp(6)}
              BtnTitle={"Verify"}
            />
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Verification;
