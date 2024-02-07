import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        searchTerm: "",
        todos: [],
        completedTodos: []
    },
    reducers:{
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                description: action.payload.description,
                id: nanoid(),
                completed: action.payload.completed
            });
            console.log("todos",action.payload)
   
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        showTodos: (state, action) => {
            const { completed } = action.payload;
            if (completed === 'Active') {
                state.filteredTodos = state.todos.filter(todo => !todo.completed);
            } else if (completed === 'Completed') {
                state.filteredTodos = state.todos.filter(todo => todo.completed);
            } else {
                state.filteredTodos = state.todos;
            }
        },
        completedTodo: (state, action) => {
            const id = action.payload.id;
            const completedTask = state.todos.find(task => task.id === id);
            if (completedTask) {
                completedTask.completed = true;
                state.completedTodos.push({
                    title: action.payload.title,
                    description: action.payload.description,
                    id: action.payload.id,
                    completed: true
                });
                // state.todos dizisinden tamamlanan görevi kaldırın
                state.todos = state.todos.filter(task => task.id !== id);
                console.log("Action Payload:", action.payload);
                console.log(state.completedTodos);
            }
        }
        
        
        
        
        
    }}   
);

export const { addTodo, deleteTodo, showTodos, completedTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
