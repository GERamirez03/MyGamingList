import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistedStore = persistStore(store);

export { store, persistedStore };