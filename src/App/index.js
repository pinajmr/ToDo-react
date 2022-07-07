import React from "react";
import { AppUI } from './AppUI';

// const defaultTodos = [
//   {text:'Cutting Tomato', completed:true},
//   {text:'Take Tomato',completed:false},
//   {text:'Warn steak', completed:false},
//   {text:'Trading',completed:false},
// ];

function useLocalStorage(itemName, intialValue){
  //Traemos nuestros TODOs almacenados
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if (!localStorageItem) {
    // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacio
    localStorage.setItem(itemName,JSON.stringify(intialValue));
    parsedItem = intialValue;
  } else {
    // Si exsiten TODOs en el localStorage los regresamos como nuestros todos
    parsedItem = JSON.parse(localStorageItem);
  }

  // Guardamos nuestros TODOS del localStorage en nuestro estado
  const [item, setItem] = React.useState(parsedItem);

  //Creamos la funcion en la que actualizaremos nuestro localStorage
  const saveItem = (newItem) => {
    // convertimos a string nuestros TODOs
    const stringifiedItem = JSON.stringify(newItem);
    // Los guardamos en el localStorage
    localStorage.setItem(itemName,stringifiedItem);
    //Actualizamos nuestro estado
    setItem(newItem);
  }

  return [item, saveItem];
}



function App() {
  //Desestructuramos los datos que retornamos de nuestro custom hook
  // y le pasamos los argumentos que necesitamos (nombre y estaod inicial)
  const [todos, saveTodos] = useLocalStorage('TODOS_V1',[])
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
   // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex,1);
    // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
    saveTodos(newTodos);
  }
  return (
    <AppUI
    totalTodos={totalTodos}
    completedTodos={completedTodos}
    searchValue={searchValue}
    setSearchValue={setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={completeTodo}
    deleteTodo={deleteTodo}
    />
  );
}

export default App;
