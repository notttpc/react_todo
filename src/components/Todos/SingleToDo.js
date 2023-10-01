import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import ToDoEdit from "./ToDoEdit";

export default function SingleToDo(props) {
    const { done, name, categoryId, toDoId } = props.todo;

    const { currentUser } = useAuth();

    const [showEdit, setShowEdit] = useState(false);

    const deleteToDo = (id) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            axios.delete(`https://localhost:7019/api/Categories/${id}?`).then(() => {
                props.getToDos();
            });
        }
    };

    return (
        <tr>
            <td>{done}</td>
            <td>{name}</td>
            <td>{categoryId}</td>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <td>
                    <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
                        <FaEdit />
                    </button>
                    <button className="m-1 rounded" id="deletLink" onClick={() => deleteToDo(toDoId)}>
                        <FaTrashAlt />
                    </button>
                    {showEdit && (
                      <ToDoEdit 
                        showEdit={showEdit} 
                        setShowEdit={setShowEdit} 
                        getToDos={props.getToDos} ToDo={props.Todo}
                      />
                    )}
                </td>
            )}
        </tr>
    );
}
