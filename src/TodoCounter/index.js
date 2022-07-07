import React from "react";
import "./TodoCounter.css";

// Desestructuramos los props que pasamos al componente
function TodoCounter({total, completed}) {
    return (
        <h2 className="TodoCounter">You have completed {completed} of {total} task</h2>
    )
}

export {TodoCounter};