import React, { useState } from "react";
import { moonIcon } from "./assets/images";
import "./index.css";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState("");

  // create new todo
  const addNewTodo = (title) => {
    const newTodo = { id: crypto.randomUUID(), title, isCompleted: false };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  // save todos
  localStorage.setItem("todos", JSON.stringify(todos));

  // add todo
  const addTodo = (e) => {
    if (e.key === "Enter") {
      if (todo) {
        addNewTodo(todo);
        setTodo("");
      }
    }
  };

  // delete todo
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id != id));
  };

  // complete
  const makeItCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <main className="container">
      <header>
        <h1 className="title">TODO</h1>
        <button className="center btn">
          <img src={moonIcon} alt="theme icon" />
        </button>
      </header>

      <section className="inputs">
        <div className="check-box"></div>
        <input
          type="text"
          placeholder="Create a new todo..."
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={addTodo}
          value={todo}
        />
      </section>

      <section className="todos">
        {todos.map((todo) => (
          <Todo
            key={todo.id + "" + Math.random()}
            {...todo}
            remove={() => deleteTodo(todo.id)}
            setComplete={() => makeItCompleted(todo.id)}
          />
        ))}

        <div className="todos-footer">
          <p className="todo-length">5 items left</p>
          <div className="links">
            <button className="link active">All</button>
            <button className="link">Active</button>
            <button className="link">Completed</button>
          </div>
          <button className="link">Clear Completed</button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
