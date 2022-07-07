import React from 'react';
import { useLocalStorage } from './UseLocalStorage';


// Al crear el contexto tambien podemos pasarle un valor inicial entre los parentesis
const TodoContext = React.createContext();


function TodoProvider(props) {
// Nos traemos todo el estado y las funciones de nuestra ap que queremos globales
const [openModal, setOpenModal] = React.useState(false);
//Desestructuramos los datos que retornamos de nuestro custom hook
// y le pasamos los argumentos que necesitamos (nombre y estaod inicial)
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage('TODOS_V1',[])
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
  };

//   Retornameos nuestro proveedor con nuestro contexto en la etiqueta value, que recibira a toda nuestra app
// Por eso necesitamos la prop children
    return (
        // Pasamos los valores de loading y error
        <TodoContext.Provider value ={{
        openModal,
        setOpenModal,
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        }}
        >
        {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider};