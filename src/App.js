// import './App.css';

import React from "react";
import { TodoCounter } from "./TodoCounter";
import { CreateTodoButton } from "./TodoButton";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";

const defaultTodos = [
  {text:'Cut Tomato', completed:true},
  {text:'Take Tomato',completed:false},
  {text:'Warn steak', completed:false},
  {text:'Trading',completed:true},
];


function App() {
  // Estado inicial de nuestros ToDos
  const [todos, setTodos] = React.useState(defaultTodos);
  // Cantidad de TODOs completados
  const completedTodos = todos.filter(todo => todo.completed).length;
  // Cantidad total de TODOs
  const totalTodos = todos.length;

  // El estado de nuestra busqueda
  const [searchValue, setSearchValue] = React.useState('');
  // Creamos una nueva variaable en donde guardaremos las coincidencias con las busqueda
  let searchedTodos = []

  // Logica para filtrar
  if(!searchValue.length >=1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLocaleLowerCase();
      const searchText = searchValue.toLocaleLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex,1);
    setTodos(newTodos);
  }
  return (
    <>
    {/** Pasamos el estado a nuestro componente */}
    <TodoCounter
      total = {totalTodos}
      completed = {completedTodos}
    />
    <TodoSearch
      searchValue={searchValue}
      setSearchValue={setSearchValue}/> 
    <TodoList>
      {searchedTodos.map(todo => (
        <TodoItem 
        key={todo.text} 
        text = {todo.text}
        completed = {todo.completed}
        onComplete={() => completeTodo(todo.text)}
        onDelete={() => deleteTodo(todo.text)}
        />
      ))}
    </TodoList>
    <CreateTodoButton/>
    </>
  );
}

export default App;
