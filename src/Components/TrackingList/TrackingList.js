import React from "react";

import Track from "../Track/Track";

function TrackingList(props) {

    return (
        <ul>
            {props.songs.map((song) => <Track songObject={song} button={props.button} buttonTag={props.buttonTag} key={song.id} id={song.id}/>)}
        </ul>
    );

};

export default TrackingList;