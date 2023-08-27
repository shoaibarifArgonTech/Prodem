import AsyncStorage from "@react-native-async-storage/async-storage";
const USER_SUBMIT_ATTENDANCE_TYPE = "@EmployeeAttendanceType:AttendanceType";

const USER_SESSION_DATA_KEY = "@Session:UserData";
const IS_LOGIN_KEY = "@Session:IsUserLogin";
const IS_NOTIFICATIONS = "@Session:IsNotificationTurnOn";
const IS_THEME = "@Session:IsTHEMEISDARK";
const IS_TRIP_RECORDING = "@Session:IsTripRecording";
const CART_DATA = "@Cart:cartItemData";

export default class PrefManager {
  createUserSession = async (sessionData) => {
    try {
      await AsyncStorage.setItem(
        USER_SESSION_DATA_KEY,
        JSON.stringify(sessionData)
      );
      console.log("====createUserSession done=====");
      // alert('user session done')
    } catch (ex) {
      console.warn(ex.message);
      console.log("=====createUserSession fail====");
    }
  };

  getUserSessionData = async (onLoaded) => {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    let jData = data ? JSON.parse(data) : null;
    onLoaded(jData);
  };

  updateSessionToken = async (token) => {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    if (data) {
      let jData = JSON.parse(data);
      console.log("\x1b[31m=====UPDATE_Session ====>>>>", jData);

      jData.sessionToken = token;
      await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
    }
  };

  destroySession = async () => {
    try {
      await AsyncStorage.multiRemove([USER_SESSION_DATA_KEY, IS_LOGIN_KEY]);
      console.log("=====destroySession done====");
    } catch (ex) {
      console.warn(ex.message);
      console.log("====destroySession fail=====");
    }
  };

  updateLoginStatus = async (isLogin) => {
    try {
      await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? "true" : "false");
      console.log("\x1b[31m====updateLoginStatus done====");
    } catch (ex) {
      console.warn(ex.message);
      console.log("=====updateLoginStatus fail====");
    }
  };

  isUserLoggedIn = async (onResult) => {
    try {
      const val = await AsyncStorage.getItem(IS_LOGIN_KEY);
      onResult(val && val == "true");
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  };

  saveCartData = async (cartData) => {
    try {
      await AsyncStorage.setItem(CART_DATA, JSON.stringify(cartData));
      console.log("==============saveCartData  DONE================");
    } catch (ex) {
      console.log(
        "==============ERROR saveCartData================",
        ex.message
      );
    }
  };
  getSaveCartData = async (onLoaded) => {
    try {
      let data = await AsyncStorage.getItem(CART_DATA);
      let jData = data ? JSON.parse(data) : null;
      onLoaded(jData);
      console.log("==============getSaveCartData  DONE================");
    } catch (ex) {
      console.log(
        "==============ERROR getSaveCartData================",
        ex.message
      );
    }
  };

  //--------------save attendance type--------------------

  saveAttendanceSession = async (type) => {
    try {
      await AsyncStorage.setItem(USER_SUBMIT_ATTENDANCE_TYPE, type);
      console.log("Atendance submission done", type);
    } catch (ex) {
      console.warn(ex.message);
      console.log("Atendance submission  fail");
    }
  };
  //--------------Get attendance type--------------------

  getAttendanceSession = async (onLoaded) => {
    try {
      let data = await AsyncStorage.getItem(USER_SUBMIT_ATTENDANCE_TYPE);
      onLoaded(data);
      console.log("get Atendance done");
    } catch (ex) {
      console.warn(ex.message);
      console.log("get Atendance fail");
    }
  };

  //--------------Notification State Controller--------------------
  setUpNotificationsState = async (isNotification) => {
    await AsyncStorage.setItem(
      IS_NOTIFICATIONS,
      isNotification ? "true" : "false"
    );
  };
  getUpNotificationsState = async (onResult) => {
    try {
      const val = await AsyncStorage.getItem(IS_NOTIFICATIONS);
      onResult(val && val == "true");
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  };

  //--------------Theme State Controller--------------------
  setUpThemeState = async (isNotification) => {
    await AsyncStorage.setItem(IS_THEME, isNotification ? "true" : "false");
  };
  getUpThemeState = async (onResult) => {
    try {
      const val = await AsyncStorage.getItem(IS_THEME);
      onResult(val && val == "true");
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  };

  //-------------Trip Recording Controller-------------
  createStatusOfTrip = async (sessionData) => {
    await AsyncStorage.setItem(IS_TRIP_RECORDING, sessionData);
  };
  getStatusOfTrip = async (onLoaded) => {
    let data = await AsyncStorage.getItem(IS_TRIP_RECORDING);
    // let jData = data ? JSON.parse(data) : null
    let jData = data ? data : null;
    onLoaded(jData);
  };
  deleteStatusOfTrip = async () => {
    let data = await AsyncStorage.removeItem(IS_TRIP_RECORDING);
  };
}
