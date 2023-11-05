import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SignupForm from "./SignupForm";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/signup">
                <SignupForm />
            </Route>
        </Switch>
    );
}

export default Routes;