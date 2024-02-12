import { createSlice } from "@reduxjs/toolkit";
import { addTodo, editTodo } from "./todoSlice";



const formSlice = createSlice({
    name: 'form',
    initialState: {
        title:'',
        description: '',
        completed: false,
  
    },
    reducers:{
        changeTitle: (state,action) => {
            state.title = action.payload;
        },
        changeDescription: (state,action) => {
            state.description = action.payload

        },
        changeCompleted: (state,action) => {
            state.completed = action.payload
        },
     
    },
    extraReducers(builder) {
        builder.addCase(addTodo, (state, action) => {
          
            return {
                ...state,
                title: '',
                description: '',
                segmented: 'Active'
                
            };
           
        });
    },

  
  
    
    
})

export const {changeTitle, changeCompleted,changeDescription,changeSegmented} = formSlice.actions;

export const formReducer = formSlice.reducer;
