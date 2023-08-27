import React, { useState, useEffect } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
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
import RadioButtonRN from "radio-buttons-react-native";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

const radioButtonData = [
  {
    label: "Buyer",
  },
  {
    label: "Seller",
  },
];

export default function UpdateProfile_Screen() {
  const navigation = useNavigation();

  const [ProfilePic, setProfilePic] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [CountryCity, setCountryCity] = useState(1);
  const [Address, setAddress] = useState("");
  const [Entity, setEntity] = useState("");
  const [CIF, setCIF] = useState("");
  const [NrReg, setNrReg] = useState("");
  const [Headquarter, setHeadquarter] = useState("");
  const [Bank, setBank] = useState("");
  const [IBANCode, setIBANCode] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [ProfileDetail, setWishlistDetail] = useState("");
  const [optimizedType, setOptimizedType] = useState(0);
  const [preference, setPreference] = useState("");
  function getCompleteUserDataLocally() {
    prefManager.getUserSessionData((data) => {
      console.log(
        "\x1b[34m====AccountScreen GetData====",
        JSON.stringify(data?.data?.userDetails, null, 4)
      );
      setName(data?.data?.userDetails?.p_user_name);
      setPhone(data?.data?.userDetails?.p_user_mobile);
      setCountryCity(
        data?.data?.userDetails?.p_user_country +
          " / " +
          data?.data?.userDetails?.p_user_city
      );
      setAddress(data?.data?.userDetails?.p_user_address);
      setEntity(data?.data?.userDetails?.p_user_company_name);
      setCIF(data?.data?.userDetails?.p_user_tax_registration_code);
      setNrReg(data?.data?.userDetails?.p_user_nr_reg_com);
      setHeadquarter(data?.data?.userDetails?.p_user_headquarters_address);
      setBank(data?.data?.userDetails?.p_user_bank);
      setIBANCode(data?.data?.userDetails?.p_user_iban_code);
      setOptimizedType(
        parseInt(data?.data?.userDetails?.p_user_optimized_type)
      );
    });
  }
  useEffect(() => {
    getCompleteUserDataLocally();
    // changeNavigationBarColor(Colors.primary_color);
  }, []);

  function profileUpdate_ApiCaller() {
    if (CountryCity == "" || optimizedType == 0) {
      helper.showTextToast("Must fill all fields.", Colors.theme);
      return;
    }
    // if (email == "") {
    //     helper.showTextToast("Email empty.", Colors.theme)
    //     return
    // }

    let body =
      "p_user_city=" +
      CountryCity +
      "&p_user_address=" +
      Address +
      "&p_user_company_name=" +
      Entity +
      "&p_user_tax_registration_code=" +
      CIF +
      "&p_user_nr_reg_com=" +
      NrReg +
      "&p_user_headquarters_address=" +
      Headquarter +
      "&p_user_bank=" +
      Bank +
      "&p_user_iban_code=" +
      IBANCode +
      "&p_user_mobile=" +
      Phone +
      "&p_user_optimized_type=" +
      optimizedType;

    setisLoading(true); //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.PROFILE_UPDATE,
      body,
      (resp) => {
        console.log(
          "\x1b[31m-------PROFILE_UPDATE-------->>>>",
          resp.data?.details
        );

        if (resp.status == "success") {
          helper.showTextToast(resp.message, Colors.theme);
          setisLoading(false);

          setName("");
          setPhone("");
          setCountryCity("");
          setAddress("");
          setEntity("");
          setCIF("");
          setNrReg("");
          setHeadquarter("");
          setBank("");
          setIBANCode("");
          setOptimizedType(0);

          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          setisLoading(false);
        }

        // return
        // setWishlistDetail(resp.data?.details)
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
        Title={"Update Profile"}
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
          marginTop: hp(2),
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

          <Text_Statement Statement={"Phone No."} />
          <TextInputs
            Keyboardtype={"numeric"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={Phone}
            OnChangeText={(text) => {
              setPhone(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Country/City"} />
          <TextInputs
            Keyboardtype={"numeric"}
            AutoCapital={"none"}
            PlaceHolder={"Not Selected"}
            PlaceHolderColor={Colors.gray2}
            Value={CountryCity}
            OnChangeText={(text) => {
              setCountryCity(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Address"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"sentences"}
            PlaceHolder={"Address"}
            PlaceHolderColor={Colors.gray2}
            Value={Address}
            OnChangeText={(text) => {
              setAddress(text);
            }}
            ReturnType={"default"}
            MultiLines={true}
            NumOfLines={3}
            Width={wp(90)}
            Height={hp(14)}
          />

          <Text_Statement Statement={"Legal Entity"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"sentences"}
            PlaceHolder={"Name"}
            PlaceHolderColor={Colors.gray2}
            Value={Entity}
            OnChangeText={(text) => {
              setEntity(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"CIF/WHICH"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={CIF}
            OnChangeText={(text) => {
              setCIF(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Nr. Reg. Com"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={NrReg}
            OnChangeText={(text) => {
              setNrReg(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Headquarter address"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"sentences"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={Headquarter}
            OnChangeText={(text) => {
              setHeadquarter(text);
            }}
            ReturnType={"default"}
            MultiLines={true}
            NumOfLines={3}
            Width={wp(90)}
            Height={hp(14)}
          />

          <Text_Statement Statement={"Bank"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={Bank}
            OnChangeText={(text) => {
              setBank(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"IBAN Code"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray2}
            Value={IBANCode}
            OnChangeText={(text) => {
              setIBANCode(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Preference"} />
          <View>
            <RadioButtonRN
              initial={optimizedType}
              data={radioButtonData}
              selectedBtn={(e) => {
                console.log("===Radio===>>>>>>", e);

                if (e.label == "Buyer") {
                  setOptimizedType(1);
                  return;
                }
                if (e.label == "Seller") {
                  setOptimizedType(2);
                  return;
                }
              }}
            />
          </View>

          {/* ============ PostButton =========== */}
          {isLoading ? (
            <View
              style={{
                // flex: 1,
                // height: hp(85),
                alignItems: "center",
                justifyContent: "center",
                // marginTop: hp(30),
                // backgroundColor: 'red',
                marginTop: hp(3),
                marginBottom: hp(15),
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
                marginTop: hp(3),
                marginBottom: hp(15),
                // backgroundColor: 'plum',
              }}
            >
              <Simple_Button
                OnAction={() => {
                  profileUpdate_ApiCaller();
                }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Update"}
              />
            </View>
          )}
        </ScrollView>
      </View>
      {/* } */}
    </View>
  );
}
