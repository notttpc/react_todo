import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import SingleCategory from "./SingleCategory";

export default function Categories() {
    const [categories, setCategories] = useState([]);

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
                </article>
                <section className="categories">
                    <Container className="p-2">
                        <table className="table bg-info table-dark my-3">
                            <thead className="table-secondary">
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
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
