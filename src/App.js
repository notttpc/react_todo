import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Categories from "./components/Categories/Categories";
import Todos from "./components/Todos/Todos";
import Navigation from "./components/Navigation";
import Login from "./components/Auth/Login";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Auth/Logout";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Navigation />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Todos />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/todos"
                            element={
                                <ProtectedRoute>
                                    <Todos />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/categories"
                            element={
                                <ProtectedRoute>
                                    <Categories />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
