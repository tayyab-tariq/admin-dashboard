import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import globalReducer from '@/state';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from '@/state/api';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession, // Use 'storage' instead of 'sessionStorage'
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, globalReducer);

const store = configureStore({
  reducer: {
    global: persistedReducer,
    [api.reducerPath] : api.reducer,
  },
  middleware: (getDefault) => getDefault({
    serializableCheck: false
    // serializableCheck: {
    //   ignoreActions: [FLUSH,                        //    Ignore warnings for using persist
    //     REHYDRATE,
    //     PAUSE,
    //     PERSIST,
    //     PURGE,
    //     REGISTER]
    // }
  }).concat(api.middleware)
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
)
