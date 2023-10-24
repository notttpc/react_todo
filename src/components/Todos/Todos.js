import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Container } from "react-bootstrap";
import SingleToDo from "./SingleToDo";
import FilterCat from "./FilterCat";
import ToDoCreate from "./ToDoCreate";

export default function Todos() {
    const [toDo, setToDo] = useState([]);

    // The below hooks are added for create functionality
    const { currentUser } = useAuth();
    const [showCreate, setShowCreate] = useState(false);

    const [filter, setFilter] = useState(0);
    const [showDone, setShowDone] = useState(false);

    const getToDos = () => {
        axios.get(`http://todoapi.blakemharrison.com/api/ToDos`).then((response) => {
            console.log();
            setToDo(response.data);
        });
    };

    useEffect(() => {
        getToDos();
    }, []);

    return (
        <div className="todo background">
            <article className="bg-danger mb-5 p-5 text-dark">
                <h1 className="text-center Title">What ToDo</h1>
                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <div className="bg-dark p-2 mb-3 text-center col-md-6 offset-3">
                        <button className="btn btn-outline-danger" onClick={() => setShowCreate(!showCreate)}>
                            {!showCreate ? "Create New Resource" : "Close Form"}
                        </button>
                        <div className="createContainer">
                            {showCreate && (
                                //Conditionally render ResourceCreate when showCreate === true
                                <ToDoCreate setShowCreate={setShowCreate} getToDos={getToDos} />
                            )}
                        </div>
                    </div>
                )}
            </article>
            <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
            <section className="ToDos">
                <Container className="p-2">
                    <table id="table" className="table table-dark table-striped my-3">
                        <thead className="table-danger">
                            <tr>
                                <th>Completed?</th>
                                <th>Task</th>
                                <th>Category</th>
                                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && <th>Tools</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {!showDone ? (
                                <>
                                    {filter === 0
                                        ? toDo
                                              .filter((x) => x.done === false)
                                              .map((x) => <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />)
                                        : toDo
                                              .filter((x) => x.done === false && x.categoryId === filter)
                                              .map((x) => <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />)}
                                </>
                            ) : (
                                <>
                                    {filter === 0
                                        ? toDo.map((x) => <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />)
                                        : toDo
                                              .filter((x) => x.categoryId === filter)
                                              .map((x) => <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />)}
                                </>
                            )}
                        </tbody>
                    </table>
                    {!showDone ? (
                        <>
                            {filter !== 0 && toDo.filter((x) => x.done === false && x.categoryId === filter).length === 0 && (
                                <h2 className="alert alert-warning text-dark">There are no incomplete To Do items in this category.</h2>
                            )}
                        </>
                    ) : (
                        <>
                            {filter !== 0 && toDo.filter((x) => x.categoryId === filter).length === 0 && (
                                <h2 className="alert alert-warning text-dark">There are no To Do items in this category.</h2>
                            )}
                        </>
                    )}
                </Container>
            </section>
        </div>
    );
}
