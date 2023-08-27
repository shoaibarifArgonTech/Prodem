import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity,
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
import Header from "../../../ReuseableComponents/Header";
import Text_Statement from "../../../ReuseableComponents/Text_Statement";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import Helpers from "../../Data/Helpers";
import Urls from "../../Data/Urls";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Ask_OfferScreen() {
  const navigation = useNavigation();

  const [user_token, setUser_token] = useState("");

  const [CarPart, setCarPart] = useState("");
  const [PartCode, setPartCode] = useState("");
  const [PhotoPath, setPhotoPath] = useState("");
  const [Car, setCar] = useState("");
  const [ManufacturingYear, setManufacturingYear] = useState("");
  const [Alternative, setAlternative] = useState("");
  const [Engines, setEngines] = useState("");
  const [ChasicSeries, setChasicSeries] = useState("");
  const [Status_, setStatus] = useState("");
  const [CityCountry, setCityCountry] = useState("");
  const [AreaLocation, setAreaLocation] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const [CarModel, setCarModel] = useState(false);
  const [YearModel, setYearModel] = useState(false);
  const [StatusModel, setStatusModel] = useState(false);
  const [CountryCityModel, setCountryCityModel] = useState(false);

  const [ListItems, setListItems] = useState([]);

  useEffect(() => {
    getCompleteUserDataLocally();
    changeNavigationBarColor(
      (CarModel || YearModel || StatusModel || CountryCityModel) == true
        ? Colors.blackHexColor
        : Colors.bottamTabColor
    );

    initializeData();
    dropdown_ApiCaller();
  }, [1]);

  function initializeData() {
    setCarPart("");
    setPartCode("");
    setPhotoPath("");
    setCar("");
    setManufacturingYear("");
    setAlternative("");
    setEngines("");
    setChasicSeries("");
    setStatus("");
    setCityCountry("");
    setAreaLocation("");
  }

  function getCompleteUserDataLocally() {
    prefManager.getUserSessionData((data) => {
      console.log("\x1b[34m====ASK_OFFER GetData====", JSON.stringify(data));

      // setToken(data.data?.token)
      setUser_token(data?.data?.token);
      // console.log("\x1b[35m======== UserEmail State =========", userEmail)
    });
  }

  function askOffer_ApiCaller(imageLink) {
    if (CarPart == "" || PartCode == "") {
      helper.showTextToast("Must fill all fields.", Colors.theme);
      return;
    }
    if (PhotoPath.photo_path == "") {
      helper.showTextToast("Please select photo.", Colors.theme);
      return;
    }
    if (Car == "") {
      helper.showTextToast("Please select car model.", Colors.theme);
      return;
    }
    if (Status_ == "") {
      helper.showTextToast("Please select car status.", Colors.theme);
      return;
    }
    if (CityCountry == "" || AreaLocation == "") {
      helper.showTextToast(
        "Please enter your country and location",
        Colors.theme
      );
      return;
    }

    setisLoading(true); //--- Loader On

    let data = new FormData();
    data.append(
      "partrequest_slides[0]",
      `data:${PhotoPath.photomime};base64,${PhotoPath.photo_path}`
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAopElEQVR42u2deXxU5b3',
    );

    data.append("partrequest_title[0]", CarPart);
    data.append("partrequest_desc[0]", PartCode);
    // data.append("partrequest_thumb[0]", `data:image/png;base64,` + imageLink);
    // data.append("partrequest_slides[0]", `data:${imageMime};base64,${imageLink}`);
    // data.append("partrequest_slides[0]", imageLink);
    // data.append("partrequest_slides[0]", 'data:image/jpeg;base64,' + imageLink);
    // data.append("partrequest_title[1]", "");
    data.append("partrequest_desc[1]", Alternative);
    // data.append("partrequest_thumb[1]", `data:image/png;base64,` + imageLink);
    // data.append("partrequest_slides[1]", `data:image/png;base64,` + imageLink);
    data.append("partrequest_vehicle", Car);
    data.append("partrequest_year", ManufacturingYear);
    data.append("partrequest_product_type", Status_);
    data.append("partrequest_delivery_city", CityCountry);
    data.append("partrequest_delivery_location", AreaLocation);
    // data.append("partrequest_varient", "");
    data.append("partrequest_engines", Engines);
    data.append("partrequest_chassis", ChasicSeries);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: "https://demo.exultcybersolution.in/api/mypartrequest/create",
      url: Urls.ASK_OFFER,
      headers: {
        lang: "en",
        Authorization: "Bearer" + " " + user_token,
        "Content-Type": "multipart/form-data",
        // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RlbW8uZXh1bHRjeWJlcnNvbHV0aW9uLmluIiwic2VjcmF0ZSI6ImRybExuZUthVjBwZVY1SjA5Mk9rTSIsImF1ZCI6Imh0dHBzOi8vZGVtby5leHVsdGN5YmVyc29sdXRpb24uaW4iLCJpYXQiOjE2ODA1ODg2NDl9.1Fl59Ag48ccylLtpAbn69i9D_wJ2zo99BWttJK26YQ0",

        // Cookie: "ci_session=u4ai3s7975421p65ammho6q8d0r4s2t9",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("\x1b[31m-------ASK OFFER-------->>>>", response);

        if (response.data.code == "200") {
          // helper.showTextToast(response.message, Colors.theme)
          initializeData();
          setisLoading(false);
          helper.showTextToast("Uploaded.", Colors.theme);

          return;
        } else {
          // helper.showTextToast(response.message, Colors.theme)
          helper.showTextToast("unable to upload", Colors.theme);
          setisLoading(false);
        }
        // setisLoading(false)
      })
      .catch((error) => {
        console.log("==========Err===>>", error);
        setisLoading(false);
        helper.showTextToast(error.message, Colors.theme);
      });
  }

  // function askOffer_ApiCaller() {
  //   if (CarPart == "" || PartCode == "") {
  //     helper.showTextToast("Must fill all fields.", Colors.theme)
  //     return
  //   }
  //   if (PhotoPath.photo_path == "") {
  //     helper.showTextToast("Please select photo.", Colors.theme)
  //     return
  //   }
  //   if (Car == "") {
  //     helper.showTextToast("Please select car model.", Colors.theme)
  //     return
  //   }
  //   if (Status_ == "") {
  //     helper.showTextToast("Please select car status.", Colors.theme)
  //     return
  //   }
  //   if (CityCountry == "" || AreaLocation == "") {
  //     helper.showTextToast("Please enter your country and location", Colors.theme)
  //     return
  //   }

  //   let body = "partrequest_title[0]=" + CarPart + "&partrequest_desc[0]=" + PartCode
  //     // + "&partrequest_thumb[0]=" + PhotoPath.photo_path
  //     + "&partrequest_vehicle=" + Car + "&partrequest_year=" +
  //     ManufacturingYear + "&partrequest_desc[1]=" + Alternative + "&partrequest_engines=" +
  //     Engines + "&partrequest_chassis=" + ChasicSeries + "&partrequest_product_type=" + Status_ +
  //     "&partrequest_delivery_city=" + CityCountry + "&partrequest_delivery_location=" + AreaLocation

  //   setisLoading(true)       //--- Loader On

  //   apiHandler.sendSecurePostRequest(
  //     Urls.ASK_OFFER,
  //     body,
  //     (resp) => {
  //       console.log("\x1b[31m-------ASK OFFER-------->>>>", resp.data)

  //       // if (resp.status == "success") {
  //       //   helper.showTextToast(resp.message, Colors.theme)
  //       //   setisLoading(false)

  //       //   return
  //       // }
  //       // else {
  //       //   helper.showTextToast(resp.message, Colors.theme)
  //       // }
  //         setisLoading(false)

  //       // return
  //       // setWishlistDetail(resp.data?.details)
  //     },
  //     (error) => {
  //       helper.showTextToast(error, Colors.theme)
  //       setisLoading(false)
  //     }
  //   )
  // }

  function dropdown_ApiCaller() {
    // setisLoading(true)       //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.DROPDOWN_ASK_OFFER,
      "",
      (resp) => {
        // console.log("\x1b[36m------------ADDPART_DROPDOWN-------->>>>>>>", resp.data?.partrequest_vehicle)

        // return
        setListItems(resp.data);
        // setisLoading(false)
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        // setisLoading(false)
      }
    );
  }

  function galleryImageController() {
    // setPhotoLoading(true)
    ImagePicker.openPicker({
      width: 0,
      height: 0,
      includeBase64: true,
      cropping: Platform.OS == "ios" ? false : true,
      compressImageQuality: 0.1,
    }).then((image) => {
      console.log("\x1b[32m=======IMAGE PICKER.DATA =========>", image.data);
      setPhotoPath({
        // photo_path: image.path,
        photo_path: image.data,
        photomime: image.mime,
      });

      // askOffer_ApiCaller(`data:${image.mime};base64,${image.data}`)
    });
  }

  function imageRemover() {
    ImagePicker.clean()
      .then(() => {
        console.log("==== removed all tmp images from tmp directory ====");
        setPhotoPath("");
        helper.showTextToast("Photo Removed", Colors.theme);
      })
      .catch((e) => {
        // alert(e);
        helper.showTextToast(e, Colors.theme);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: Colors.gray1,
      }}
    >
      <Header
        StatusbarColor={
          (CarModel || YearModel || StatusModel || CountryCityModel) == true
            ? Colors.blackHexColor
            : Colors.theme
        }
        BarStyle={"dark-content"}
        backButton={false}
        GoBack={() => {}}
        Title={"Ask Offer"}
      />

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
          <Text_Statement Statement={"What car part are you looking for?"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={CarPart}
            OnChangeText={(text) => {
              setCarPart(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Part code or other details"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={PartCode}
            OnChangeText={(text) => {
              setPartCode(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Photos"} />
          {/* =========== Choose Photo ============*/}
          {PhotoPath == "" ? (
            <TouchableOpacity
              onPress={() => {
                galleryImageController();
              }}
              activeOpacity={0.5}
              style={{
                // width: wp(30),
                // height: hp(7),
                paddingHorizontal: wp(3),
                paddingVertical: hp(2),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: hp(1.5),
                borderColor: Colors.gray3,
                borderWidth: 1.5,
                // marginLeft: wp(4),
                marginVertical: hp(1.5),
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.2),
                  color: Colors.black_text,
                  fontWeight: "600",
                }}
              >
                Choose photo
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                // borderRadius: hp(1.5),
                // borderColor: Colors.gray3,
                // borderWidth: 1.5,
                // marginLeft: wp(4),
                marginVertical: hp(1.5),
                alignSelf: "center",
              }}
            >
              <Image
                resizeMode="cover"
                source={{
                  uri: `data:image/png;base64,` + PhotoPath.photo_path,
                }}
                style={{
                  width: wp(40),
                  height: hp(20),
                  borderRadius: hp(1.5),
                  borderWidth: 1,
                  borderColor: Colors.gray2,
                }}
              ></Image>

              <TouchableOpacity
                onPress={() => {
                  imageRemover();
                }}
                activeOpacity={0.5}
                style={{
                  width: hp(4),
                  height: hp(4),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: hp(50),
                  backgroundColor: Colors.blackHexColor,
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              >
                <Ionicons name="close" size={20} color={Colors.theme} />
              </TouchableOpacity>
            </View>
          )}

          <Text_Statement Statement={"For what car?"} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: hp(6),
              borderRadius: hp(1),
              borderColor: Colors.gray2,
              borderWidth: 1,
              marginVertical: hp(2),
              paddingHorizontal: wp(3),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: hp(2.2),
                color: Car == "" ? Colors.gray1 : Colors.black_text,
                // fontWeight: '600',
                // backgroundColor: 'plum',
                flex: 1,
              }}
            >
              {Car ? Car : "Not Selected"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setCarModel(true);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: hp(1),
                // backgroundColor: 'plum',
              }}
            >
              <Ionicons name="chevron-down" size={20} color={Colors.gray2} />
            </TouchableOpacity>
          </View>

          <Text_Statement Statement={"Manufacturing year"} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: hp(6),
              borderRadius: hp(1),
              borderColor: Colors.gray2,
              borderWidth: 1,
              marginVertical: hp(2),
              paddingHorizontal: wp(3),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: hp(2.2),
                color:
                  ManufacturingYear == "" ? Colors.gray1 : Colors.black_text,
                // fontWeight: '600',
                // backgroundColor: 'plum',
                flex: 1,
              }}
            >
              {ManufacturingYear ? ManufacturingYear : "Not Selected"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setYearModel(true);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: hp(1),
                // backgroundColor: 'plum',
              }}
            >
              <Ionicons name="chevron-down" size={20} color={Colors.gray2} />
            </TouchableOpacity>
          </View>

          <Text_Statement Statement={"Alternative"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Alternative}
            OnChangeText={(text) => {
              setAlternative(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Engines"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Engines}
            OnChangeText={(text) => {
              setEngines(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Chassic series"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={ChasicSeries}
            OnChangeText={(text) => {
              setChasicSeries(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Status"} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: hp(6),
              borderRadius: hp(1),
              borderColor: Colors.gray2,
              borderWidth: 1,
              marginVertical: hp(2),
              paddingHorizontal: wp(3),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: hp(2.2),
                color: Status_ == "" ? Colors.gray1 : Colors.black_text,
                // fontWeight: '600',
                // backgroundColor: 'plum',
                flex: 1,
              }}
            >
              {Status_ ? Status_ : "Not Selected"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setStatusModel(true);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: hp(1),
                // backgroundColor: 'plum',
              }}
            >
              <Ionicons name="chevron-down" size={20} color={Colors.gray2} />
            </TouchableOpacity>
          </View>

          <Text_Statement Statement={"Delivery Country/City"} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: hp(6),
              borderRadius: hp(1),
              borderColor: Colors.gray2,
              borderWidth: 1,
              marginVertical: hp(2),
              paddingHorizontal: wp(3),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: hp(2.2),
                color: CityCountry == "" ? Colors.gray1 : Colors.black_text,
                // fontWeight: '600',
                // backgroundColor: 'plum',
                flex: 1,
              }}
            >
              {CityCountry ? CityCountry : "Not Selected"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setCountryCityModel(true);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: hp(1),
                // backgroundColor: 'plum',
              }}
            >
              <Ionicons name="chevron-down" size={20} color={Colors.gray2} />
            </TouchableOpacity>
          </View>

          <Text_Statement Statement={"Delivery Area/Location"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={AreaLocation}
            OnChangeText={(text) => {
              setAreaLocation(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          {/* ============ PostButton =========== */}
          {isLoading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
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
                  askOffer_ApiCaller();
                }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Request A Quote Now"}
              />
            </View>
          )}
        </ScrollView>
      </View>

      {CarModel && (
        <Modal
          animationType="fade"
          transparent={true}
          // visible={CarModel}
          onRequestClose={() => {
            setCarModel(!CarModel);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.blackHexColor,
              // position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: wp(80),
                // height: hp(20),
                paddingVertical: hp(3),
                marginVertical: hp(3),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.partrequest_vehicle}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCar(item.vehicle_name), setCarModel(false);
                      }}
                      style={
                        {
                          // backgroundColor:'plum',
                          // flex:1
                        }
                      }
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: hp(2.5),
                          color: Colors.black_text,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.gray1,
                          marginVertical: hp(1),
                        }}
                      >
                        {item.vehicle_name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {YearModel && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={YearModel}
          onRequestClose={() => {
            setYearModel(!YearModel);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.blackHexColor,
              // position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: wp(80),
                // height: hp(20),
                marginVertical: hp(3),
                paddingVertical: hp(3),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.partrequest_year}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setManufacturingYear(item.value), setYearModel(false);
                      }}
                      style={
                        {
                          // backgroundColor:'plum',
                          // flex:1
                        }
                      }
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: hp(2.5),
                          color: Colors.black_text,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.gray1,
                          marginVertical: hp(1),
                        }}
                      >
                        {item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {StatusModel && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={StatusModel}
          onRequestClose={() => {
            setStatusModel(!StatusModel);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.blackHexColor,
              // position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: wp(80),
                // height: hp(20),
                marginVertical: hp(3),
                paddingVertical: hp(3),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.partrequest_product_type}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setStatus(item.value), setStatusModel(false);
                      }}
                      style={
                        {
                          // backgroundColor:'plum',
                          // flex:1
                        }
                      }
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: hp(2.5),
                          color: Colors.black_text,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.gray1,
                          marginVertical: hp(1),
                        }}
                      >
                        {item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      )}

      {CountryCityModel && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={CountryCityModel}
          onRequestClose={() => {
            setCountryCityModel(!CountryCityModel);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.blackHexColor,
              // position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: wp(80),
                // height: hp(20),
                marginVertical: hp(3),
                paddingVertical: hp(3),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.partrequest_delivery_city}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCityCountry(item.value), setCountryCityModel(false);
                      }}
                      style={
                        {
                          // backgroundColor:'plum',
                          // flex:1
                        }
                      }
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: hp(2.5),
                          color: Colors.black_text,
                          borderBottomWidth: 1,
                          borderBottomColor: Colors.gray1,
                          marginVertical: hp(1),
                        }}
                      >
                        {item.value}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
