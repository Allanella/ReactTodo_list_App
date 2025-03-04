import React, { useState, useEffect } from "react";
import TodoWrapper from "./todoWrapper";
import styled from "styled-components";

const MyStyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-color: deeppink;
  padding: 1rem;

  input {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: border 0.3s ease-in-out;
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 18px;
    color: white;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    width: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }

  li {
    padding: 12px;
    margin: 8px 0;
    background: white;
    color: black;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
  }

  li:hover {
    background: lightgray;
    transform: scale(1.05);
  }
`;

const AddToDO = () => {
  const [item, setItem] = useState([]);
  const [addInput, setAddInput] = useState("");

  // 🔗 Load items from localStorage when the app loads
  useEffect(() => {
    const savedItems = localStorage.getItem("todos");
    if (savedItems) {
      setItem(JSON.parse(savedItems)); // fixed to setItem
    }
  }, []);

  // 🔗 Save items to localStorage every time items change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(item)); // fixed to item
  }, [item]);

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (addInput.trim() === "") {
      alert("please enter activity");
      return;
    }

    setItem([...item, addInput]);
    setAddInput("");
  };

  const HandleInput = (event) => {
    setAddInput(event.target.value);
  };

  const HandleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    const newTODO = [...item];
    newTODO.splice(index, 1);  // correctly removing the item at the given index
    setItem(newTODO);
  };

  return (
    <MyStyledDiv className="myInputDiv">
      <h1>My todo list App</h1>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="enter activity here"
          className="inputTodo"
          value={addInput}
          onChange={HandleInput}
        />
        <button type="submit">Add activity</button>
      </form>

      <ul>
        {item.map((todo, index) => (
          <TodoWrapper
            key={index}
            nr={index}
            todo={todo}
            deleteTodo={() => HandleDelete(index)}  // pass index correctly
          />
        ))}
      </ul>
    </MyStyledDiv>
  );
};

export default AddToDO;
