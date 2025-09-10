import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login"
import EditorPage from "./Pages/Editor";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="SignUp" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="Home" element={<Home />} />
            <Route path="Editor/:projectId" element={<EditorPage />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App