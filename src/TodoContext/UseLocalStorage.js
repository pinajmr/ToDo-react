import React from 'react'

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
export { useLocalStorage};
  