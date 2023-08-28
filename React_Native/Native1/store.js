import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import budgetReducer from './components/budgetReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, budgetReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default { store, persistor };
