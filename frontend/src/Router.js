import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AccountViewer from "./AccountViewer";
import ProfileViewer from "./ProfileViewer";
import GameList from "./GameList";
import GameDetail from "./GameDetail";

function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/signup" element={<SignupForm/>} />
            <Route exact path="/login" element={<LoginForm/>} />
            <Route exact path="/account" element={<AccountViewer/>} />
            <Route exact path="/games/search" element={<GameList/>} />
            <Route path="/users/:username" element={<ProfileViewer/>} />
            <Route path="/games/:slug" element={<GameDetail/>} />
        </ Routes>
    );
}

export default Router;