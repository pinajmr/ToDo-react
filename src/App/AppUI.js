import React from "react";
import { TodoCounter } from "../TodoCounter";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";

// Desesctructuramos las nuevas props
function AppUI({
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    completeTodo,
    deleteTodo,
  }) {
    return (
      <>
        <TodoCounter
          total={totalTodos}
          completed={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
  
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
  
        <CreateTodoButton />
      </>
    );
  }

export { AppUI };