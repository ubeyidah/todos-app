import React from "react";
import { crossIcon } from "../assets/images";

const Todo = ({ title, id, isCompleted }) => {
  return (
    <div className="todo">
      <div className={`todo-left ${isCompleted && "complete"}`}>
        <div className="check-box"></div>
        <input type="text" value={title} disabled={true} />
      </div>
      <button className="delete-btn center btn">
        <img src={crossIcon} alt="close icon" />
      </button>
    </div>
  );
};

export default Todo;
