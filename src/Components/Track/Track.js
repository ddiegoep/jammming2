import React from "react";

import './Track.css';


function Track(props) {

    const handleClick = (event) =>{
        event.preventDefault();
        props.button(props.songObject);
    };


    return (
        <li className="trackDisplay">
            <div className="track">
                <h2>{`${props.songObject.name}`}</h2>
                <p>{`Artist: ${props.songObject.artists[0].name}`}</p>
                <p>{`Album: ${props.songObject.album.name}`}</p>
            </div>
            <button onClick={handleClick}>{props.buttonTag}</button>
        </li>
    );

};

export default Track;