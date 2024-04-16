import React from "react";

import './LogIn.css';

function LogIn(props) {

    const handleClick = (event) => {
        event.preventDefault();
        props.button();
    };

    return (
        <div className="LogIn">
            <p>Create your custom playlists on Spotify with jammming!</p>
            <button onClick={handleClick}>Log in to Spotify</button>
        </div>
    )

};

export default LogIn;