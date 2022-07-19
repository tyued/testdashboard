import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice'
import formReducer from './formSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        form: formReducer,
    },
})