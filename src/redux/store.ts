import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from '../redux/reducers';

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer
});

export default store;
