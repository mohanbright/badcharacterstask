import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import colors from '../../constants/colors';
import CustomText from '../CustomText';

export default function CustomBtnLayout({
  width = '100%',
  height = 60,
  btnLabel = 'btnLabel',
  backgroundColor = colors.green,
  color = colors.white1,
  marginTop = 0,
  onPress = null,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={{
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: 6,
        marginTop,
      }}>
      <CustomText fontSize={16} lineHeight={24} color={color} {...props}>
        {btnLabel}
      </CustomText>
    </TouchableOpacity>
  );
}

export function CustomImageBtnLayout({
  width = '100%',
  height = 60,
  btnLabel = 'btnLabel',
  backgroundColor = colors.green,
  color = colors.white1,
  marginTop = 0,
  onPress = null,
  imageSrc,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={{
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: 6,
        marginTop,
        flexDirection: 'row',
      }}>
      {imageSrc && (
        <Image
          source={imageSrc}
          style={{
            marginRight: 10,
          }}
        />
      )}
      <CustomText fontSize={16} lineHeight={24} color={color}>
        {btnLabel}
      </CustomText>
    </TouchableOpacity>
  );
}
