import React, { Component } from "react";
import { Alert, Linking } from "react-native";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import moment from "moment";
export default class Helpers {
  isEmptyString(str) {
    return str == "" || !str;
  }

  isEmptyArray(arr) {
    return !arr || arr.length == 0;
  }

  isValidEmail(num) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(num);
  }

  isValidIntNum(num) {
    // var re = num.replace(/[- #*+;,.<>\{\}\[\]\\\/]/gi, '')
    var re = num.replace(
      /[-A-Za-z :'":!()?"@$=€&|~•^βαπ©¥%%¢¥`®™¤Δž¤£√_&#*+;,.<>\{\}\[\]\\\/]/gi,
      ""
    );
    return re;
  }

  isValidPositiveNumber(num) {
    var re = num.replace(
      /[-A-Za-z :'":!()?"@$=€&|~•^βαπ©¥%%¢¥`®™¤Δž¤£√_&#*+;,<>\{\}\[\]\\\/]/gi,
      ""
    );
    return re;
  }

  isSpecialCharacterFreeText(num) {
    var re = num.replace(
      /[-:'":!()?"$=€&|~•.^βαπ©¥%%¢¥`®™¤Δž¤£√_&#*+;,<>\{\}\[\]\\\/]/gi,
      ""
    );
    return re;
  }

  isSpecialCharacterAndNumFreeText(num) {
    var re = num.replace(
      /[\s.;,-:'"0:!()%@?"$=€&|~•.^βαπ©¥%%¢¥`®™¤Δž¤£√_&#*+;,<>\{\}\[\]\\\/?%0-9]/,
      ""
    );
    return re;
  }

  dateCorrecter(receiveDate) {
    var date = receiveDate.split("-");
    if (parseInt(date[0]) < 10) {
      date[0] = "0" + date[0];
    }
    if (parseInt(date[1]) < 10) {
      date[1] = "0" + date[1];
    }
    if (parseInt(date[2]) < 10) {
      date[2] = "0" + date[2];
    }
    date = date[0] + "-" + date[1] + "-" + date[2];
    return date;
  }

  showTextToast(message, BGColor, TextColor) {
    Toast.show(message, Toast.SHORT);
    // Toast.show(message, Toast.SHORT, {
    //   backgroundColor: BGColor ? BGColor : "#000",
    //   textColor: TextColor ? TextColor : "#fff",
    // });
  }

  // showToast(message, background, color) {
  //     Snackbar.show({
  //         text: message,
  //         duration: Snackbar.LENGTH_SHORT,
  //         backgroundColor: background ? background : "#000",
  //         textColor: color ? color : 'white',
  //         action: {
  //             text: 'Ok',
  //             textColor: 'white',
  //         },
  //     });
  // }

  profileImageGenerator(email, profile) {
    if (profile == "") {
      console.log("IMG Link -->", "https://i.stack.imgur.com/l60Hf.png");
      return "https://i.stack.imgur.com/l60Hf.png";
    } else {
      let tempImg = DOMAIN + PRE_IMAGE_Link + email + "/" + profile;
      return tempImg;
    }
  }

  clientImageGenerator(profile) {
    if (profile == "") {
      return "https://i.stack.imgur.com/l60Hf.png";
    } else {
      let tempImg = DOMAIN + PRE_IMAGE_Link_FOR_CLIENT + profile;
      return tempImg;
    }
  }

  currentTime() {
    // let currentTime = moment().utcOffset('+05:00').format('hh:mm:ss')
    let currentTime = moment().utcOffset("+05:00").format("hh:mm A");
    return currentTime;
  }

  timeCalculations(startTimeTemp) {
    let currentTime = this.currentTime();
    let startTime = this.currentTime();

    console.log("current Time", currentTime);
    console.log("start Time", startTime);

    return currentTime.diff(startTime, "hours");
  }

  resetAndGo(navigation, routeName) {
    if (navigation && !this.isEmptyString(routeName)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName }],
        })
      );
    }
  }

  hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        "," +
        alpha +
        ")"
      );
    }
    return "";
  }

  showAlert(title, msg, color) {
    Alert.alert(title, msg, [{ text: "Okay", style: "cancel" }]);
  }

  openWebLink(urlLink) {
    Linking.canOpenURL(urlLink).then((supported) => {
      if (supported) {
        Linking.openURL(urlLink);
      } else {
        console.log("Don't know how to open URI: " + urlLink);
      }
    });
  }

  getDaysInfo() {
    return {
      SUN: { index: 0, name: "Sunday" },
      MON: { index: 1, name: "Monday" },
      TUE: { index: 2, name: "Tuesday" },
      WED: { index: 3, name: "Wednesday" },
      THU: { index: 4, name: "Thursday" },
      FRI: { index: 5, name: "Friday" },
      SAT: { index: 6, name: "Saturday" },
    };
  }

  getWithZero(num) {
    return ("0" + num).slice(-2);
  }

  getFormatedTime(time) {
    if (time) {
      const today = moment(new Date()).format("YYYY-DD-MM");
      return moment(`${today}:${time}`, "YYYY-DD-MM HH:mm:ss").toDate();
    }
    return "";
  }

  removeEmojis(string) {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, "");
  }
}
