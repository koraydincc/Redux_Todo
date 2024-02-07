import { configureStore } from "@reduxjs/toolkit";
import {formReducer } from './slices/formSlice'
import {todoReducer } from './slices/todoSlice'

export const store = configureStore ({
          reducer: {
             form: formReducer,
             todo: todoReducer
          }
})