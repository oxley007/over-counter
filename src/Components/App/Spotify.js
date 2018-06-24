
const client_id = '0754c5a4428742edaac869ec67c7b8b1'; // Your client id
const client_secret = '340e37eaa75641efb6b53aa527e07417'; // Your secret
const redirect_uri = 'http://localhost:3000/'; // Your redirect uri
const apiKey = '29PyHhxOvoKaZmIRCBslGOs8kV2C-4Md7QO3HdpzFuvUPWwyYngcMGFwLl1xgRN1t_hTLZ02Vh18yauT9jBtN7xB7V5iguVfUNVxHyk0uQ0_g6sHnKWtsHteMWDcWnYx';

let accessToken
let expires_in = '';

const Spotify = {

getAccessToken() {
  //Hi Codecademy - can you supply me the correct code? I had major difficulty with this!!
console.log('hit getAccessToken');
  let checkToken = '';

  if (accessToken) {
    console.log('set set');
    //checkToken = 'set';
    return accessToken;
  }

if (!accessToken) {
  console.log('acces token not set');
  //set what should be in the url bar
  let urlSpotifyToken = `${redirect_uri}callback#access_token=${accessToken}/&token_type=Bearer&expires_in=${expires_in}`;
  //check to see if it is in the url bar.
  window.location.href.match(urlSpotifyToken);


    if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      console.log('access token & expiry matched.');
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expires_in = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expires_in * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else if (accessToken === undefined || accessToken === '') {
      console.log('access token empty - go login.');
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expires_in = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expires_in * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  else {
    console.log('hit nothing within not set.');
  }
}
else {
  console.log('set window location');
  window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
  accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
  expires_in = window.location.href.match(/expires_in=([^&]*)/);
  window.setTimeout(() => accessToken = '', expires_in * 1000);
}

},

search(song) {
  console.log(accessToken + ' any access token?');
    return fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&limit=5`, {
      headers:
      {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => {
      return response.json();
      console.log(response);

    }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(tracks => (
          {
          id: tracks.id,
          name: tracks.name,
          artist: tracks.artists[0].name,
          album: tracks.album.name,
          uri: tracks.uri
}
))
}
      else {
        //not sure what to do here...
      }

    });
},


savePlaylist(playlistName, trackURIs) {
  //Hi Codecademy. becasue I couldn't get the getAccessToken method working - this ws never hit. Again, if you could please supply the correct code. Thanks!
  if (playlistName && trackURIs) {
    console.log('Playlist or track URIs false, null, or empty');
    return;
  }
  //else if (!playlistName && !trackURIs) {
    console.log('Playlist or track URIs have value');
    console.log(accessToken);
    
    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    let headers = {Authorization: `Bearer ${accessToken}`}
    let user_id;

      return fetch(`https://api.spotify.com/v1/me/`, {
        headers: headers
      }).then(response => {
          return response.json();
          console.log(response);
        }).then(jsonResponse => {
          user_id = jsonResponse
        })
        console.log(user_id);

        let playlist_id;

        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          headers: headers
        }).then(response => {
            return response.json();
            console.log(response);
          }).then(response => {
              return response.json();
              console.log(response);
            }).then(jsonResponse => {
              playlist_id = jsonResponse
            })

            console.log(playlist_id);
            return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
              headers:
              {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )/*.then(response => {
              return response.json();
              console.log(response);

            }).then(jsonResponse => {
              if (jsonResponse.tracks) {
                console.log(jsonResponse);
                return jsonResponse.tracks.items.map(tracks => (
                  {
                  id: tracks.id,
                  name: tracks.name,
                  artist: tracks.artists[0].name,
                  album: tracks.album.name,
                  uri: tracks.uri
            }
          ))*/

    /*}
    else {
      console.log('faild to save playlist');
    }

  }*/
}

}

export default Spotify;
