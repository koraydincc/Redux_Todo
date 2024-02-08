import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        searchTerm: "",
        todos: [],
        completedTodos: [],
        visibilityFilter: [],
       
    },
    reducers:{
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                description: action.payload.description,
                id: nanoid(),
                completed: action.payload.completed
            });
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
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
        }
    }
});

export const { addTodo, deleteTodo, showTodos, completedTodo } = todoSlice.actions;


export const todoReducer = todoSlice.reducer;
