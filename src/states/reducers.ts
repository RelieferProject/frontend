import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counter/counterSlice';
import layoutSlide from './layout/reducer';

export default combineReducers({
  counter: counterSlice,
  layout: layoutSlide,
});
