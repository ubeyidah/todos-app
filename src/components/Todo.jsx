import React, { useState } from "react";
import { crossIcon } from "../assets/images";

const Todo = ({ title, isCompleted, remove, setComplete, update, id }) => {
  const [locked, setLocked] = useState(true);
  const [label, setlabel] = useState(title);

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      update(id, label);
    }
  };
  return (
    <div className="todo">
      <div className={`todo-left ${isCompleted && "complete"}`}>
        <button className="check-box" onClick={setComplete}></button>
        <input
          type="text"
          value={locked ? title : label}
          onChange={(e) => !locked && setlabel(e.target.value)}
          onDoubleClick={() =>
            !isCompleted && setLocked((prevLock) => !prevLock)
          }
          onKeyDown={handleSubmit}
        />
      </div>
      <button className="delete-btn center btn" onClick={remove}>
        <img src={crossIcon} alt="close icon" />
      </button>
    </div>
  );
};

export default Todo;
