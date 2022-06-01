import {CHANGEDIMENSION, CHANGEORIENTATION} from '../constants';

export const ChangeDimension = layout => ({
  type: CHANGEDIMENSION,
  payload: {width: layout.width, height: layout.height},
});
export const ChangeOrientation = () => ({
  type: CHANGEORIENTATION,
});
