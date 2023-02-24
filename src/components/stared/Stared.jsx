import config from "../../config";
import { useState, useEffect } from "react";

const Stared = () => {
  const [staredToDos, setStaredToDos] = useState([]);

  const handleUpdateTodo = (key, id, newValue) => {
    let getSyncedDataFromLocalStorage = JSON.parse(
      localStorage.getItem(config.localStorageAppToDoListKey)
    );

    getSyncedDataFromLocalStorage =
      Array.isArray(getSyncedDataFromLocalStorage) &&
      getSyncedDataFromLocalStorage.length > 0
        ? getSyncedDataFromLocalStorage
        : [];

    const newTodoList = getSyncedDataFromLocalStorage.map((el) => {
      if (el.id === id) el[key] = newValue;
      return el;
    });
    localStorage.setItem(
      config.localStorageAppToDoListKey,
      JSON.stringify(newTodoList)
    );
    setStaredToDos(newTodoList.filter((el) => el.isStared));
  };

  useEffect(() => {
    const getSyncedDataFromLocalStorage = JSON.parse(
      localStorage.getItem(config.localStorageAppToDoListKey)
    );
    setStaredToDos(
      Array.isArray(getSyncedDataFromLocalStorage) &&
        getSyncedDataFromLocalStorage.length > 0
        ? getSyncedDataFromLocalStorage.filter((el) => el.isStared)
        : []
    );
  }, []);

  return (
    <>
      <section className="todo_list_con">
        <ul>
          {Array.isArray(staredToDos) && staredToDos.length > 0 ? (
            staredToDos.map((el) => (
              <li key={el.id}>
                <div className="d-flex-center-between">
                  <div>
                    <span>{el.value}</span>
                    <i
                      title={
                        el.isStared ? "remove as stared" : "mark as stared"
                      }
                      className={`fa-star ${
                        el.isStared ? "fa-solid stared" : "fa-regular"
                      } markStaredBtn`}
                      onClick={() =>
                        handleUpdateTodo(
                          "isStared",
                          el.id,
                          !el.isStared
                        )(() => {})()
                      }
                    ></i>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <h3 style={{ margin: "20px" }}>You can see stared To-Do's here</h3>
          )}
        </ul>
      </section>
    </>
  );
};

export default Stared;
