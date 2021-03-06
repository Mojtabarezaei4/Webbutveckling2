import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import nextId from "react-id-generator"

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([ ])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return[...prevTodos, {id: nextId(), name: name, complete:false}]
    })
    todoNameRef.current.value = null
  }
 
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  
  return (
    <>
      <h2>Todo App</h2>
      <input ref={todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <TodoList todos={todos} toggleTodo={toggleTodo} />

      <did> {todos.filter(todo => !todo.complete).length} left to do</did>
    </>
  )
}

export default App;
