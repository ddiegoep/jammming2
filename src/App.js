import React, { useState, useEffect } from 'react';
import './App.css';

import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Spotify from './Utils/Spotify';
import Playlist from './Components/Playlist/Playlist';
import LogIn from './Components/LogIn/LogIn';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [songs, setSongs] = useState([]); //Songs returned by the API
  const [selectedSongs, setSelectedSongs] = useState([]); //Songs selected for our playlist

  const [IGToken, setIGToken] = useState(''); //Implicit Grant token


  //LOGIN BUTTON
  const logIn = () => {
    Spotify.ImplicitGrantAccess();
  };


  //CHECK IF LOGGED IN EVERYTIME THE APP REFRESHES & GET THE TOKEN IF SO
  const checkLoggedIn = () => {
    const actualURL = window.location.href;
    if (actualURL.includes('access_token')) {
      setLoggedIn(true);
      const token = Spotify.GetImplicitGrantToken();
      setIGToken(token);
    };
  };
  useEffect(() => checkLoggedIn(), []);


  //DISPLAY LOG IN BUTTON COMPONENT IF NOT LOGGED IN
  const checkLogIn = () => {
    if (!loggedIn) {
      return <LogIn button={logIn} />
    } else {
      return (
        <>
          <SearchBar searchSpotify={searchSpotify} accessToken={IGToken} />
          <div className='lists'>
            <SearchResults songs={songs} button={addSong} buttonTag={'+'} />
            <Playlist songs={selectedSongs} button={removeSong} buttonTag={'-'} saveToSpotify={saveToSpotify} />
          </div>
        </>
      )
    }
  };


  //RETURN RESULTS FROM SPOTIFY API
  const searchSpotify = async (term) => {
    const songList = await Spotify.Search(term, IGToken);
    setSongs(songList);
    //console.log(songs);
  };


  //ADD TO PLAYLIST
  const addSong = (song) => {
    if (!selectedSongs.includes(song)) {
      setSelectedSongs((prevSongs) => [...prevSongs, song]);
    };
  };
  //REMOVE FROM PLAYLIST
  const removeSong = (song) => {
    setSelectedSongs((songs) => songs.filter((prevSong) => prevSong !== song));
  }


  //SAVE PLAYLIST TO SPOTIFY & CLEAR
  const saveToSpotify = async (title, songs) => {
    await Spotify.CreatePlaylist(title, songs, IGToken);
    window.alert('Your playlist has been saved to Spotify!');
    setSelectedSongs([]);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div>ja</div>
        <div id="logoMs">mmm</div>
        <div>ing</div>
      </header>
      {checkLogIn()}
    </div >
  );
};

export default App;

