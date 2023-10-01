import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Container } from "react-bootstrap";
import SingleToDo from "./SingleToDo";
import FilterCat from "./FilterCat";
import ToDoCreate from "./ToDoCreate";

export default function Todos() {
    const [resources, setResources] = useState([]);

    // The below hooks are added for create functionality
    const { currentUser } = useAuth();
    const [showCreate, setShowCreate] = useState(false);

    const [filter, setFilter] = useState(0);

    const getResources = () => {
        axios.get(`https://localhost:7019/api/ToDos`).then((response) => {
            setResources(response.data);
        });
    };

    useEffect(() => {
        getResources()
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
                                <ToDoCreate setShowCreate={setShowCreate} getResources={getResources} />
                            )}
                        </div>
                    </div>
                )}
            </article>
            <FilterCat setFilter={setFilter} />
            <section className="ToDos">
                    <Container className="p-2">
                        <table id="table" className="table table-dark table-striped my-3">
                            <thead className="table-danger">
                                <tr>
                                    <th>Completed?</th>
                                    <th>Task</th>
                                    <th>Category</th>
                                    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <th>Tools</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {/* READ UI */}
                                {resources.map((r) => (
                                    // We add getCategories as a prop below so we can call this functionality
                                    // from the Singlecategory component and pass it to our Edit logic in CatForm
                                    <SingleToDo key={r.toDoId} toDo={r} getResources={getResources} />
                                ))}
                                {/* END READ UI */}
                            </tbody>
                        </table>
                    </Container>
                </section>
        </div>
    );
}
