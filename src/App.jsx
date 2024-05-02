import React from "react";
import { moonIcon } from "./assets/images";
import "./index.css";

export default function App() {
  return (
    <main className="container">
      <header>
        <h1 className="title">TODO</h1>
        <button className="center">
          <img src={moonIcon} alt="theme icon" />
        </button>
      </header>

      <section className="inputs">
        <div className="check-box"></div>
        <input type="text" placeholder="Create a new todo..." />
      </section>
    </main>
  );
}
