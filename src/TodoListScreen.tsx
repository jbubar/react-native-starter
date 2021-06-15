import React from 'react';

import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

import TodosProvider from './context/Todos';

const TodoListScreen = () => (
  <TodosProvider>
    <Navbar title="Todos Interview" />
    <TodoList />
    <AddTodo />
  </TodosProvider>
);

export default TodoListScreen;
