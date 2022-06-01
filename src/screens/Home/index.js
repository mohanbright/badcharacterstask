import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, FlatList, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import CustomText from '../../components/CustomText';
import ListItem from '../../components/ListItem';
import {responsiveHeight} from '../../constants';
import colors from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

let timer;
function HomeScreen({dimension, ...props}) {
  const [listData, setListData] = useState([]);
  const [shownList, setShownList] = useState([]);
  const [lastSearchResult, setlastSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [activeRadioBtn, setActiveRadioBtn] = useState([]);
  let AppearanceArr = [1, 2, 3, 4, 5];
  const filterByAppearance = async arr => {
    let newArr = await lastSearchResult.filter(
      val =>
        val.appearance.filter(
          val => activeRadioBtn.toString().indexOf(val) !== -1,
        )?.length > 0,
    );
    setShownList(newArr);
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://breakingbadapi.com/api/characters',
    })
      .then(response => {
        if (response.status === 200) {
          setListData(response.data);
          setShownList(response.data);
          setlastSearchResult(response.data);
        }
      })
      .catch(err => console.log('error=>', err));
    return () => {
      setListData([]);
      setSearchInput('');
      setShownList([]);
    };
  }, []);

  useEffect(() => {
    if (activeRadioBtn.length > 0) filterByAppearance(activeRadioBtn);
    else setShownList(lastSearchResult);
  }, [activeRadioBtn]);

  const handleSearch = text => {
    activeRadioBtn.length > 0 && setActiveRadioBtn([]);
    setSearchInput(text);
    if (timer) clearTimeout(timer);
    if (!text) setShownList(listData);
    timer = setTimeout(async () => {
      let filter = await listData.filter(
        val =>
          val.name.indexOf(text) !== -1 || val.nickname.indexOf(text) !== -1,
      );
      setShownList(filter);
      setlastSearchResult(filter);
    }, 1000);
  };
  const handleRadioBtn = val => {
    let index = activeRadioBtn.indexOf(val);
    if (index === -1) {
      setActiveRadioBtn([...activeRadioBtn, val]);
      return null;
    }
    let copy = [...activeRadioBtn];
    copy.splice(index, 1);
    setActiveRadioBtn(copy);
    return null;
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          height: responsiveHeight(dimension, 70),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText fontSize={20}>Bad Characters</CustomText>
      </View>
      <View
        style={{
          height: responsiveHeight(dimension, 56),
          width: '100%',
          justifyContent: 'center',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <TextInput
          placeholder="Search by name"
          placeholderTextColor={colors.grey}
          style={{
            flex: 1,
            color: colors.black800,
            fontSize: responsiveHeight(dimension, 14),
            lineHeight: responsiveHeight(dimension, 17),
            borderWidth: 0.5,
            borderColor: colors.green,
            backgroundColor: colors.wgm3,
            borderRadius: 6,
            paddingHorizontal: 16,
          }}
          value={searchInput}
          onChangeText={text => handleSearch(text)}
        />
      </View>
      <CustomText fontSize={20}>Appearance</CustomText>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        {AppearanceArr.map(val => (
          <View
            key={val}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              fontSize={18}
              marginLeft={20}
              color={colors.grey400}
              textAlign={'left'}
              marginRight={5}>
              {val}
            </CustomText>
            <TouchableOpacity onPress={() => handleRadioBtn(val)}>
              <Ionicons
                name={
                  activeRadioBtn.indexOf(val) === -1
                    ? 'radio-button-off'
                    : 'radio-button-on'
                }
                size={15}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={shownList}
          initialNumToRender={7}
          ListEmptyComponent={() => (
            <View
              style={{
                height: dimension.height - responsiveHeight(dimension, 90),
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomText fontSize={17}>No data found!</CustomText>
            </View>
          )}
          renderItem={({item, index}) => (
            <ListItem
              key={index}
              index={index}
              item={item}
              {...props}
              dimension={dimension}
            />
          )}
        />
      </View>
    </View>
  );
}
const mapStatetoProps = state => ({dimension: state.deviceDimensionReducer});
export default connect(mapStatetoProps)(HomeScreen);
