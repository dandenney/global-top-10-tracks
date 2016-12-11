// *************************************
//
//   Track Life
//   -> App JS
//
// *************************************

  // -------------------------------------
  //   Register a Service Worker
  // -------------------------------------
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', function () {
  //     navigator.serviceWorker.register('/sw.js').then(function (registration) {
  //       // Registration was successful
  //       console.log('SW reg succesful with scope: ', registration.scope);
  //     }).catch(function (err) {
  //       // Regisration failed
  //       console.log('SW registration failed: ', err);
  //     });
  //   });
  // }

  // -------------------------------------
  //   Fetch JSON
  // -------------------------------------

  // Get a URL with fetch
  function get(url) {
    return fetch(url, {
      method: 'get',
    });
  }

  // Get JSON from a URL
  function getJSON(url) {
    return get(url).then(response => {
      return response.json();
    });
  }

  // Output JSON into the dom
  function outputJSON() {
    getJSON('data/global-top-10-tracks.json')
      // If retrieving JSON is succesful
      .then(response => renderTracks(response))
      // If retrieving JSON fails
      .catch(error => console.log(error));
  }

  // -------------------------------------
  //   Render Tracks
  // -------------------------------------

  function renderTracks(response) {

    // -------------------------------------
    //   Render All Tracks
    // -------------------------------------

    // Variables
    const tracks = response.tracks;
    // Loop over tracks
    tracks.forEach((track, i) => {
      // Set variables from JSON keys
      const ID = track.trackID;
      const name = track.trackName;
      const artist = track.trackArtist;
      // Output from the JSON keys using template strings, woohoo!
      document.querySelector('#tracks-container').innerHTML += `
        <article class='tracks-track'>
          <a class='tracks-link' data-track='${i}' href='#track'>
            <img class='tracks-img' src='images/${ID}.jpeg' />
            <h4 class='tracks-title'>${name}</h4>
            <h5 class='tracks-artist'>${artist}</h5>
            <p class='tracks-lastRanked'><!-- TODO: Output last item in dates array -->12/2/16</p>
          </a>
        </article>
      `;
    });

    // -------------------------------------
    //   Render Single Tracks
    // -------------------------------------

    // Variables
    const trackLinks = document.querySelectorAll('.tracks-link');

    // Loop over track data
    trackLinks.forEach(trackLink => {

      // Listen for clicks to tracks
      trackLink.addEventListener('click', function () {
        document.querySelector('#track-positions').innerHTML = '';
        document.querySelector('#track-streams').innerHTML = '';

        // Variables
        const index = this.getAttribute('data-track');
        const name = response.tracks[index].trackName;
        const artist = response.tracks[index].trackArtist;
        const ID = response.tracks[index].trackID;
        const trackPositions = response.tracks[index].trackPositions;
        const trackStreams = response.tracks[index].trackStreams;

        // Output track meta information
        document.querySelector('#track-info').innerHTML = `
          <img class='track-img' src='images/${ID}.jpeg' />
          <div class='meta'>
            <h1 class='track-title'>${name}</h1>
            <h2 class='track-artist'>${artist}</h2>
          </div>
        `;

        // Output track positions
        trackPositions.forEach(trackPosition => {
          const date = trackPosition.positionDate;
          const rank = trackPosition.positionRank;
          document.querySelector('#track-positions').innerHTML += `
            <tr>
              <td>${date}</td>
              <td>${rank}</td>
            </tr>
          `;
        });

        // Output track positions
        trackStreams.forEach(trackStream => {
          const date = trackStream.streamDate;
          const count = trackStream.streamCount;
          document.querySelector('#track-streams').innerHTML += `
          <tr>
            <td>${count}</td>
          </tr>
          `;
        });

      });
    });

  }

  // -------------------------------------
  //   Initialize
  // -------------------------------------

  outputJSON();
