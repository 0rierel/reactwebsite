import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'; 
import darkModeReducer from '../features/darkMode/darkModeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    darkMode: darkModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
