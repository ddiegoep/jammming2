import React from "react";
import './SearchResults.css'

import TrackingList from "../TrackingList/TrackingList";

function SearchResults(props) {

    return (
        <div className="searchResults">
            <div className="results">
                <h1>Results</h1>
                <TrackingList songs={props.songs} button={props.button} buttonTag={props.buttonTag}/>
            </div>
        </div>
    );
};

export default SearchResults;