import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counter/counterSlice';
import layoutSlide from './layout/reducer';
import profileSlice from './profile/reducer';

export default combineReducers({
  counter: counterSlice,
  layout: layoutSlide,
  profile: profileSlice,
});
