import React from "react";
import { AppUI } from './AppUI';

// const defaultTodos = [
//   {text:'Cutting Tomato', completed:true},
//   {text:'Take Tomato',completed:false},
//   {text:'Warn steak', completed:false},
//   {text:'Trading',completed:false},
// ];

function useLocalStorage(itemName, intialValue){
  // Creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // Guardamos nuestros TODOS del localStorage en nuestro estado
  const [item, setItem] = React.useState(intialValue);

  React.useEffect(() => {
    //Simulamos un segundo delay de carga
    setTimeout(() => {
      // Manejamos la tara dentro de un try/catch por si ocurre algun error
      try {
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
            setItem(parsedItem);
          } catch(error) {
            // Caso de un error lo guardamos en el estado
            setError(error);
          } finally {
            // Tambien podemos utilizar la ultima parte finally para terminar la carga
            setLoading(false);
          }
    }, 1000);
  });


  

 
  //Creamos la funcion en la que actualizaremos nuestro localStorage
  const saveItem = (newItem) => {
    try {
      // convertimos a string nuestros TODOs
      const stringifiedItem = JSON.stringify(newItem);
      // Los guardamos en el localStorage
      localStorage.setItem(itemName,stringifiedItem);
      //Actualizamos nuestro estado
      setItem(newItem);
    } catch(error) {
      setError(error);
    }
  };

  // Para tener un mejor control de los datos retornados, podemos regresarlos dentro de un objeto
  return {
    item,
    saveItem,
    loading,
    error,
  };
}



function App() {
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
  }
  return (
    // Pasamos los valores de loading y error
    <AppUI
    loading={loading}
    error={error}
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
