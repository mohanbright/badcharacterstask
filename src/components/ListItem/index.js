import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {responsiveHeight} from '../../constants';
import colors from '../../constants/colors';
import CustomBtnLayout from '../CustomBtnLayout';
import CustomText from '../CustomText';

export default function ListItem({item, dimension, index, ...props}) {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => setIsShow(!isShow);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!isShow}
      onPress={handleClick}
      style={{
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
      }}>
      <TouchableOpacity
        onPress={handleClick}
        activeOpacity={0.8}
        disabled={isShow}
        style={{
          width: '100%',
          height: responsiveHeight(dimension, 90),
          flexDirection: 'row',
          backgroundColor: colors.wgm3,
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <CustomText fontSize={20} color={colors.grey400}>
          {index + 1}.
        </CustomText>
        <Image
          style={{
            width: responsiveHeight(dimension, 50),
            height: responsiveHeight(dimension, 50),
            marginLeft: 20,
            resizeMode: 'center',
            borderRadius: responsiveHeight(dimension, 50 / 2),
          }}
          source={{uri: item.img}}
        />
        <View
          style={{
            flex: 1,
          }}>
          <CustomText
            fontSize={20}
            marginLeft={20}
            color={colors.grey400}
            textAlign={'left'}>
            {item.name}
          </CustomText>
        </View>
      </TouchableOpacity>
      {isShow && (
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: colors.wgm3,
            paddingBottom: 20,
          }}>
          <View>
            <CustomText fontSize={20} color={colors.grey400} textAlign={'left'}>
              <CustomText fontSize={20} color={colors.black}>
                Nickname:
              </CustomText>{' '}
              {item.nickname}
            </CustomText>
            <CustomText fontSize={20} color={colors.grey400} textAlign={'left'}>
              <CustomText fontSize={20} color={colors.black}>
                Status:
              </CustomText>{' '}
              {item.status}
            </CustomText>
            <CustomBtnLayout
              onPress={() =>
                props.navigation.navigate({
                  name: 'DetailScreen',
                  params: {item},
                })
              }
              btnLabel="More Details"
              height={40}
              marginTop={20}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}
