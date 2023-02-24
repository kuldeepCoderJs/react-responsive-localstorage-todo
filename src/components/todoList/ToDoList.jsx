import "./todoList.css";
import config from "../../config";
import { useEffect, useState } from "react";

const ToDoList = () => {
  const [todoInpFld, setTodoInpFld] = useState("");
  const [todoList_arr, setTodoList_arr] = useState([]);
  const [editingInpFld, setEditingInpFld] = useState("");
  const [editingTodoID, setEditingTodoID] = useState(null);

  const handleAddTodo = () => {
    const newTodoList = [
      ...todoList_arr,
      {
        id: Math.floor(Math.random() * 1000000),
        value: todoInpFld,
        isCompleted: false,
        isStared: false,
      },
    ];
    localStorage.setItem(
      config.localStorageAppToDoListKey,
      JSON.stringify(newTodoList)
    );
    setTodoList_arr(newTodoList);
    setTodoInpFld("");
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList_arr.filter((el) => el.id !== id);
    localStorage.setItem(
      config.localStorageAppToDoListKey,
      JSON.stringify(newTodoList)
    );
    setTodoList_arr(newTodoList);
  };

  const handleUpdateTodo = (key, id, newValue) => {
    const newTodoList = todoList_arr.map((el) => {
      if (el.id === id) el[key] = newValue;
      return el;
    });
    localStorage.setItem(
      config.localStorageAppToDoListKey,
      JSON.stringify(newTodoList)
    );
    setTodoList_arr(newTodoList);
  };

  useEffect(() => {
    const getSyncedDataFromLocalStorage = JSON.parse(
      localStorage.getItem(config.localStorageAppToDoListKey)
    );
    setTodoList_arr(
      Array.isArray(getSyncedDataFromLocalStorage) &&
        getSyncedDataFromLocalStorage.length > 0
        ? getSyncedDataFromLocalStorage
        : []
    );
  }, []);

  return (
    <>
      <section className="addTodoSecCon">
        <input
          id="todoInpFld"
          type="text"
          value={todoInpFld}
          placeholder="Enter items"
          onChange={(e) => setTodoInpFld(e.target.value)}
        />
        <input
          id="addTodoBtn"
          type="button"
          value="Add+"
          onClick={() => todoInpFld && handleAddTodo()}
        />
      </section>

      <section className="todo_list_con">
        <ul>
          {todoList_arr.map((el) => (
            <li key={el.id}>
              <div className="d-flex-center-between">
                <div>
                  <input
                    type="checkbox"
                    checked={el.isCompleted}
                    onChange={() =>
                      handleUpdateTodo("isCompleted", el.id, !el.isCompleted)
                    }
                  />
                  {editingTodoID === el.id ? (
                    <input
                      value={editingInpFld}
                      onChange={(e) => setEditingInpFld(e.target.value)}
                    />
                  ) : (
                    <span>{el.value}</span>
                  )}
                  <i
                    title={el.isStared ? "remove as stared" : "mark as stared"}
                    className={`fa-star ${
                      el.isStared ? "fa-solid stared" : "fa-regular"
                    } markStaredBtn`}
                    onClick={() =>
                      handleUpdateTodo("isStared", el.id, !el.isStared)
                    }
                  ></i>
                </div>
                <div className="d-flex-center-between">
                  <div>
                    <i
                      className={`fa-solid ${
                        editingTodoID === el.id ? "fa-save" : "fa-pen"
                      } rounded-icon bg-secondary edit-icon`}
                      onClick={() => {
                        editingTodoID === el.id
                          ? (() => {
                              handleUpdateTodo("value", el.id, editingInpFld);
                              setEditingInpFld("");
                              setEditingTodoID(null);
                            })()
                          : (() => {
                              setEditingInpFld(el.value);
                              setEditingTodoID(el.id);
                            })();
                      }}
                    ></i>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-trash rounded-icon bg-danger delete-icon"
                      onClick={() => handleDeleteTodo(el.id)}
                    ></i>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ToDoList;
