// import React, { useState, useEffect } from 'react'
// import {
//     View, Text, StatusBar, Image, FlatList, TextInput,
//     TouchableOpacity, ActivityIndicator, Modal
// } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Colors } from '../../../Colors/Colors'
// import { useNavigation, CommonActions } from '@react-navigation/native';
// import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Product_Tab from '../../../ReuseableComponents/Product_Tab';
// import Helpers from '../../Data/Helpers';
// import ApiHandler from '../../Data/ApiHandler';
// import PrefManager from '../../Data/PrefManager';
// import Urls from '../../Data/Urls';

// const helper = new Helpers()
// const apiHandler = new ApiHandler()
// const prefManager = new PrefManager()

// const PAGE_SIZE = 25; // number of items to load per page
// const INITIAL_PAGE = 1; // initial page number

// export default function ProductList_Screen() {
//     const navigation = useNavigation();

//     const [isLoading, setisLoading] = useState(false)
//     const [modalVisible, setModalVisible] = useState(false);
//     const [Product_id, setProduct_id] = useState("")

//     const [productList, setproductList] = useState("")
//     const [pages, setPages] = useState(1)
//     const [query, setQuery] = useState('');
//     const [filteredData, setFilteredData] = useState([]);
//     const [sortOption, setSortOption] = useState('');

//     useEffect(() => {
//         // navigateAction();
//         // changeNavigationBarColor(Colors.transparent);
//         setQuery('');
//         setPages(1);
//         setModalVisible(false);
//         setFilteredData([]);
//         setSortOption('');

//         productList_ApiCaller();
//     }, [1])

//     function productList_ApiCaller() {
//         let body = "page=" + pages

//         setisLoading(true)       //--- Loader On

//         apiHandler.sendSecurePostRequest(
//             Urls.PRODUCT_LIST,
//             body,
//             (resp) => {
//                 // console.log("\x1b[35m--------Home_Items_Categories------->>>", resp.data?.categories)

//                 setproductList(resp.data?.products?.data)
//                 setisLoading(false)

//                 // console.log("\x1b[35m--------SORTED PRICES------->>>", PriceLowtoHigh)

//             },
//             (error) => {
//                 helper.showTextToast(error, Colors.theme)
//                 setisLoading(false)
//             }
//         )
//     }

//     const handleSearch = text => {
//         setQuery(text);
//         setPages(INITIAL_PAGE);

//         const filtered = productList.filter(item => {
//             const textData = text.toUpperCase()
//             const itemData = item.product_name.toUpperCase()
//             return itemData.indexOf(textData) > -1
//         })
//         setFilteredData(filtered.slice(0, PAGE_SIZE)); // set initial filtered data
//     };
//     const handleLoadMore = async () => {
//         if (filteredData.length < productList.length) {
//             const nextPage = pages + 1;
//             const startIndex = nextPage * PAGE_SIZE;
//             const endIndex = startIndex + PAGE_SIZE;
//             const newData = productList.filter((item) => {
//                 const itemData = item.product_name.toLowerCase();
//                 return itemData.indexOf(query.toLowerCase()) > -1;
//             }).slice(startIndex, endIndex);
//             setFilteredData((prevData) => [...prevData, ...newData]);
//             setPages(nextPage);
//         }
//         else {
//             setPages(pages + 1);
//             const newData = await productList_ApiCaller();
//             setproductList(productList.concat(newData));
//         }
//     };

//     // const handleLoadMore = async () => {
//     //     if (filteredData.length < productList.length) {
//     //         const nextPage = pages + 1;
//     //         const startIndex = nextPage * PAGE_SIZE;
//     //         const endIndex = startIndex + PAGE_SIZE;
//     //         const newData = productList.slice(startIndex, endIndex);
//     //         setFilteredData((prevData) => [...prevData, ...newData]);
//     //         setPages(nextPage);
//     //     }
//     //     else {
//     //         setPages(pages + 1);
//     //         const newData = await productList_ApiCaller();
//     //         setproductList(productList.concat(newData));
//     //     }
//     // };

//     useEffect(() => {
//         if (sortOption === 'priceLowToHigh') {
//             const sortedData = [...productList].sort(
//                 (a, b) => a.product_price - b.product_price
//             );
//             setFilteredData(sortedData);
//         } else if (sortOption === 'priceHighToLow') {
//             const sortedData = [...productList].sort(
//                 (a, b) => b.product_price - a.product_price
//             );
//             setFilteredData(sortedData);
//         }
//     }, [sortOption]);

//     // ================================================================================================
//     function editCartItem(productID) {
//         let body = "product_id=" + productID + "&qty=" + "1"

//         // setisLoading(true)       //--- Loader On
//         apiHandler.sendSecurePostRequest(
//             Urls.ADD_CART_ITEM,
//             body,
//             (resp) => {
//                 console.log("\x1b[35m-----MY PART----->>>", resp.data)

//                 // return
//                 helper.showTextToast("Item has added.", Colors.theme)
//                 // setisLoading(false)
//             },
//             (error) => {
//                 helper.showTextToast(error, Colors.theme)
//                 setisLoading(false)
//             }
//         )

//         // return (
//         // )
//     }
//     function removeCartItem(removeProductId) {
//         let body = "product_id=" + removeProductId

//         // setisLoading(true)       //--- Loader On
//         apiHandler.sendSecurePostRequest(
//             Urls.REMOVE_CART_ITEM,
//             body,
//             (resp) => {
//                 console.log("\x1b[34m-----REMOVE_CART.ITEM----->>>", resp.data)

//                 if (resp.code == 200) {
//                     helper.showTextToast("Item has removed from cart.", Colors.theme)
//                     return
//                 }
//                 else {
//                     helper.showTextToast(resp.message, Colors.theme)
//                 }

//                 // return
//                 // setisLoading(false)

//             },
//             (error) => {
//                 helper.showTextToast(error, Colors.theme)
//                 setisLoading(false)
//             }
//         )
//     }
//     function upCartItem() {
//         return (
//             helper.showTextToast("Sorry not avail now.", Colors.theme)
//         )
//     }
//     function promoteCartItem() {
//         return (
//             helper.showTextToast("Not Availeble Now.", Colors.theme)
//         )
//     }
//     function productdataloading() {
//         if (productList == "") {
//             helper.showTextToast("You can sort data after loading products.", Colors.theme)
//             return
//         }
//         else {
//             setModalVisible(true)
//         }
//         // if (productList !== "") {
//         //     setModalVisible(true)
//         //     return
//         // }

//     }

//     return (
//         <View style={{
//             flex: 1,
//             backgroundColor: Colors.theme,
//         }}>

//             <StatusBar
//                 backgroundColor={Colors.theme}
//                 translucent={false}
//                 barStyle="light-content"
//             // barStyle="dark-content"
//             />

//             {/* <Header
//                 StatusbarColor={Colors.theme}
//                 BarStyle={"dark-content"}
//                 backButton={true}
//                 GoBack={() => { navigation.goBack() }}
//                 Title={"Products"}
//             /> */}

//             <View
//                 style={{
//                     width: wp(100),
//                     flex: 1,
//                     marginTop: hp(4),
//                     backgroundColor: Colors.new_BG,
//                     borderTopLeftRadius: hp(2),
//                     borderTopRightRadius: hp(2)
//                 }}>

//                 {/* ========= Search Bar ========= */}

//                 <View
//                     style={{
//                         marginHorizontal: wp(4),
//                         // backgroundColor: 'plum',
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         marginTop: hp(2),
//                     }}>

//                     <TouchableOpacity
//                         onPress={() => { navigation.goBack() }}
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             paddingLeft: wp(2),
//                             marginRight: wp(5),
//                             // backgroundColor: 'red',
//                         }}>
//                         <Octicons name="chevron-left" size={30} color={Colors.gray1} />
//                     </TouchableOpacity>

//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             backgroundColor: Colors.white,
//                             width: wp(80),
//                             height: hp(5.5),
//                             alignItems: 'center',
//                             borderRadius: hp(10),
//                             // alignSelf: 'center',
//                             // marginVertical: hp(3),
//                             paddingHorizontal: wp(4)
//                         }}>
//                         <Ionicons name="search-sharp" size={20} color={Colors.gray1} />

//                         <TextInput
//                             placeholder="Search"
//                             onChangeText={handleSearch}
//                             value={query}

//                             style={{
//                                 // textAlign:'center'
//                                 textAlignVertical: 'center',
//                                 // borderBottomWidth:1,
//                                 // borderBottomColor:
//                                 height: hp(5.5),
//                                 flex: 1,
//                                 // paddingHorizontal:wp(1),
//                                 // backgroundColor: 'plum',
//                             }}
//                         ></TextInput>
//                     </View>
//                 </View>

//                 {/* ========== SORT BY ============ */}
//                 <View
//                     style={{
//                         // flex: 1,
//                         // backgroundColor: 'plum',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         // backgroundColor: Colors.white,
//                         paddingVertical: hp(0.7),
//                         marginTop: hp(1),
//                     }}>
//                     <TouchableOpacity
//                         onPress={() => { productdataloading() }}
//                         activeOpacity={0.3}>
//                         <Text
//                             // numberOfLines={1}
//                             style={{
//                                 fontSize: hp(2.2),
//                                 color: Colors.black,
//                                 fontWeight: '500',
//                                 // marginTop: hp(1),
//                                 // fontFamily: FONTS.font1,
//                                 borderBottomWidth: 1,
//                                 borderBottomColor: Colors.black
//                             }}>
//                             Sort By
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* ================================= */}
//                 {isLoading ?
//                     <View style={{
//                         flex: 1,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         // marginTop: hp(30),
//                         // backgroundColor: 'yellow',
//                     }}>
//                         <ActivityIndicator size="large" color={Colors.theme}
//                             style={{
//                                 // marginTop: hp(11),
//                                 // alignSelf: 'center',
//                             }} />
//                     </View>
//                     :
//                     <View
//                         style={{
//                             marginHorizontal: wp(5),
//                             marginTop: hp(1),
//                             flex: 1,
//                             // backgroundColor: 'plum',
//                         }}>
//                         <FlatList
//                             // showsVerticalScrollIndicator={false}
//                             // data={filteredData}
//                             data={filteredData.length > 0 ? filteredData : productList}
//                             onEndReached={handleLoadMore}
//                             // onEndReachedThreshold={0.5} // load more when user scrolls to 50% of the list
//                             renderItem={({ item }) => {
//                                 return (
//                                     <Product_Tab
//                                         OnAction={() => { navigation.navigate("ProductDetail_Screen", { ProductID: item.product_id }) }}
//                                         ImageLink={item.product_image}
//                                         ProductName={item.product_name}
//                                         Comment={item.category_name}
//                                         Reviews={item.product_views + " Views"}
//                                         Discount={item.product_discount}
//                                         Price={item.product_price}
//                                         EditAction={() => { editCartItem(item.product_id) }}
//                                         UpAction={() => { upCartItem() }}
//                                         PromoteAction={() => { promoteCartItem() }}
//                                         RemoveAction={() => { removeCartItem(item.product_id) }}
//                                     />
//                                 )
//                             }}
//                         />
//                     </View>
//                 }

//             </View>

//             {modalVisible &&
//                 <Modal
//                     animationType="fade"
//                     transparent={true}
//                     visible={modalVisible}
//                     onRequestClose={() => {
//                         setModalVisible(!setModalVisible);
//                     }}>
//                     <TouchableOpacity
//                         onPress={() => { setModalVisible(false) }}
//                         style={{
//                             flex: 1,
//                             alignItems: 'center',
//                             // backgroundColor: Colors.blackHexColor,
//                             // backgroundColor: 'plum',
//                             // justifyContent: 'center',
//                         }}>
//                         <View style={{
//                             paddingVertical: hp(3),
//                             paddingHorizontal: wp(6),
//                             // width: wp(70),
//                             backgroundColor: Colors.secondary_color,
//                             borderRadius: hp(1),
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             marginTop: hp(18),
//                             elevation: 5
//                         }}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     setModalVisible(false),
//                                         setSortOption('priceLowToHigh');
//                                     // priceLowToHigh()
//                                 }}
//                                 style={{
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     // backgroundColor: 'blue',
//                                 }}>
//                                 <Text
//                                     style={{
//                                         fontSize: hp(2.3),
//                                         color: Colors.black_text,
//                                     }}>
//                                     Price low to high
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => {
//                                     setModalVisible(false),
//                                         setSortOption('priceHighToLow');
//                                     // HighToLowPrice()
//                                 }}
//                                 style={{
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     // backgroundColor: 'red',
//                                     marginTop: hp(2),
//                                 }}>
//                                 <Text
//                                     style={{
//                                         fontSize: hp(2.3),
//                                         color: Colors.black_text,
//                                     }}>
//                                     Price high to low
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </TouchableOpacity>

//                 </Modal>
//             }

//         </View>
//     )
// }

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import Product_Tab from "../../../ReuseableComponents/Product_Tab";
import Helpers from "../../Data/Helpers";
import ApiHandler from "../../Data/ApiHandler";
import PrefManager from "../../Data/PrefManager";
import Urls from "../../Data/Urls";

const helper = new Helpers();
const apiHandler = new ApiHandler();
const prefManager = new PrefManager();

const PAGE_SIZE = 25; // number of items to load per page
const INITIAL_PAGE = 1; // initial page number

export default function ProductList_Screen() {
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Product_id, setProduct_id] = useState("");

  const [productList, setProductList] = useState([]);
  const [WishListItems, setWishListItems] = useState([]);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    setQuery("");
    setPages(1);
    setModalVisible(false);
    setFilteredData([]);
    setSortOption("");

    productList_ApiCaller();
  };

  const productList_ApiCaller = () => {
    const body = `page=${pages}`;

    setisLoading(true);

    apiHandler.sendSecurePostRequest(
      Urls.PRODUCT_LIST,
      body,
      (resp) => {
        setProductList(resp.data?.products?.data);
        setisLoading(false);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  };

  const handleSearch = (text) => {
    setQuery(text);
    setPages(INITIAL_PAGE);

    const filtered = productList.filter((item) => {
      const textData = text.toUpperCase();
      const itemData = item.product_name.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(filtered.slice(0, PAGE_SIZE));
  };

  const handleLoadMore = () => {
    // if (filteredData.length > 1) {
    if (filteredData.length < productList.length) {
      const nextPage = pages + 1;
      const startIndex = nextPage * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const newData = productList
        .filter((item) => {
          const itemData = item.product_name.toLowerCase();
          return itemData.indexOf(query.toLowerCase()) > -1;
        })
        .slice(startIndex, endIndex);
      setFilteredData((prevData) => [...prevData, ...newData]);
      setPages(nextPage);
      return;
    } else {
      setPages((prevPages) => prevPages + 1);
      // setPages(pages + 1);
      productList_ApiCaller();
    }
  };

  useEffect(() => {
    if (sortOption === "priceLowToHigh") {
      const sortedData = [...productList].sort(
        (a, b) => a.product_price - b.product_price
      );
      setFilteredData(sortedData.slice(0, PAGE_SIZE));
    } else if (sortOption === "priceHighToLow") {
      const sortedData = [...productList].sort(
        (a, b) => b.product_price - a.product_price
      );
      setFilteredData(sortedData.slice(0, PAGE_SIZE));
    } else {
      setFilteredData(productList.slice(0, PAGE_SIZE));
    }
  }, [sortOption]);

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productItemContainer}
        // onPress={() => handleProductClick(item.product_id)}
      >
        <Image
          style={styles.productImage}
          source={{ uri: item.product_image }}
          resizeMode="cover"
        />
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{item.product_price}</Text>
      </TouchableOpacity>
    );
  };
  const handleProductClick = (productId) => {
    setProduct_id(productId);
    setModalVisible(true);
  };

  function editCartItem(productID, fullItem) {
    let body = "product_id=" + productID + "&qty=" + "1";

    // setisLoading(true)
    apiHandler.sendSecurePostRequest(
      Urls.WISHLIST_ADD_ITEM,
      body,
      (resp) => {
        // console.log("\x1b[35m-----MY PART----->>>", resp.data)

        // if (resp.code == 200) {
        // let cartItems = [...WishListItems, fullItem];
        // // WishListItems.push(fullItem)
        // // if (WishListItems.length > 0) {
        //     setWishListItems(cartItems)

        //     prefManager.saveCartData(WishListItems)
        //     // helper.showTextToast("Item added into wishlist.", Colors.theme)
        //     console.log("====ITEM ADDED WISHLIST===>", WishListItems)
        //     alert('items saved')
        // }

        // return
        // }

        setisLoading(false);
        helper.showTextToast("Item added into wishlist.", Colors.theme);
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }
  function removeCartItem(removeProductId) {
    let body = "product_id=" + removeProductId;

    // setisLoading(true)       //--- Loader On
    apiHandler.sendSecurePostRequest(
      Urls.REMOVE_CART_ITEM,
      body,
      (resp) => {
        // console.log("\x1b[34m-----REMOVE_CART.ITEM----->>>", resp.data)

        if (resp.code == 200) {
          helper.showTextToast("Item has removed from cart.", Colors.theme);
          return;
        } else {
          helper.showTextToast(resp.message, Colors.theme);
        }
        // setisLoading(false)
      },
      (error) => {
        helper.showTextToast(error, Colors.theme);
        setisLoading(false);
      }
    );
  }
  function upCartItem() {
    return helper.showTextToast("Sorry not avail now.", Colors.theme);
  }
  function promoteCartItem() {
    return helper.showTextToast("Not Availeble Now.", Colors.theme);
  }

  function productdataloading() {
    if (productList == "") {
      helper.showTextToast(
        "You can sort data after loading products.",
        Colors.theme
      );
      return;
    } else {
      setModalVisible(true);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />

      {/* <View style={styles.headerContainer}>
                <Ionicons
                    name="arrow-back"
                    size={30}
                    color={Colors.white}
                    onPress={() => navigation.goBack()}
                    style={styles.backIcon}
                />
                <Text style={styles.title}>Product List</Text>
                <Ionicons
                    name="search"
                    size={25}
                    color={Colors.white}
                    onPress={() => setModalVisible(true)}
                    style={styles.searchIcon}
                />
            </View> */}

      <View
        style={{
          width: wp(100),
          flex: 1,
          marginTop: hp(4),
          backgroundColor: Colors.new_BG,
          borderTopLeftRadius: hp(2),
          borderTopRightRadius: hp(2),
        }}
      >
        {/* ========= Search Bar ========= */}
        <View
          style={{
            marginHorizontal: wp(4),
            // backgroundColor: 'plum',
            flexDirection: "row",
            alignItems: "center",
            marginTop: hp(2),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: wp(2),
              marginRight: wp(5),
              // backgroundColor: 'red',
            }}
          >
            <Octicons name="chevron-left" size={30} color={Colors.gray1} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: Colors.white,
              width: wp(80),
              height: hp(5.5),
              alignItems: "center",
              borderRadius: hp(10),
              // alignSelf: 'center',
              // marginVertical: hp(3),
              paddingHorizontal: wp(4),
            }}
          >
            <Ionicons name="search-sharp" size={20} color={Colors.gray1} />

            <TextInput
              placeholder="Search"
              placeholderTextColor={Colors.gray1}
              onChangeText={handleSearch}
              value={query}
              style={{
                textAlignVertical: "center",
                height: hp(5.5),
                flex: 1,
                fontSize: hp(2),
              }}
            ></TextInput>
          </View>
        </View>

        {/* ========== SORT BY ============ */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: hp(0.7),
            marginTop: hp(1),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // setModalVisible(true)
              productdataloading();
            }}
            activeOpacity={0.3}
          >
            <Text
              style={{
                fontSize: hp(2.2),
                color: Colors.black,
                fontWeight: "500",
                borderBottomWidth: 1,
                borderBottomColor: Colors.black,
              }}
            >
              Sort By
            </Text>
          </TouchableOpacity>
        </View>

        {/* =============================== */}
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.theme} />
          </View>
        ) : (
          <FlatList
            style={styles.productList}
            data={filteredData.length > 0 ? filteredData : productList}
            keyExtractor={(item) => item.product_id.toString()}
            // numColumns={2}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <ActivityIndicator size="small" color={Colors.theme} />
            }
            // ListFooterComponent={
            //     filteredData.length < productList.length ? (
            //         <ActivityIndicator size="small" color={Colors.theme} />
            //     ) : null
            // }
            renderItem={({ item }) => {
              return (
                <Product_Tab
                  OnAction={() => {
                    navigation.navigate("ProductDetail_Screen", {
                      ProductID: item.product_id,
                    });
                  }}
                  ImageLink={item.product_image}
                  ProductName={item.product_name}
                  Comment={item.category_name}
                  DisplayStars={item.product_views}
                  Reviews={"Reviews"}
                  // Reviews={item.product_views + "Reviews"}
                  Discount={item.product_discount}
                  Price={item.product_price}
                  EditAction={() => {
                    editCartItem(item.product_id, item);
                  }}
                  UpAction={() => {
                    upCartItem();
                  }}
                  PromoteAction={() => {
                    promoteCartItem();
                  }}
                  RemoveAction={() => {
                    removeCartItem(item.product_id);
                  }}
                />
              );
            }}
          />
        )}

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => {
              setModalVisible(false);
            }}
            activeOpacity={0.9}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filters</Text>

              <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Sort by:</Text>
                <TouchableOpacity
                  style={[
                    styles.sortOption,
                    sortOption === "priceLowToHigh" &&
                      styles.selectedSortOption,
                  ]}
                  onPress={() => {
                    setSortOption("priceLowToHigh"), setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sortOption === "priceLowToHigh" &&
                        styles.selectedSortOptionText,
                    ]}
                  >
                    Price (Low to High)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sortOption,
                    sortOption === "priceHighToLow" &&
                      styles.selectedSortOption,
                  ]}
                  onPress={() => {
                    setSortOption("priceHighToLow"), setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.sortOptionText,
                      sortOption === "priceHighToLow" &&
                        styles.selectedSortOptionText,
                    ]}
                  >
                    Price (High to Low)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.theme,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("1%"),
  },
  backIcon: {
    marginRight: wp("2%"),
  },
  title: {
    flex: 1,
    fontSize: wp("5%"),
    color: Colors.white,
    fontWeight: "bold",
  },
  searchIcon: {
    marginLeft: wp("2%"),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productList: {
    flex: 1,
    paddingHorizontal: wp("3%"),
    // backgroundColor: 'plum',
    marginTop: hp(1),
  },
  productItemContainer: {
    flex: 1,
    margin: wp("2%"),
    backgroundColor: Colors.lightGray,
    borderRadius: wp("2%"),
    padding: wp("2%"),
    alignItems: "center",
  },
  productImage: {
    width: wp("40%"),
    height: wp("40%"),
    resizeMode: "cover",
    borderRadius: wp("2%"),
  },
  productName: {
    marginTop: hp("1%"),
    fontSize: wp("4%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    marginTop: hp("0.5%"),
    fontSize: wp("3.5%"),
    color: Colors.theme,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    padding: wp("5%"),
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    textAlign: "center",
    color: Colors.black_text,
  },
  searchInput: {
    backgroundColor: Colors.lightGray,
    borderRadius: wp("2%"),
    paddingHorizontal: wp("2%"),
    marginBottom: hp("2%"),
  },
  sortContainer: {
    marginBottom: hp("2%"),
  },
  sortLabel: {
    marginRight: wp("2%"),
    fontSize: hp("2%"),
    color: Colors.black_text,
  },
  sortOption: {
    width: wp(45),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp(0.5),
    borderRadius: wp("2%"),
    backgroundColor: Colors.gray2,
    marginVertical: hp(0.5),
  },
  selectedSortOption: {
    backgroundColor: Colors.theme,
  },
  sortOptionText: {
    fontSize: hp("2%"),
    color: Colors.black_text,
  },
  selectedSortOptionText: {
    color: Colors.white,
  },
  closeButton: {
    position: "absolute",
    top: wp("1%"),
  },
});
