import React from "react";
import { Container, Card } from "react-bootstrap";
import photo from "../../images/Blake-headshot.jpg";
import "./About.css";

export default function About() {
    return (
        <div className="background">
            <article className="bg-danger mb-5 p-3 text-dark">
                <h1 className="text-center Title">About Me</h1>
            </article>
            <Container>
                <div className="row">
                    <div className="col-md-6">
                        <img className="photo mb-5 mt-5" src={photo} alt="Blake Harrison" />
                    </div>
                    <div className="col-md-6 mt-4 mb-5 p-2">
                        <Card className="information">
                            <h1 className="text">Information About Me!</h1>
                            <div className="col-md-10 mt-3 offset-1">
                                <p className="info">
                                    Greetings! I'm Blake Harrison, and I want to express my gratitude for taking the time to explore my
                                    React ToDo App. Crafting this humble ToDo App has been an enjoyable journey. Beneath its unassuming
                                    exterior, it boasts a multitude of functionalities, including seamless communication with a T-SQL
                                    database. Additionally, it harnesses the power of various npm packages like Bootstrap and React Router,
                                    enhancing its capabilities and user experience.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    );
}
