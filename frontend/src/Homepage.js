import React from "react";
import { useSelector } from "react-redux";

function Homepage() {

    const username = useSelector(store => store.username);
    const token = useSelector(store => store.token);

    return (
        <div>
            <b>Welcome!</b>

            {username && <p>Signed in as: { username }</p>}
            {token && <p>with token: { token }</p>}
        </div>
    );
}

export default Homepage;