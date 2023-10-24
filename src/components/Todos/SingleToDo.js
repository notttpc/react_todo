import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import ToDoEdit from "./ToDoEdit";
import './ToDo.css'

export default function SingleToDo(props) {

    const { currentUser } = useAuth();

    const [showEdit, setShowEdit] = useState(false);

    const flipDone = () => {
        let updatedToDo = {
            toDoId: props.todo.toDoId,
            name: props.todo.name,
            done: !props.todo.done,
            categoryId: props.todo.categoryId,
        };
        axios.put(`http://todoapi.blakemharrison.com/api/ToDos/${props.todo.toDoId}`, updatedToDo).then((response) => {
            console.log(response);
            props.getToDos();
        });
    };

    const deleteToDo = (id) => {
        if (window.confirm(`Are you sure you want to delete ${props.todo.name}`)) {
            axios.delete(`http://todoapi.blakemharrison.com/api/ToDos/${id}?`).then(() => {
                props.getToDos();
            });
        }
    };

    return (
        <tr>
            <td>
                <input className="checkbox" type="checkbox" checked={props.todo.done} onChange={() => flipDone()} />
            </td>
            <td>{props.todo.name}</td>
            <td>{props.todo.category.catName}</td>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <td className="text-center">
                    <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
                        <FaEdit />
                    </button>
                    <button className="m-1 rounded" id="deletLink" onClick={() => deleteToDo(props.todo.toDoId)}>
                        <FaTrashAlt />
                    </button>
                    {showEdit && <ToDoEdit showEdit={showEdit} setShowEdit={setShowEdit} getToDos={props.getToDos} todo={props.todo} />}
                </td>
            )}
        </tr>
    );
}
