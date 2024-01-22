// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chartReducer from './chartSlice';
import transactionReducer from './transactionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    chart: chartReducer,
    transaction: transactionReducer,
  },
});

export default store;
