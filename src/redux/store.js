import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';  // import persistReducer
import storage from 'redux-persist/lib/storage'; // đúng tên là storage
import authReducer from './reducers/auth';

const persistConfigAuth = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, 
  },
});

export const persistor = persistStore(store);
export default store;
