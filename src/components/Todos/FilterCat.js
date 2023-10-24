import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ToDo.css";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function FilterCat(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://todoapi.blakemharrison.com/api/Categories`).then((response) => {
            console.log(response);
            setCategories(response.data);
        });
    }, []);

    return (
        <div className="text-center mt-5">
            <button onClick={() => props.setFilter(0)} id="filters" className="btn btn-outline-danger bg-dark m-2">
                All
            </button>

            {categories.map((c) => (
                <button
                    key={c.categoryId}
                    id="filters"
                    className="btn btn-outline-danger bg-dark m-2"
                    onClick={() => props.setFilter(Number(c.categoryId))}
                >
                    {c.catName}
                </button>
            ))}

            {!props.showDone ?
                <button id="filters" className="btn btn-outline-danger bg-dark m-2" onClick={() => props.setShowDone(!props.showDone)}>
                    Show Complete &ensp;<ImEye />
                </button>:
                <button id="filters" className="btn btn-outline-danger bg-dark m-2" onClick={() => props.setShowDone(!props.showDone)}>
                    Hide Complete &ensp;<ImEyeBlocked/> 
                </button>
            } 
        </div>
    );
}
