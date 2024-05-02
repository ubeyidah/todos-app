import React from "react";
import { moonIcon } from "./assets/images";
import "./index.css";
import Todo from "./components/Todo";

export default function App() {
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
        <input type="text" placeholder="Create a new todo..." />
      </section>

      <section className="todos">
        <Todo
          title="Coding for 4 hours a day"
          id="3ad3d3da3a"
          isCompleted={false}
        />
        <Todo
          title="Coding for 4 hours a day"
          id="3ad3d3da3asda"
          isCompleted={true}
        />
        <Todo
          title="Coding for 4 hours a day"
          id="3ad3d3da3asda"
          isCompleted={0}
        />
        <Todo
          title="Coding for 4 hours a day"
          id="3ad3d3da3asda"
          isCompleted={true}
        />
        <Todo
          title="Coding for 4 hours a day"
          id="3ad3d3da3asda"
          isCompleted={true}
        />

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
    </main>
  );
}
