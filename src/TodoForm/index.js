import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css'

function TodoForm() {
    // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue] = React.useState('');
    // Desestructuramos las funcitones que necesitamos para anadir un TODO y  cerrar nuesto modal
    const {
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext);

    // Creamos una funcion para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    }

    // Function para cerrar el modal
    const onCancel = () => {
        setOpenModal(false);
    };

    //Function para agregar nuestro nuevo TODO
    const onSubmit = (event) => {
        // prevent defaul para evitar recargar la pagina
        event.preventDefault();
        //Utilizamos nuestra function para anadir nuestro TODO
        addTodo(newTodoValue);
        //cerramos nuesto modal
        setOpenModal(false);
        // Tambien estaria bien resetear nuestro formulario
        setNewTodoValue('');
    };
    
    return (
        <form onSubmit={onSubmit}>
            <label> Write your new TODO</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder="Run 10 km"
            />
            <div className='TodoForm-buttonContainer'>
                <button 
                type='button'
                className='TodoForm-button TodoForm-button--cancel'
                onClick={onCancel}
                >
                Cancel
                </button>
                <button
                    type='submit'
                    className='TodoForm-button TodoForm-button--add'
                >
                    Add
                </button>
            </div>
        </form>
    );
}
export { TodoForm };