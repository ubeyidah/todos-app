import React from "react";
import { crossIcon } from "../assets/images";

const Todo = ({ title, isCompleted, remove, setComplete }) => {
  return (
    <div className="todo">
      <div className={`todo-left ${isCompleted && "complete"}`}>
        <div className="check-box" onClick={setComplete}></div>
        <input
          type="text"
          value={title}
          onChange={() => console.log("3")}
          disabled={true}
        />
      </div>
      <button className="delete-btn center btn" onClick={remove}>
        <img src={crossIcon} alt="close icon" />
      </button>
    </div>
  );
};

export default Todo;
