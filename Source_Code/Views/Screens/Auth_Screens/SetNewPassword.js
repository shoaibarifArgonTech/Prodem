import React, { useState, useEffect } from 'react'
import {
  View, Text, StatusBar, Image, FlatList, TextInput,
  TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../../Colors/Colors';
import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Simple_Button from '../../../ReuseableComponents/Simple_Button';
import { useNavigation, CommonActions, useRoute } from '@react-navigation/native';
import Input_For_Auth from '../../../ReuseableComponents/Input_For_Auth';

import Helpers from '../../Data/Helpers';
import Urls from '../../Data/Urls';
import ApiHandler from '../../Data/ApiHandler';
import PrefManager from '../../Data/PrefManager';


const helper = new Helpers()
const apiHandler = new ApiHandler()
const prefManager = new PrefManager()

const SetNewPassword = () => {

  const navigation = useNavigation();
  const route = useRoute()

  const [isLoading, setisLoading] = useState(false)

  const [OTP, setOTP] = useState(route.params?.OTPVerify ?? "");
  const [User_Id, setUser_Id] = useState(route.params?.USER_IDVerify ?? "")
  const [NewPassword, setNewPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    changeNavigationBarColor(Colors.transparent);


    console.log("======VERIFY USER ID=====", User_Id)
    console.log("======VERIFY USER OTP=====", OTP)

  }, [1])

  function setNewPassword_Controller() {
    if (NewPassword == "") {
      helper.showTextToast("Must fill Password.", Colors.theme)
      return
    }
    if (ConfirmPassword == "") {
      helper.showTextToast("Please fill confirm password.", Colors.theme)
      return
    }
    if (NewPassword !== ConfirmPassword) {
      helper.showTextToast("Confirm password must be same.", Colors.theme)
      return
    }

    let body = "email=" + User_Id + "&verification_code=" + OTP + "&new_password=" + NewPassword
    setisLoading(true)         //-- indicator On

    apiHandler.sendSimplePostRequest(
      Urls.USER_LOGIN,
      body,
      (resp) => {
        console.log("\x1b[36m%s\x1b[0m -------NEW PASSWORD RESP------->>>", resp.data)

        // return

        if (resp.status == "success" && resp.code == 200) {
          // prefManager.updateLoginStatus(toggle)
          helper.showTextToast(resp.message, Colors.theme)
          setisLoading(false)

          helper.resetAndGo(navigation, "NewPasswordDone")

          return
        }
        else {
          helper.showTextToast(resp.message, Colors.theme)
          setisLoading(false)

          // helper.resetAndGo(navigation, "AccessNotAllowed")
        }
      },
      (error) => {
        helper.showTextToast(error, Colors.theme)
        setisLoading(false)
      }
    )
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.AuthScreenBlack,
    }}>
      <StatusBar
        backgroundColor={Colors.AuthScreenBlack}
        translucent={false}
        barStyle="light-content"
      // barStyle="dark-content"
      />

      <View
        style={{
          // backgroundColor: 'plum',
          alignItems: 'center',
          marginHorizontal: wp(5),
          marginTop: hp(9),
        }}>
        {/* ========= NAME ========== */}

        <Text
          style={{
            fontSize: hp(3),
            color: Colors.white_text,
            marginBottom: hp(1),
            // marginTop: hp(3),
            fontWeight: '600'
          }}>Create New Password</Text>


        {/* ======= Text with Logo ========= */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(2),
            // backgroundColor: 'plum',
          }}>

          <Image
            resizeMode='contain'
            source={require('../../../Assets/Images/logo.png')}
            style={{
              width: wp(30),
              height: hp(11),
              // marginBottom: hp(5),
            }}
          ></Image>

          <View
            style={{
              marginLeft: wp(2),
            }}>
            <Text
              style={{
                fontSize: hp(3),
                color: Colors.white_text,
                marginBottom: hp(1),
                fontWeight: '600'
              }}>Welcome to prodem</Text>

            <Text
              style={{
                fontSize: hp(1.8),
                color: Colors.white_text,
              }}>Enter your details for new password</Text>

          </View>
        </View> */}

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'plum',
            marginTop: hp(5),
          }}>
          <Image
            // resizeMode='cover'
            source={require('../../../Assets/Images/newpassword.png')}
            style={{
              width: hp(12),
              height: hp(12),
              // tintColor: Colors.theme
            }}>
          </Image>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
          style={{
            // backgroundColor: 'plum',
            marginTop: hp(6),
          }}>


          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: '500',
              alignSelf: 'flex-start'
            }}>New Password
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'plum',
          }}>
            <Input_For_Auth
              Keyboardtype={"default"}
              AutoCapital={"none"}
              PlaceHolder={"new password"}
              PlaceHolderColor={Colors.gray1}
              Value={NewPassword}
              OnChangeText={(text) => { setNewPassword(text) }}
              SecureText={!isPasswordVisible}
              ReturnType={"done"}
              Width={wp(80)}
              Height={hp(6)}
            ></Input_For_Auth>

            <TouchableOpacity
              onPress={() => { togglePasswordVisibility() }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: hp(0.5),
                // backgroundColor: Colors.white,
              }}>
              <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: hp(2.6),
              color: Colors.theme,
              fontWeight: '500',
              alignSelf: 'flex-start'
            }}>Confirm Password
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'plum',
          }}>
            <Input_For_Auth
              Keyboardtype={"default"}
              AutoCapital={"none"}
              PlaceHolder={"new password"}
              PlaceHolderColor={Colors.gray1}
              Value={ConfirmPassword}
              OnChangeText={(text) => { setConfirmPassword(text) }}
              SecureText={!isPasswordVisible}
              ReturnType={"done"}
              Width={wp(80)}
              Height={hp(6)}
            ></Input_For_Auth>

            <TouchableOpacity
              onPress={() => { togglePasswordVisibility() }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: hp(0.5),
                // backgroundColor: Colors.white,
              }}>
              <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {isLoading ?
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp(25),
            }}>
              <ActivityIndicator size="large" color={Colors.theme}
                style={{
                  alignSelf: 'center',
                }} />
            </View>
            :
            <View style={{
              marginTop: hp(25),
            }}>
              <Simple_Button
                OnAction={() => { setNewPassword_Controller() }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Submit"}
              />

            </View>
          }

        </ScrollView>

      </View>


    </View>
  )
}

export default SetNewPassword