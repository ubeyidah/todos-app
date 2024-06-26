import React, { useEffect, useState } from "react";
import { moonIcon, sunIcon } from "./assets/images";
import "./index.css";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

export default function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState("");
  const [filtered, setFiltered] = useState(todos);
  const [currentLink, setCurrentLink] = useState("all");
  const [completed, setCompleted] = useState(
    todos.every((todo) => todo.isCompleted)
  );
  const [isDark, setIsDark] = useState(false);

  //sync completed when tods change
  useEffect(() => {
    setCompleted(todos.every((todo) => todo.isCompleted));
  }, [todos]);
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

  //flip all complete todos
  const flipAllComplete = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isCompleted: !completed }))
    );
  };

  // clear completed todos
  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
  };
  // filter data
  const handleClick = (e) => {
    const { value } = e.target;
    setCurrentLink(value);
    setFiltered(() => {
      if (value === "all") {
        return todos;
      } else if (value === "active") {
        return todos.filter((todo) => !todo.isCompleted);
      } else if (value === "completed") {
        return todos.filter((todo) => todo.isCompleted);
      }
    });
  };

  // sync filtered data with main
  useEffect(() => {
    setFiltered(() => {
      if (currentLink === "all") {
        return todos;
      } else if (currentLink === "active") {
        return todos.filter((todo) => !todo.isCompleted);
      } else if (currentLink === "completed") {
        return todos.filter((todo) => todo.isCompleted);
      }
    });
  }, [todos]);

  // update todos
  const update = (id, value) => {
    if (value) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: value } : todo
        )
      );
    }
  };

  return (
    <div className={`app ${isDark && "dark"}`}>
      <main className="content">
        <div className="container">
          <header>
            <h1 className="title">TODO</h1>
            <button
              className="center btn"
              onClick={() => setIsDark((prevMode) => !prevMode)}
            >
              <img src={isDark ? sunIcon : moonIcon} alt="theme icon" />
            </button>
          </header>

          <section
            className={`inputs ${completed && todos.length > 0 && "complete"}`}
          >
            <button className="check-box" onClick={flipAllComplete}></button>
            <input
              type="text"
              placeholder="Create a new todo..."
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={addTodo}
              value={todo}
            />
          </section>

          <section className="todos">
            {filtered.length <= 0 && (
              <div className="empty">
                {currentLink === "all"
                  ? "empty"
                  : `You don't have ${currentLink} todo`}
              </div>
            )}
            {filtered.map((todo) => (
              <Todo
                key={todo.id + "" + Math.random()}
                {...todo}
                remove={() => deleteTodo(todo.id)}
                setComplete={() => makeItCompleted(todo.id)}
                update={update}
              />
            ))}

            <div className="todos-footer">
              <p className="todo-length">
                {todos.filter((todo) => !todo.isCompleted).length} item
                {todos.filter((todo) => !todo.isCompleted).length > 1 &&
                  "s"}{" "}
                left
              </p>
              <div className="links">
                <button
                  value="all"
                  className={`link ${currentLink === "all" && "active"}`}
                  onClick={handleClick}
                >
                  All
                </button>
                <button
                  value="active"
                  className={`link ${currentLink === "active" && "active"}`}
                  onClick={handleClick}
                >
                  Active
                </button>
                <button
                  value="completed"
                  className={`link ${currentLink === "completed" && "active"}`}
                  onClick={handleClick}
                >
                  Completed
                </button>
              </div>
              <button className="link" onClick={clearCompleted}>
                Clear Completed
              </button>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
