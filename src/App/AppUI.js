import React from "react";
//Importamos nuestro contexto
import { TodoCounter } from "../TodoCounter";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoContext} from "../TodoContext";


function AppUI() {
    // Desesctructuramos las nuevas props
    const {
      error, 
      loading,
      searchedTodos,
      completeTodo,
      deleteTodo,
    } = React.useContext(TodoContext);
    return (
      <>
        <TodoCounter/>
        <TodoSearch/>

        {/* Podemos acceder a nuestro contexto con el consumer */}
        {/* <TodoContext.Consumer>
        {({
          error,
          loading,
          searchedTodos,
          completeTodo,
          deleteTodo,
        }) => ( */}
        <TodoList>
          {/* Show message for error */}
          {error && <p>Oww There are an error!</p>}
          {/* Show message for loading data */}
          {loading && <p> We are loading this site, keep calm</p>}
          {/* Finish load and they have not exist TODOS */}
          {(!loading && !searchedTodos.length) && <p> Create your first TODO!</p>}
          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
        {/* )}
        </TodoContext.Consumer> */}
        <CreateTodoButton />
      </>
    );
  }

export { AppUI };