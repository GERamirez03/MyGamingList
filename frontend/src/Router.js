import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import AccountViewer from "./AccountViewer";
import ProfileViewer from "./ProfileViewer";
import GameList from "./GameList";
import GameDetail from "./GameDetail";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import ReviewViewer from "./ReviewViewer";

function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/signup" element={<SignupForm/>} />
            <Route exact path="/login" element={<LoginForm/>} />
            <Route exact path="/account" element={<AccountViewer/>} />
            <Route exact path="/reviews" element={<ReviewList />} />
            <Route exact path="/games/search" element={<GameList/>} />
            <Route exact path="/reviews/new" element={<ReviewForm/>} />
            <Route exact path="/reviews/edit" element={<ReviewForm isEdit={true} />} />
            <Route path="/users/:username" element={<ProfileViewer/>} />
            <Route path="/games/:slug" element={<GameDetail/>} />
            <Route path="/reviews/:id" element={<ReviewViewer/>} />
            {/* <Route path="/reviews/:slug" element={<ReviewList SLUG />} /> */}
        </ Routes>
    );
}

export default Router;