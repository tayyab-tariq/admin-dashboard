import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '@/state';
import storageSession from 'redux-persist/lib/storage/session';
import {
  persistReducer,
} from "redux-persist";
import { api } from '@/state/api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


const persistConfig = {
    key: 'root',
    storage: storageSession, // Use 'storage' instead of 'sessionStorage'
    version: 1,
  };
  
const persistedReducer = persistReducer(persistConfig, globalReducer);
  

const createAppStore = async () => {
  try {
    const store = configureStore({
        reducer: {
            global: persistedReducer,
            [api.reducerPath] : api.reducer,
        },
        middleware: (getDefault) => getDefault({
            serializableCheck: false
        }).concat(api.middleware)
    });
    
    setupListeners(store.dispatch);

    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

export default createAppStore;