import React, { useState } from "react";
import styled from "styled-components";



const SpanStyle = styled.div`
    span {
      display: flex;
      align-items: center;
      width: 150px;
      
    }
    h3{
      text-decoration: ${(props) => props.checked && "line-through"};
    }

    h4 {
      margin-right: 1rem;
      margin-right: 10px; 
      min-width: 20px; 
    }
  
    border: 7px solid;
    border-radius: 10px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    transform: all 0.3s ease-in-out;
&:hover{
  color:cyan;
}


    button{
      background-color: chocolate;
      cursor: pointer;
      border: none;
      font-size: 1rem;
      &:hover{
        color: gold;
    }
   
    }
  `;

const TodoWrapper = ({nr, todo, deleteTodo}) => {

const[isChecked, setIsChecked] = useState({

  completed:false,
  button:false,

})


const HandleCheck = (prev) =>{

  setIsChecked({completed:!prev.completed,
    button:!prev.button
  })
}




  

  return (
    <SpanStyle {...{checked:isChecked.completed}} onClick={HandleCheck}>
      <span>
        <h4>{nr + 1}.</h4>
        <h3>{todo}</h3>
      </span>
      {isChecked.button &&<button onClick={deleteTodo}>Delete</button>}
    </SpanStyle>
  );
};

export default TodoWrapper;
