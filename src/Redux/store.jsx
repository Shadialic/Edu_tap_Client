import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import userSlice from './userSlice/userSlice';
import  tutorSlice  from "./TutorSlice/tutorSlice";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = {
    user: persistReducer(persistConfig, userSlice),
    tutor: persistReducer(persistConfig, tutorSlice),
};

const Store = configureStore({
    reducer: rootReducer,
});
const persistor = persistStore(Store);

export { Store, persistor };
