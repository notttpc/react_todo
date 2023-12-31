import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Auth/Logout";
import './Navigation.css'

export default function Navigation() {
    const { currentUser } = useAuth();

    return (
        <Navbar expand="md" variant="dark" bg="dark" className="p-3">
            <Navbar.Brand id="hometitle" href="/">ReactJS ToDo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                {/* Links for each page will go here. In this project we are using react-router-dom,
                which carries a link component that will render the anchor tag associated with the 
                router we created in App.js. To access the react-router-dom package, we must first:
                    1) npm install react-router-dom
                    2) import Link from 'react-router-dom' */}
                <Nav>
                    {currentUser && (
                        <>
                            <Link to="/todos" className=" nav-sub mt-1">
                                Todos
                            </Link>
                            <Link to="/categories" className=" nav-sub mt-1">
                                Categories
                            </Link>
                        </>
                    )}
                    <Link to="/about" className=" nav-sub mt-1">
                        About
                    </Link>
                    {!currentUser && (
                        <Link to="/login" className=" nav-sub mt-1">
                            Login
                        </Link>
                    )}
                        {currentUser && <Logout />}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
