import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Platform,
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
import Feather from "react-native-vector-icons/Feather";
import OneSignal from "react-native-onesignal";
import Account_DetailsTab from "../../../ReuseableComponents/Account_DetailsTab";
import { useNavigation, CommonActions } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import ProfilePicTab from "../../../ReuseableComponents/ProfilePicTab";

import Helpers from "../../../Views/Data/Helpers";
import Urls from "../../../Views/Data/Urls";
import ApiHandler from "../../../Views/Data/ApiHandler";
import PrefManager from "../../../Views/Data/PrefManager";
import ProfileDetail_Tab from "../../../ReuseableComponents/ProfileDetail_Tab";
import axios from "axios";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

export default function Account_Screen() {
  const navigation = useNavigation();

  const [DetailList, setDetailList] = useState([
    {
      img: require("../../../Assets/Images/user.png"),
      TabName: "Profile Details",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/orderreceive.png"),
      TabName: "Order Received",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/orderplace.png"),
      TabName: "Order Placed",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/notification.png"),
      TabName: "Notifications",
      // Counter: "0",
    },
    // {
    //   img: require('../../../Assets/Images/AccountScreen/addpart.png'),
    //   TabName: "Add Part"
    // },
    {
      img: require("../../../Assets/Images/AccountScreen/wish.png"),
      TabName: "Wishlist",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/mypart.png"),
      TabName: "My Part",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/mypartreq.png"),
      TabName: "My Part Request",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/mybidreq.png"),
      TabName: "My Bid Request",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/win.png"),
      TabName: "Winning Bids",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/subscription.png"),
      TabName: "Subscription",
    },
    // {
    //   img: require('../../../Assets/Images/AccountScreen/subscription.png'),
    //   TabName: "Active Plan"
    // },
    {
      img: require("../../../Assets/Images/AccountScreen/star.png"),
      TabName: "Ratings",
    },
    {
      img: require("../../../Assets/Images/AccountScreen/offer.png"),
      TabName: "Parts Offer",
    },

    {
      img: require("../../../Assets/Images/AccountScreen/logout.png"),
      TabName: "Logout",
    },
  ]);
  const [user_token, setUser_token] = useState("");
  const [user_ID, setUser_ID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCode, setUserCode] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [UpdatePhoto, setUpdatePhoto] = useState("");
  const [Photobase64, setphotobase64] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [ProfilePicModalVisible, setProfilePicModalVisible] = useState(false);
  const [locallyStoredData, setLocallyStoredData] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getCompleteUserDataLocally();
  }, [1]);

  function getCompleteUserDataLocally() {
    prefManager.getUserSessionData((data) => {
      console.log(
        "\x1b[34m====AccountScreen GetData====",
        JSON.stringify(data, null, 4)
      );

      // var Token = data.data?.token
      // setToken(data.data?.token)
      setUserName(data?.data?.userDetails?.p_user_name);
      setUser_token(data?.data?.token);
      setUser_ID(data?.data?.userDetails?.p_user_id);
      setUserEmail(data?.data?.userDetails?.p_user_email);
      setUserCode(data?.data?.userDetails?.p_user_mobile);
      setUserPicture(data?.data?.userDetails?.p_user_photo);
      setLocallyStoredData(data);
      // console.log("\x1b[35m======== UserEmail State =========", userEmail)
    });
  }

  const setNotifications = async () => {
    const notificationCount = await fetch(
      "https://demo.exultcybersolution.in/api/notification"
    )
      .then((response) => response.json())
      .then((data) => data.count)
      .catch((error) => {
        console.error("Error retrieving notification count:", error);
        return 0;
      });

    // Set the notification count using OneSignal
    OneSignal.setBadgeCount(notificationCount);

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        // Increment the notification count by 1
        const currentCount = OneSignal.getBadgeCount();
        OneSignal.setBadgeCount(currentCount + 1);

        // Continue displaying the notification
        notificationReceivedEvent.complete(
          notificationReceivedEvent.getNotification()
        );
      }
    );
  };

  function galleryImageController() {
    // setPhotoLoading(true)
    setProfilePicModalVisible(false);

    // global.Buffer = require('buffer').Buffer;

    ImagePicker.openPicker({
      width: 0,
      height: 0,
      includeBase64: true,
      cropping: Platform.OS == "ios" ? false : true,
      compressImageQuality: 0.1,
    }).then((image) => {
      // console.log('\x1b[32m=======IMAGE PICKER =========>', image)

      // const image_bytes = Buffer.from(image.data, "base64");
      // console.log('\x1b[33m=======IMAGEBYTES ========', image_bytes.data);

      setUpdatePhoto({
        // photo_path: image.path,
        photo_path: image.data,
        photomime: image.mime,
      });

      // setUpdatePhoto({
      //   photo_path: `data:${image.mime};base64,${image.data}`,
      //   photomime: image.mime,
      // })
      // console.log('\x1b[31m=======IMAGE_URL_=========>', UpdatePhoto.photo_path)
      // console.log('\x1b[31m=======IMAGE_URL_=========>', image.data)

      // setTimeout(() => {
      // photoUpdate_ApiCaller(image.data)
      photoupdateApi(image.data);
      // photoupdateApi()
      // }, 1000);
    });

    // imgToBase64(UpdatePhoto.photo_path)
  }
  function cameraImageController() {
    // this.setState({ generalModalVisibility: false })
    setProfilePicModalVisible(false);

    ImagePicker.openCamera({
      width: 0,
      height: 0,
      includeBase64: true,
      cropping: Platform.OS == "ios" ? false : true,
      compressImageQuality: 0.1,
    }).then((image) => {
      // console.log(image);
      // console.log('\x1b[32m=======IMAGE PICKER =========>', image)
      // setUpdatePhoto({
      //   photo_path: `data:${image.mime};base64,${image.data}`,
      //   photomime: image.mime,
      // })

      setUpdatePhoto({
        photo_path: image.data,
        photomime: image.mime,
      });
      // console.log('\x1b[33m=======IMAGE_URL_BASE64=========>', UpdatePhoto.photo_path)

      photoupdateApi(image.data);
      // photoupdateApi()
    });

    // setTimeout(() => {
    // photoUpdate_ApiCaller(UpdatePhoto.photo_path)
    // }, 1000);
  }

  function photoUpdate_ApiCaller(imagePath) {
    // let linkIntoJson = JSON.stringify(imagePath)
    // console.log('\x1b[32m--------------------------------------------------------', linkIntoJson)

    // let body = "photo_base64=" + imagePath
    // setModalVisible(true)

    var body = new FormData();
    // body.append('user_id', user_ID);
    body.append("photo_base64", {
      uri: imagePath,
      name: "user_Profile_picture.jpeg",
      // type: 'image/jpg'
      type: UpdatePhoto.photomime,
    });

    apiHandler.sendSecureImagePostRequest(
      Urls.UPDATE_PHOTO,
      body,
      (resp) => {
        console.log("\x1b[33m-------UPDATE_PHOTO-------->>>>", resp.data);

        // update data locally
        // var tempLocalData = locallyStoredData
        //           tempLocalData[0].user_image = imagePath,
        //               prefManager.createUserSession(tempLocalData)
        //           this.getCompleteUserDataLocally()
        // console.log("\x1b[31m-------tempLocalData-------->>>>", tempLocalData)
        setModalVisible(false);

        return;
        getCompleteUserDataLocally();

        if (resp.code == 200) {
          helper.showTextToast(resp.message, Colors.theme);
          setModalVisible(false);
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
          setModalVisible(false);
        }

        // return
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        // setisLoading(false)
        setModalVisible(false);
      }
    );
  }

  function photoupdateApi(imagedata) {
    setModalVisible(true);
    let data = new FormData();
    data.append(
      "photo_base64",
      "data:image/jpeg;base64," + imagedata
      // `data:${UpdatePhoto.photomime};base64,${UpdatePhoto.photo_path}`,
      // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAopElEQVR42u2deXxU5b3',
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: 'https://demo.exultcybersolution.in/api/profile/update-photo',
      url: Urls.UPDATE_PHOTO,
      headers: {
        lang: "en",
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.',

        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + " " + user_token,
        // Cookie: 'ci_session=vnd7ksc7gfog5rht444jej83d1hsc7en',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("==========updatephoto=====>>>>>>>>", response.data);

        // update data locally
        // var tempLocalData = locallyStoredData
        // if(response.data.code == 200 ){

        // let tempLocalData = locallyStoredData
        // tempLocalData.data[0].userDetails?.p_user_photo = imagedata,
        // imagedata = tempLocalData.data[0].userDetails[0]?.p_user_photo,
        // prefManager.createUserSession(tempLocalData)
        // getCompleteUserDataLocally()
        // console.log("\x1b[31m-------tempLocalData-------->>>>", tempLocalData)

        // setUserPicture(response?.data?.data?.details?.p_user_photo);
        setModalVisible(false);
        helper.showTextToast("Success", Colors.theme);

        // }
      })
      .catch((error) => {
        console.log(error);
        setModalVisible(false);
        helper.showTextToast(error.message, Colors.theme);
      });
  }

  function imgToBase64(imagePath) {
    // fetch('file:///storage/emulated/0/Android/data/com.prodem.bw/files/Pictures/73d71eb4-cff9-4f0c-b869-f6c8b2e0cc6a.jpg')
    fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result;
          setphotobase64(base64data);
          // console.log("\x1b[34m=====================>>>>>>>>>>>>>>>>>>>>>>", base64data); // Base64 string
          console.log(
            "\x1b[34m=====================>>>>>>>>>>>>>>>>>>>>>>",
            Photobase64
          ); // Base64 string
        };
        reader.readAsDataURL(blob);
      });
  }

  function logoutController() {
    setModalVisible(true); //-- indicator On

    // apiHandler.sendSecurePostRequest(
    //   Urls.USER_LOGOUT,
    //   "",
    //   (resp) => {
    //     console.log("\x1b[36m%s\x1b[0m -------LOGOUT_User------->>>", resp.data)

    // if (resp.status == "success") {
    setTimeout(() => {
      setModalVisible(false);
      prefManager.destroySession();
      helper.showTextToast("Logout Successfully", Colors.theme);
      helper.resetAndGo(navigation, "Account_ExistScreen");
    }, 1000);

    //   return
    // }
    //   },
    //   (error) => {
    //     helper.showTextToast(error, Colors.theme)
    //     setModalVisible(false)
    //   }
    // )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.secondary_color,
      }}
    >
      <StatusBar
        backgroundColor={
          modalVisible || ProfilePicModalVisible
            ? Colors.blackHexColorlight
            : Colors.secondary_color
        }
        translucent={false}
        // barStyle="light-content"
        barStyle="dark-content"
      />

      {/* ======= TOP INFO ======== */}
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: 'plum',
          marginHorizontal: wp(4),
          marginTop: hp(4),
        }}
      >
        <View
          style={
            {
              // backgroundColor: 'red',
            }
          }
        >
          <ImageBackground
            resizeMode="contain"
            source={require("../../../Assets/Images/nopic.png")}
            imageStyle={{
              borderRadius: 50,
            }}
            style={{
              width: hp(12),
              height: hp(12),
              // backgroundColor: 'plum',
              // marginBottom: hp(5),
            }}
          >
            <Image
              resizeMode="cover"
              // source={require('../../../Assets/Images/info.jpg')}
              // source={{ uri: "https://johannesippen.com/img/blog/humans-not-users/header.jpg" }}
              // source={{ uri: UpdatePhoto.photo_path }}
              // source={{ uri: Photobase64 }}
              source={{
                uri:
                  userPicture !== ""
                    ? userPicture
                    : "https://johannesippen.com/img/blog/humans-not-users/header.jpg",
              }}
              style={{
                width: hp(12),
                height: hp(12),
                // backgroundColor: 'plum',
                borderRadius: 100,
                // marginBottom: hp(5),
              }}
            ></Image>
          </ImageBackground>

          <TouchableOpacity
            onPress={() => {
              setProfilePicModalVisible(true);
            }}
            activeOpacity={0.5}
            style={{
              // backgroundColor: 'blue',
              position: "absolute",
              right: wp(-2),
              bottom: hp(-0.5),
              alignItems: "center",
              justifyContent: "center",
              // padding:hp(0.2),
              // borderRadius:hp(1)
            }}
          >
            <Image
              resizeMode="center"
              source={require("../../../Assets/Images/editpic.png")}
              style={{
                width: hp(4),
                height: hp(4),
                tintColor: Colors.theme,
              }}
            ></Image>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginLeft: wp(3),
            // alignItems: 'center',
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(2.1),
              color: Colors.black_text,
              // marginBottom: hp(1),
              fontWeight: "500",
              // textAlign:'left',
              // marginTop: hp(1.5),
            }}
          >
            {userName !== "" || userName !== null || userName !== undefined
              ? userName
              : "PRODEM AUTOMOTIVE SRL"}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              color: Colors.black_text,
              fontWeight: "500",
              // textAlign:'left',
            }}
          >
            {userEmail !== "" || userEmail !== null || userEmail !== undefined
              ? userEmail
              : "info.prodemautomotive@gmail.com"}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              color: Colors.black_text,
              fontWeight: "500",
              textAlign: "center",
              alignSelf: "flex-start",
              backgroundColor: Colors.white,
              borderRadius: hp(1.2),
              paddingHorizontal: wp(2),
              paddingVertical: hp(0.4),
              marginTop: hp(1),
            }}
          >
            {userCode == "" || userCode == null || userCode == undefined
              ? "no phone number"
              : userCode}
          </Text>
        </View>
      </View>

      {/* ======== Detail FlatList ========== */}
      <View
        style={{
          alignItems: "center",
          marginTop: hp(4),
          // backgroundColor: 'plum',
          flex: 1,
          // paddingBottom: hp(2)
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DetailList}
          renderItem={({ item }) => {
            return (
              <Account_DetailsTab
                OnAction={() => {
                  if (item.TabName == "Profile Details") {
                    navigation.navigate("ProfileDetails");
                    return;
                  }

                  if (item.TabName == "Order Received") {
                    navigation.navigate("Order_ReceivedScreen");
                    return;
                  }

                  if (item.TabName == "Order Placed") {
                    navigation.navigate("Order_PlacedScreen");
                    return;
                  }

                  if (item.TabName == "Notifications") {
                    navigation.navigate("Notification_Screen");
                    setCounter(0);
                    return;
                  }

                  if (item.TabName == "Add Part") {
                    navigation.navigate("AddParts");
                    return;
                  }

                  if (item.TabName == "Parts Offer") {
                    navigation.navigate("PartsOffer_Screen");
                    return;
                  }

                  if (item.TabName == "My Part") {
                    navigation.navigate("MyPart_Screen");
                    return;
                  }

                  if (item.TabName == "My Part Request") {
                    navigation.navigate("MyPart_Request");
                    return;
                  }

                  if (item.TabName == "My Bid Request") {
                    navigation.navigate("My_Bid_Request");
                    return;
                  }

                  if (item.TabName == "Wishlist") {
                    navigation.navigate("Wishlist_Screen");
                    return;
                  }

                  if (item.TabName == "Winning Bids") {
                    navigation.navigate("Winning_Bids");
                    return;
                  }

                  if (item.TabName == "Subscription") {
                    navigation.navigate("Subscription_plan");
                    return;
                  }

                  if (item.TabName == "Active Plan") {
                    navigation.navigate("Active_Plan");
                    return;
                  }

                  if (item.TabName == "Ratings") {
                    navigation.navigate("Rating_Screen");
                    return;
                  }

                  if (item.TabName == "Logout") {
                    logoutController();
                    return;
                  }
                }}
                TabImagePath={item.img}
                // TabImagePath={item.img}
                TabTitle={item.TabName}
                NotifyCounter={counter}
              />
            );
          }}
        />
      </View>

      {/* =========== Edit ========= */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UpdateProfile_Screen");
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: hp(1.5),
          right: wp(4),
          borderRadius: hp(50),
          padding: hp(1.2),
          backgroundColor: Colors.AuthScreenBlack,
        }}
      >
        <Feather name="edit" size={20} color={Colors.gray2} />
      </TouchableOpacity>

      {ProfilePicModalVisible && (
        <View
          style={{
            flex: 1,
            // width: wp(100),
            // height: hp(100),
            backgroundColor: Colors.blackHexColorlight,
            position: "absolute",
            // top: hp(35),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Modal
            animationType="slide"
            transparent={true}
            visible={ProfilePicModalVisible}
            onRequestClose={() => {
              setProfilePicModalVisible(!ProfilePicModalVisible);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.blackHexColor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  paddingVertical: hp(3),
                  paddingHorizontal: wp(6),
                  width: wp(70),
                  backgroundColor: Colors.secondary_color,
                  borderRadius: hp(1),
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // backgroundColor: 'plum',
                }}
              >
                <ProfilePicTab
                  OnAction={() => {
                    cameraImageController();
                  }}
                  TabIcon={require("../../../Assets/Images/AccountScreen/camprofile.png")}
                  TabTitle={"Camera"}
                />

                <ProfilePicTab
                  OnAction={() => {
                    galleryImageController();
                  }}
                  TabIcon={require("../../../Assets/Images/AccountScreen/galleryprofile.png")}
                  TabTitle={"Gallery"}
                />
              </View>
            </View>
          </Modal>
        </View>
      )}

      {modalVisible && (
        <View
          style={{
            // flex: 1,
            width: wp(100),
            height: hp(100),
            backgroundColor: Colors.blackHexColorlight,
            position: "absolute",
            // top: hp(35),
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
      )}
    </View>
  );
}
