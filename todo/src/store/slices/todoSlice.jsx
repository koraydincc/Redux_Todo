import { createSlice, nanoid, current } from "@reduxjs/toolkit";

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
              state.filteredTodos = state.completedTodos;
            } else {
              state.filteredTodos = state.todos;
            }
          },
          
          
          
          
        completedTodo: (state, action) => {
            const id = action.payload.id;
            
            const completedTask = state.todos.find((todo)=> todo.id === id);
           console.log(completedTask)
            if (completedTask) {
                completedTask.completed = true;
                
                state.completedTodos.push({
                    title: completedTask.title,
                    description: completedTask.description,
                    id: completedTask.id,
                    completed: true
                });
                state.todos = state.todos.filter(task => task.id !== id);
                console.log(current(state))
                
                
                console.log("Action Payload:", action.payload);
                console.log(state.completedTodos);
            }
        }
 
    }}   
);

export const { addTodo, deleteTodo, showTodos, completedTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
