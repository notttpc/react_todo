import React, { useState, useEffect } from "react";
import axios from "axios";
import './ToDo.css'

export default function FilterCat({ setFilter }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7019/api/Categories`).then((response) => {
            console.log(response);
            setCategories(response.data);
        });
    }, []);

    return (
        <div className="text-center mt-5">
            <button onClick={() => setFilter(0)} id="filters" className="btn btn-outline-danger bg-dark m-2">
                All
            </button>

            {categories.map((c) => (
                <button key={c.categoryId} id="filters" className="btn btn-outline-danger bg-dark m-2" onClick={() => setFilter(c)}>
                    {c.catName}
                </button>
            ))}
        </div>
    );
}
