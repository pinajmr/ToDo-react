// import './App.css';

import React from "react";
import { TodoCounter } from "./TodoCounter";
import { CreateTodoButton } from "./TodoButton";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

const todos = [
  {text:'Cut Tomato', completed:true},
  {text:'Take Tomato',completed:false},
  {text:'Warn steak', completed:false},
];


function App() {
  return (
    <>
    <TodoCounter/>
    <TodoSearch/> 
    <TodoList>
      {todos.map(todo => (
        <TodoItem 
        key={todo.text} 
        text = {todo.text}
        completed = {todo.completed}/>
      ))}
    </TodoList>
    <CreateTodoButton/>
    </>
  );
}

export default App;
