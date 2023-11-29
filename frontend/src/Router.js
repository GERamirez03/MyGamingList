import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AccountViewer from "./AccountViewer";
import ProfileViewer from "./ProfileViewer";

function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/signup" element={<SignupForm/>} />
            <Route exact path="/login" element={<LoginForm/>} />
            <Route exact path="/account" element={<AccountViewer/>} />
            <Route path="/users/:username" element={<ProfileViewer/>} />
        </ Routes>
    );
}

export default Router;