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

export default function AddParts() {
  const navigation = useNavigation();

  const [user_token, setUser_token] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [Selling, setSelling] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [Car, setCar] = useState("");
  const [Status_, setStatus] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [Price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [PhotoPath, setPhotoPath] = useState("");
  // const [PhotoLoading, setPhotoLoading] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
  const [modalVisibleThree, setModalVisibleThree] = useState(false);

  const [ListItems, setListItems] = useState([]);

  useEffect(() => {
    changeNavigationBarColor(Colors.bottamTabColor);
    getCompleteUserDataLocally();

    // initializeData()
    dropdown_ApiCaller();

    // alert("helo")
  }, [1]);

  function initializeData() {
    setSelling("");
    setDescription("");
    setCategory("");
    setPhotoPath("");
    setCar("");
    setVehicle("");
    setStatus("");
    setPrice("");
    setQuantity("");
  }

  function getCompleteUserDataLocally() {
    prefManager.getUserSessionData((data) => {
      console.log("\x1b[34m====ADDPART GetData====", JSON.stringify(data));

      // setToken(data.data?.token)
      setUser_token(data?.data?.token);
      // console.log("\x1b[35m======== UserEmail State =========", userEmail)
    });
  }

  function askOffer_ApiCaller(imageLink) {
    if (Selling == "" || Price == "" || Quantity == "") {
      helper.showTextToast("Must fill all fields.", Colors.theme);
      return;
    }
    if (PhotoPath.photo_path == "") {
      helper.showTextToast("Please select photo.", Colors.theme);
      return;
    }
    if (Category == "") {
      helper.showTextToast("Please select category.", Colors.theme);
      return;
    }
    if (Status_ == "") {
      helper.showTextToast("Please select status.", Colors.theme);
      return;
    }
    // if (Price == "") {
    //   helper.showTextToast("Please enter the price.", Colors.theme)
    //   return
    // }

    setisLoading(true); //--- Loader On

    let data = new FormData();
    data.append(
      "product_slides[0]",
      `data:${PhotoPath.photomime};base64,${PhotoPath.photo_path}`
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAopElEQVR42u2deXxU5b3',
    );

    data.append("product_name", Selling);
    data.append("product_details", Description);
    data.append("product_subcategory", Category);
    // data.append("product_slides[0]", imageLink);
    // data.append("product_slides[0]", `data:image/png;base64,${imageLink}`);
    data.append("product_type", Car);
    data.append("product_status", Status_);
    data.append("product_price", Price);
    data.append("product_qty", Quantity);
    data.append("product_vehicles", Car);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://demo.exultcybersolution.in/api/sell/create",
      // url: Urls.ADD_PART,
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
        console.log("\x1b[31m-------ADD_PART------->>>>", response.data);

        if (response.data.code == "200") {
          // helper.showTextToast(response.message, Colors.theme)
          initializeData();
          setisLoading(false);
          helper.showTextToast("Uploaded.", Colors.theme);

          return;
        } else {
          // helper.showTextToast(response.message, Colors.theme)
          helper.showTextToast("Image source not readable.", Colors.theme);
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

  function dropdown_ApiCaller() {
    // setisLoading(true)       //--- Loader On

    apiHandler.sendSecurePostRequest(
      Urls.DROPDOWN_ADDPART_CATEGORY,
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
      // askOffer_ApiCaller(image.data)
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
          (modalVisible || modalVisibleTwo || modalVisibleThree) == true
            ? Colors.blackHexColor
            : Colors.theme
        }
        BarStyle={"dark-content"}
        backButton={false}
        GoBack={() => {}}
        Title={"Add Part"}
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
          <Text_Statement Statement={"What piece are you selling?"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Selling}
            OnChangeText={(text) => {
              setSelling(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Description"} />
          <TextInputs
            Keyboardtype={"default"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Description}
            OnChangeText={(text) => {
              setDescription(text);
            }}
            ReturnType={"default"}
            MultiLines={true}
            NumOfLines={3}
            Width={wp(90)}
            Height={hp(12)}
          />

          <Text_Statement Statement={"Category"} />

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
                color: Category == "" ? Colors.gray1 : Colors.black_text,
                // fontWeight: '600',
                // backgroundColor: 'plum',
                flex: 1,
              }}
            >
              {Category ? Category : "Not Selected"}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
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
                setModalVisibleTwo(true);
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
                setModalVisibleThree(true);
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

          <Text_Statement Statement={"Price"} />
          <TextInputs
            Keyboardtype={"numeric"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Price}
            OnChangeText={(text) => {
              setPrice(text);
            }}
            ReturnType={"default"}
            MultiLines={false}
            NumOfLines={1}
            Width={wp(90)}
            Height={hp(6)}
          />

          <Text_Statement Statement={"Quantity"} />
          <TextInputs
            Keyboardtype={"numeric"}
            AutoCapital={"none"}
            PlaceHolder={""}
            PlaceHolderColor={Colors.gray1}
            Value={Quantity}
            OnChangeText={(text) => {
              setQuantity(text);
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
                  askOffer_ApiCaller();
                }}
                Width={wp(90)}
                Height={hp(6)}
                BtnTitle={"Post Your Ad"}
              />
            </View>
          )}
        </ScrollView>
      </View>

      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          // visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.blackHexColor,
              // position: 'absolute',
              alignItems: "center",
              justifyContent: "center",
              // marginVertical
            }}
          >
            <View
              style={{
                width: wp(80),
                // height: hp(20),
                paddingVertical: hp(2),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginVertical: hp(7),
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.subcategory}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => {
                        setCategory(item.value), setModalVisible(false);
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

      {modalVisibleTwo && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleTwo}
          onRequestClose={() => {
            setModalVisibleTwo(!modalVisibleTwo);
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
                paddingVertical: hp(2),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginVertical: hp(7),
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.models}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      // key={item.vehicle_id}
                      onPress={() => {
                        setCar(item.value), setModalVisibleTwo(false);
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

      {modalVisibleThree && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleThree}
          onRequestClose={() => {
            setModalVisibleThree(!modalVisibleThree);
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
                paddingVertical: hp(2),
                backgroundColor: Colors.secondary_color,
                borderRadius: hp(1),
                // top: hp(35),
                // alignSelf: 'center',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginVertical: hp(7),
                paddingHorizontal: wp(4),
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ListItems.productType}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      // key={item.id}
                      onPress={() => {
                        setStatus(item.value), setModalVisibleThree(false);
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
      {/* 
      {isLoading &&
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.blackHexColor,
            // position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            color={Colors.theme}
            style={{
              // alignSelf: 'center',
            }}
          ></ActivityIndicator>
        </View>
      } */}
    </View>
  );
}
