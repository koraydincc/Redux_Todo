import { createSlice, nanoid,current } from "@reduxjs/toolkit";
import {produce} from 'immer';




const todoSlice = createSlice({


    name: 'todo',
    initialState:{
        searchTerm: "",
        todos: [],
        completedTodos: [],
        visibilityFilter: '',
        editTitle: '',
        editDescription:'',
       
    },
    reducers:{
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                description: action.payload.description,
                id: nanoid(),
                completed: action.payload.completed,
            
            });
            state.visibilityFilter = 'All'
            
            
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            state.completedTodos = state.completedTodos.filter((todo)=> todo.id !== action.payload)
        },
        showTodos(state, action) {
            
            state.visibilityFilter = action.payload;
            console.log(state.visibilityFilter)
        },
        completedTodo: (state, action) => {
            const id = action.payload.id;
            const completedTask = state.todos.find((todo) => todo.id === id);
            if (completedTask) {
                completedTask.completed = true;
                state.completedTodos.push({
                    title: completedTask.title,
                    description: completedTask.description,
                    id: completedTask.id,
                    completed: true
                });
                state.todos = state.todos.filter(task => task.id !== id);
            }
        },
        toggleEvent: (state, action) => {
            const { id } = action.payload;
            const completedTodo = state.completedTodos.find(todo => todo.id === id);
            
            if (completedTodo) {
                state.todos.push(completedTodo);
                
                state.completedTodos = state.completedTodos.filter(todo => todo.id !== id);

            
                completedTodo.completed = false;
                
                state.visibilityFilter = 'All';
            } 
        },
        editTodo: (state, action) => {
            
            if (action.payload) {
           
                const id = action.payload.id;
                const selectedTodo = state.todos?.find(todo => todo?.id === id);
                if (selectedTodo) {
                    selectedTodo.title = state.editTitle;
                    selectedTodo.description = state.editDescription;

                }
                
                
                console.log(JSON.stringify(selectedTodo))
            } 
        },
        changeEditTitle: (state, action) => {
            state.editTitle = action.payload
           
        },
        changeEditDescription: (state, action) => {
            state.editDescription = action.payload
        },
 
        
        
    }
});

export const { addTodo, deleteTodo, showTodos, completedTodo,toggleEvent,changeEditTitle, editTodo, changeEditDescription } = todoSlice.actions;


export const todoReducer = todoSlice.reducer;
