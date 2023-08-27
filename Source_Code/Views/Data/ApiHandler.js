import React, { Component } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import Urls from "./Urls";
import AppConfig from "./AppConfig";
import Helper from "./Helpers";
import PrefManager from "./PrefManager";

const helper = new Helper();
const prefManager = new PrefManager();
const consoleAllowed = true;
// const API_KEY = AppConfig.api_key

export default class ApiHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendSimplePostRequest(url, _body, onResponse, onError) {
    // var body = _body + "&company_id=" + AppConfig.company_id
    var body = _body;
    if (consoleAllowed) {
      console.log("=====================API CALLED========================");
      console.log("URL=====> ", url);
      console.log("BODY PART=====> ", body);
    }

    axios
      .post(url, body, {
        // fetch.post(url, body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((resp) => {
        if (consoleAllowed) {
          console.log("Response======>", JSON.stringify(resp));
          // console.log("===Response Status======>", JSON.stringify(resp.data?.status))
        }

        if (
          resp.status == 200 ||
          resp.status == 201 ||
          resp.status == 202 ||
          resp.status == 203 ||
          resp.status == 204 ||
          resp.status == 205 ||
          resp.status == 206 ||
          resp.status == 207 ||
          resp.status == 208 ||
          resp.status == 226
        ) {
          if (resp.data?.status) {
            onResponse(resp.data);
            return;
          }
          if (!resp.data?.status == true) {
            onError(resp.data.message);
            return;
          }
        } else {
          onError(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        if (consoleAllowed) {
          console.log("Error=======>", ex);
        }
        if (ex == "Error: Network Error") {
          onError("Network Request Failed");
        } else {
          onError(ex.message);
        }
      });
  }

  sendSimpleGetRequest(url, _body, onResponse, onError) {
    // var body = _body + "&company_id=" + AppConfig.company_id
    var body = _body;
    if (consoleAllowed) {
      console.log("=====================API CALLED========================");
      console.log("URL=====> ", url);
      console.log("BODY PART=====> ", body);
    }

    axios
      .get(url, body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((resp) => {
        if (consoleAllowed) {
          console.log("Response======>", JSON.stringify(resp));
          // console.log("===Response Status======>", JSON.stringify(resp.data?.status))
        }

        if (
          resp.status == 200 ||
          resp.status == 201 ||
          resp.status == 202 ||
          resp.status == 203 ||
          resp.status == 204 ||
          resp.status == 205 ||
          resp.status == 206 ||
          resp.status == 207 ||
          resp.status == 208 ||
          resp.status == 226
        ) {
          if (resp.data?.status) {
            onResponse(resp.data);
            return;
          }
          if (!resp.data?.status == true) {
            onError(resp.data.message);
            return;
          }
        } else {
          onError(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        if (consoleAllowed) {
          console.log("Error=======>", ex);
        }
        if (ex == "Error: Network Error") {
          onError("Network Request Failed");
        } else {
          onError(ex.message);
        }
      });
  }

  sendSecurePostRequest(url, _body, onResponse, onError) {
    var body = _body;
    var token = "";

    prefManager.getUserSessionData((data) => {
      token = data.data?.token;
      console.log(
        "\x1b[36m%s\x1b[0m -------GETDATA SecPost APIHand------->>>",
        JSON.stringify(data.data?.token)
      );

      if (consoleAllowed) {
        console.log("=====================API CALLED========================");
        console.log("URL=====> ", url);
        // console.log("HEADER PART=====> ", 'Authorization:', 'Bearer' + ' ' + token,
        //     'API_KEY:', API_KEY)
        console.log(
          "HEADER PART=====> ",
          "Authorization:",
          "Bearer" + " " + token
        );
        console.log("BODY PART=====> ", body);
      }

      axios
        .post(url, _body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // 'Content-Type': 'application/json',
            Authorization: "Bearer" + " " + token,
            // 'API_KEY': API_KEY
          },
        })
        .then((resp) => {
          if (consoleAllowed) {
            console.log("Response======>", JSON.stringify(resp.data));
            // console.log("Response for Debug======>", JSON.stringify(resp))
          }
          if (resp.status == 200) {
            onResponse(resp.data);
            return;
          } else {
            console.log("Error in Method");
          }

          // if (resp.status == 200 || resp.status == 201 || resp.status == 202 || resp.status == 203 || resp.status == 204 || resp.status == 205
          //     || resp.status == 206 || resp.status == 207 || resp.status == 208 || resp.status == 226) {
          //     if (resp.data.success) {
          //         onResponse(resp.data)
          //         return
          //     }
          //     if (!resp.data.success) {
          //         onError(resp.data.message)
          //         return
          //     }
          // } else {
          //     onError(JSON.stringify(resp.data.message))
          // }
        })
        .catch((ex) => {
          if (consoleAllowed) {
            console.log("Error=======>", ex);
          }
          if (ex == "Error: Network Error") {
            onError("Network Request Failed");
          } else {
            onError(ex.message);
          }
        });
    });
  }

  sendSecureGetRequest(url, onResponse, onError) {
    var Token = "";

    prefManager.getUserSessionData((data) => {
      Token = data.data?.token;
      console.log(
        "\x1b[36m%s\x1b[0m -------GET DATA IN APIHANDLER------->>>",
        JSON.stringify(data.data?.token)
      );

      if (consoleAllowed) {
        console.log("=====================API CALLED========================");
        console.log("URL=====> ", url);
        // console.log("HEADER PART=====> ", 'Authorization:', 'Bearer' + ' ' + token,
        //     'API_KEY:', API_KEY)
        console.log(
          "HEADER PART=====> ",
          "Authorization:",
          "Bearer" + " " + Token
        );
        // console.log("BODY PART=====> ", body)
      }

      axios
        .get(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // 'Content-Type': 'application/json',
            Authorization: "Bearer" + " " + Token,
            // 'API_KEY': API_KEY
          },
        })
        .then((resp) => {
          if (consoleAllowed) {
            console.log("Response======>", JSON.stringify(resp));
          }
          if (
            resp.status == 200 ||
            resp.status == 201 ||
            resp.status == 202 ||
            resp.status == 203 ||
            resp.status == 204 ||
            resp.status == 205 ||
            resp.status == 206 ||
            resp.status == 207 ||
            resp.status == 208 ||
            resp.status == 226
          ) {
            if (resp.data.success) {
              onResponse(resp.data);
              return;
            }
            if (!resp.data.success) {
              onError(resp.data.message);
              return;
            }
          } else {
            onError(JSON.stringify(resp.data.message));
          }
        })
        .catch((ex) => {
          if (consoleAllowed) {
            console.log("Error=======>", ex);
          }
          if (ex == "Error: Network Error") {
            onError("Network Request Failed");
          } else {
            onError(ex.message);
          }
        });
    });
  }

  sendSecureImagePostRequest(url, _body, onResponse, onError) {
    // var body = _body + "&company_id=" + AppConfig.company_id
    var token = "";

    prefManager.getUserSessionData((data) => {
      token = data.data?.token;
      console.log(
        "\x1b[33m%s\x1b[0m -------IMAGE TOKEN------->>>",
        JSON.stringify(data.data?.token)
      );

      if (consoleAllowed) {
        console.log("=====================API CALLED========================");
        console.log("URL=====> ", url);
        // console.log("HEADER PART=====> ", 'Content-Type: application/x-www-form-urlencoded',
        //     'Authorization:', 'Bearer' + ' ' + token,
        //     'API_KEY:', API_KEY)
        console.log("BODY PART=====> ", _body);
      }

      axios
        .post(url, _body, {
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer" + " " + token,
            // 'API_KEY': API_KEY
          },
        })
        .then((resp) => {
          if (consoleAllowed) {
            console.log("Response======>", JSON.stringify(resp.data));
            // console.log("Response for Debug======>", JSON.stringify(resp))
          }
          if (resp.status == 200) {
            onResponse(resp.data);
            return;
          } else {
            console.log("Error in Method");
          }
        })
        .catch((ex) => {
          if (consoleAllowed) {
            console.log("Error=======>", ex);
          }
          if (ex == "Error: Network Error") {
            onError("Network Request Failed");
          } else {
            onError(ex.message);
          }
        });
    });
  }

  // sendSecureImagePostRequest(url, _body, onResponse, onError) {

  //     // var body = _body + "&company_id=" + AppConfig.company_id
  //     var token = ""

  //     prefManager.getUserSessionData(data => {
  //         token = data[0].token

  //         if (consoleAllowed) {
  //             console.log("=====================API CALLED========================")
  //             console.log("URL=====> ", url)
  //             // console.log("HEADER PART=====> ", 'Content-Type: application/x-www-form-urlencoded',
  //             //     'Authorization:', 'Bearer' + ' ' + token,
  //             //     'API_KEY:', API_KEY)
  //             console.log("BODY PART=====> ", _body)
  //         }

  //         axios.post(url, _body, {
  //             headers: {
  //                 // 'Content-Type': 'application/x-www-form-urlencoded',
  //                 // 'Content-Type': 'application/json',
  //                 'Authorization': 'Bearer' + ' ' + token,
  //                 'API_KEY': API_KEY

  //             }
  //         }).then((resp) => {

  //             if (consoleAllowed) {
  //                 console.log("Response======>", JSON.stringify(resp.data))
  //             }

  //             if (JSON.stringify(resp.data.status) == "true") {
  //                 onResponse(resp)
  //             } else {
  //                 onError(JSON.stringify(resp.data.message))
  //             }
  //         }).catch((ex) => {
  //             if (consoleAllowed) {
  //                 console.log("Error=======>", ex)
  //             }
  //             if (ex == 'Error: Network Error') {
  //                 onError("Network Request Failed")
  //             }
  //             else {
  //                 onError(ex.message)
  //             }
  //         })

  //     })

  // }

  // sendSecureParams_ImagePostRequest(url, _body, onResponse, onError) {
  //     var body = _body
  //     var token = ""

  //     prefManager.getUserSessionData(data => {
  //         token = data.data?.token
  //         console.log("\x1b[36m%s\x1b[0m -------GETDATA_APIHand------->>>", JSON.stringify(data.data?.token))

  //         if (consoleAllowed) {
  //             console.log("=====================API CALLED========================")
  //             console.log("URL=====> ", url)
  //             // console.log("HEADER PART=====> ", 'Authorization:', 'Bearer' + ' ' + token,
  //             //     'API_KEY:', API_KEY)
  //             console.log("HEADER PART=====> ", 'Authorization:', 'Bearer' + ' ' + token)
  //             console.log("BODY PART=====> ", body)
  //         }

  //         axios.post(url, _body, {
  //             headers: {
  //                 "Content-Type": "multipart/form-data",
  //                 'Authorization': 'Bearer' + ' ' + token,
  //                 Cookie: "ci_session=u4ai3s7975421p65ammho6q8d0r4s2t9",
  //             }
  //         }).then((resp) => {

  //             if (consoleAllowed) {
  //                 console.log("Response======>", JSON.stringify(resp.data))
  //                 // console.log("Response for Debug======>", JSON.stringify(resp))
  //             }
  //             if (resp.status == 200) {
  //                 onResponse(resp.data)
  //                 return
  //             }
  //             else {
  //                 console.log("Error in Method")
  //             }

  //         }).catch((ex) => {
  //             if (consoleAllowed) {
  //                 console.log("Error=======>", ex)
  //             }
  //             if (ex == 'Error: Network Error') {
  //                 onError("Network Request Failed")
  //             }
  //             else {
  //                 onError(ex.message)
  //             }
  //         })

  //     })
  // }
}
