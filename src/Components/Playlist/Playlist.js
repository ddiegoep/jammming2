import React, {useState} from "react";
import TrackingList from "../TrackingList/TrackingList";

import './Playlist.css';

function Playlist(props) {

const [title, setTitle] = useState('Playlist #1');

const handleChange = (event) =>{
    setTitle(event.target.value);
};

const handleClick = (event) =>{
    event.preventDefault();
    props.saveToSpotify(title, props.songs);
};

    return (
        <div className="playlistContainer">
            <div className="playlist">
                <h1>
                    <input name="playlistTitle" type="text" placeholder="Playlist #1" onChange={handleChange}></input>
                </h1>
                <TrackingList songs={props.songs} button={props.button} buttonTag={props.buttonTag} />
                <button id="saveButton" onClick={handleClick}>Save to Spotify!</button>
            </div>
        </div>
    );
};

export default Playlist;