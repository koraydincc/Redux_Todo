import { createSlice, nanoid,current } from "@reduxjs/toolkit";





const todoSlice = createSlice({


    name: 'todo',
    initialState:{
        searchTerm: "",
        todos: [],
        completedTodos: [],
        visibilityFilter: '',
       
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

                console.log(current(completedTodo))
                completedTodo.completed = false;
                
                state.visibilityFilter = 'All';
            } 
        }
        
    }
});

export const { addTodo, deleteTodo, showTodos, completedTodo,toggleEvent } = todoSlice.actions;


export const todoReducer = todoSlice.reducer;
