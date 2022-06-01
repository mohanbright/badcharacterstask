import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {responsiveHeight} from '../../constants';
import colors from '../../constants/colors';

function CustomText({
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  fontSize = 24,
  fontStyle = 'normal',
  color = colors.black800,
  fontWeight = 'bold',
  lineHeight = 27,
  textAlign = 'center',
  decoration = 'none',
  children,
  dimension,
  fontFamily = 'Poppins',
  ellipsizeMode = true,
  ...props
}) {
  let ellipsizeModeObj = ellipsizeMode
    ? {
        numberOfLines: 1,
        ellipsizeMode: 'tail',
      }
    : {};
  return (
    <Text
      {...ellipsizeModeObj}
      style={{
        textAlign: textAlign,
        lineHeight: responsiveHeight(dimension, lineHeight),
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        fontSize: responsiveHeight(dimension, fontSize),
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontStyle: fontStyle,
        color: color,
        textDecorationLine: decoration ? decoration : 'none',
      }}>
      {children}
    </Text>
  );
}
const mapStatetoProps = state => ({dimension: state.deviceDimensionReducer});
export default connect(mapStatetoProps)(CustomText);
