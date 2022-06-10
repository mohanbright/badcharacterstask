import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { backArrow } from "../../assets";
import CustomText from "../../components/CustomText";
import { responsiveHeight } from "../../constants";
import colors from "../../constants/colors";

function DetailScreen({ dimension, route: { params }, ...props }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View
        style={{
          height: responsiveHeight(dimension, 90),
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={backArrow}
              style={{
                height: responsiveHeight(dimension, 20),
                width: responsiveHeight(dimension, 20),
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <CustomText fontSize={20}>{params?.item?.name}</CustomText>
        </View>
        <View
          style={{
            flex: 0.5,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={{
            width: responsiveHeight(dimension, 150),
            height: responsiveHeight(dimension, 150),
            resizeMode: "center",
            borderRadius: responsiveHeight(dimension, 150 / 2),
          }}
          source={{ uri: params?.item?.img }}
        />
        <CustomText fontSize={20} color={colors.grey400} marginTop={50}>
          <CustomText fontSize={20} color={colors.black}>
            Name:
          </CustomText>{" "}
          {params?.item?.name}
        </CustomText>
        <CustomText fontSize={20} color={colors.grey400} marginTop={10}>
          <CustomText fontSize={20} color={colors.black}>
            Nickname:
          </CustomText>{" "}
          {params?.item?.nickname}
        </CustomText>
        <CustomText fontSize={20} color={colors.grey400} marginTop={10}>
          <CustomText fontSize={20} color={colors.black}>
            Birthday:
          </CustomText>{" "}
          {params?.item?.birthday}
        </CustomText>
        <CustomText fontSize={20} color={colors.grey400} marginTop={10}>
          <CustomText fontSize={20} color={colors.black}>
            Portrayed:
          </CustomText>{" "}
          {params?.item?.portrayed}
        </CustomText>
        <CustomText fontSize={20} color={colors.grey400} marginTop={10}>
          <CustomText fontSize={20} color={colors.black}>
            Category:
          </CustomText>{" "}
          {params?.item?.category}
        </CustomText>
        <CustomText
          fontSize={20}
          color={colors.grey400}
          marginTop={10}
          ellipsizeMode={false}
        >
          <CustomText fontSize={20} color={colors.black} ellipsizeMode={false}>
            Occupation:
          </CustomText>{" "}
          {params?.item?.occupation?.join(", ")}
        </CustomText>
      </View>
    </View>
  );
}
const mapStatetoProps = (state) => ({
  dimension: state.deviceDimensionReducer,
});
export default connect(mapStatetoProps)(DetailScreen);
