import {CHANGEDIMENSION, CHANGEORIENTATION} from '../constants';

function deviceDimensionReducer(
  state = {
    width: 375,
    height: 812,
    isUpdated: false,
  },
  action,
) {
  switch (action.type) {
    case CHANGEDIMENSION:
      return (state = {
        width: action.payload.width,
        height: action.payload.height,
        isUpdated: true,
      });
    case CHANGEORIENTATION:
      return (state = {...state, isUpdated: false});
    default:
      return state;
  }
}

export default deviceDimensionReducer;
