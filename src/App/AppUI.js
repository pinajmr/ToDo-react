import React from "react";
//Importamos nuestro contexto
import { TodoCounter } from "../TodoCounter";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoContext} from "../TodoContext";
import { Modal} from "../Modal";
import { TodoForm } from '../TodoForm'


function AppUI() {
    // Desesctructuramos las nuevas props
    const {
      error, 
      loading,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
    } = React.useContext(TodoContext);
    return (
      <>
        <TodoCounter/>
        <TodoSearch/>
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
        {!!openModal && (
        <Modal>
            <TodoForm/>
        </Modal>
        )}
        {/* )}
        </TodoContext.Consumer> */}
        <CreateTodoButton 
          setOpenModal={setOpenModal}
        />
      </>
    );
  }

export { AppUI };