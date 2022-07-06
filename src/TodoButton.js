import React from "react";
import './CreateTodoButton.css';

function CreateTodoButton(props) {

    const onClickButton = (msg) => {
        alert(msg);
    }

    return(
        <>
        {/* ✅ */}
        <button 
            className="CreateTodoButton"
            onClick={() => onClickButton('Here is open the modal')}>
            +
        </button>
        {/* ❌ */}
        <button
            className="CreateTodoButton"
            onClick={() => onClickButton('You deleted')}>

        </button>
        </>
    );
}

export { CreateTodoButton};