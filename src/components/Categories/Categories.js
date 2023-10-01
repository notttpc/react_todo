import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import SingleCategory from "./SingleCategory";
import './Category.css'

// import currentUser for create functionality
import { useAuth } from "../../contexts/AuthContext";
import CatCreate from "./CatCreate";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    // The two hooks below are used for create functionality
    const { currentUser } = useAuth();
    // The hook below tracks the state of the create form
    const [showCreate, setShowCreate] = useState(false);

    const getCategories = () => {
        axios.get(`https://localhost:7019/api/Categories`).then((response) => {
            console.log(response);
            setCategories(response.data);
        });
    };

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            <div className="categories background">
                <article className="bg-danger mb-5 p-5 text-dark">
                    <h1 className="text-center Title">Categories</h1>
                {/* CREATE UI */}
                {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                    <div className="bg-dark p-2 mb-3 text-center col-md-6 offset-3">
                        {showCreate ? (
                            <>
                                <button onClick={() => setShowCreate(false)} className="btn btn-danger">
                                    Cancel
                                </button>
                                <CatCreate setShowCreate={setShowCreate} getCategories={getCategories} />
                            </>
                        ) : (
                            <button onClick={() => setShowCreate(true)} className="btn btn-outline-danger">
                                Create Category
                            </button>
                        )}
                    </div>
                )}
                </article>
                <section className="categories">
                    <Container className="p-2">
                        <table id="table" className="table table-dark table-striped my-3">
                            <thead className="table-danger">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <th>Tools</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {/* READ UI */}
                                {categories.map((c) => (
                                    // We add getCategories as a prop below so we can call this functionality
                                    // from the Singlecategory component and pass it to our Edit logic in CatForm
                                    <SingleCategory key={c.categoryId} category={c} getCategories={getCategories} />
                                ))}
                                {/* END READ UI */}
                            </tbody>
                        </table>
                    </Container>
                </section>
            </div>
        </>
    );
}
