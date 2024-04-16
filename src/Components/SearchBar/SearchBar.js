import React, {useState} from "react";

import './SearchBar.css';

function SearchBar(props){
    const [term, setTerm] = useState('music');

    const handleTermChange = (event) => {
        setTerm(event.target.value.replace(/ /g,"+"));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchSpotify(term);
    };

    return (
        <div className="SearchBar">
            <input type="text" name="searchBar" placeholder="Search for music!!" onChange={handleTermChange}></input>
            <button onClick={handleSubmit}>Let's Go!</button>
        </div>
    );
};

export default SearchBar;