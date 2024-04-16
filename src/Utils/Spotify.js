const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const Spotify = {

    Search(term, accessToken) {
        //search for item
        let data = fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            method: "GET"
        }).then(response => response.json()).then(jsonResponse => jsonResponse.tracks.items)

        return data;
    },

    ImplicitGrantAccess() {
        //get access to Spotify account with implicit grant method
        const redirectUri = 'https://ddiegoep.github.io/jammming2/';
        const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-private';
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
        window.location = url;
    },

    GetImplicitGrantToken() {
        const splitUrlHash = (window.location.hash).split('#');
        const anchor = splitUrlHash[1];
        const queryParams = new URLSearchParams(anchor);
        const token = queryParams.get('access_token');
        //let expiresIn = queryParams.get('expires_in');
        //console.log(`Token is: ${token} and expires in: ${expiresIn}`);

        return token;
    },

    CreatePlaylist(title, songs, token) {

        let playlistId;
        let uriArray = [];
        songs.map((song) => uriArray.push(song.uri));

        let body ={
            name: title,
            description: "Playlist created with jammming by Diego E.",
            public: false
        };
        body = JSON.stringify(body);
        return fetch("https://api.spotify.com/v1/me/playlists", {
            body,
            headers: {
                Authorization: "Bearer " + token,
            },
            method: "POST"
        }).then(response => response.json()).then(jsonresponse => {
            playlistId = jsonresponse.id;
            body = {
                uris: uriArray,
                position: 0
            };
            body = JSON.stringify(body);
            return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
                body,
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: 'Bearer ' + token
                },
                method: "POST"
        }).then(response => response.json()).then(jsonresponse => jsonresponse);
        });

    }
};

export default Spotify;