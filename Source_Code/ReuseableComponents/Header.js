import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, Image, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../Colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS } from '../Assets/fonts/AppFonts';

export default function Header(props) {
  return (
    <View>
      <StatusBar
        // backgroundColor={Colors.theme}
        backgroundColor={props.StatusbarColor}
        translucent={false}
        // barStyle="light-content"
        // barStyle="dark-content"
        barStyle={props.BarStyle}
      />

      <View
        style={{
          backgroundColor: Colors.theme,
          width: wp(100),
          height: hp(12),
          // alignItems: 'center',
          flexDirection: 'row',
          // backgroundColor: 'yellow',
          paddingTop: hp(3.5),
          paddingBottom: hp(2.5)
        }}>

        {props.backButton &&
          <TouchableOpacity
            onPress={() => { props.GoBack() }}
            style={{
              // backgroundColor: 'plum',
              // alignSelf: 'flex-start',
              // marginTop: hp(1),
              marginLeft: wp(5),
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}>
            <Ionicons name="arrow-back" size={30} color={Colors.white} />
          </TouchableOpacity>
        }

        <View
          style={{
            flex: 1,
            // backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
            // marginHorizontal: wp(3),
          }}>

          <Text
            numberOfLines={1}
            style={{
              // width:wp(90),
              fontSize: hp(3.5),
              color: Colors.white_text,
              textAlign: 'center',
              left: props.backButton == true ? wp(-5) : 0
              // marginTop: props.backButton == true ? 0 : hp(5),
              // fontFamily: FONTS.font1,
              // fontWeight: '600',
              // backgroundColor: 'plum',
              // marginHorizontal: wp(5),
            }}>
            {props.Title}
          </Text>
        </View>

      </View>
    </View>
  )
}