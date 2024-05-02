import React, { useState } from "react";
import { moonIcon } from "./assets/images";
import "./index.css";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App() {
  const [todos, setTodos] = useState(
    () =>
      JSON.parse(localStorage.getItem("todos")) || [
        { id: "23452345swfa", title: "coding for the end", isCompleted: false },
        { id: "asdfaar3r", title: "doing some thing", isCompleted: true },
        { id: "asdfr3443", title: "math exam ", isCompleted: false },
      ]
  );
  const [todo, setTodo] = useState("");

  const addNewTodo = (title) => {
    const newTodo = { id: crypto.randomUUID(), title, isCompleted: false };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };
  localStorage.setItem("todos", JSON.stringify(todos));

  const addTodo = (e) => {
    if (e.key === "Enter") {
      if (todo) {
        addNewTodo(todo);
        setTodo("");
      }
    }
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
          <Todo key={todo.id} {...todo} />
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
