// *************************************
//
//   File Name
//   -> Description
//
// *************************************

  // -------------------------------------
  //   Private Variables
  // -------------------------------------

  // ...

  // -------------------------------------
  //   Initialize
  // -------------------------------------

  // -------------------------------------
  //   Set Event Handlers
  // -------------------------------------

  // -------------------------------------
  //   Service Worker
  // -------------------------------------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('SW reg succesful with scope: ', registration.scope);
      }).catch(function (err) {
        // Regisration failed
        console.log('SW registration failed: ', err);
      });
    });
  }
  // -------------------------------------
  //   Usage
  // -------------------------------------
  // Get a URL with fetch
  function get(url) {
    return fetch(url, {
      method: 'get',
    });
  }
  // Get JSON from a URL
  function getJSON(url) {
    return get(url).then(function (response) {
      return response.json();
    });
  }
  // Output JSON into the dom
  function outputJSON() {
    getJSON('data/global-top-10-tracks.json')
    .then(function (response) {
      const tracks = response.tracks;
      tracks.forEach(function (track, i) {
        // Set variables from JSON keys
        const ID = track.trackID;
        const name = track.trackName;
        const artist = track.trackArtist;
        // Output from the JSON keys using template strings, woohoo!
        document.querySelector('#all').innerHTML += `
          <article>
            <img src="images/${ID}.jpeg" />
            <h3><a class='track-link' data-track='${i}' href='#track'>${name}</a></h3>
            <h4>${artist}</h4>
          </article>
        `;
      });
      const trackLinks = document.querySelectorAll('.track-link');
      trackLinks.forEach(function (trackLink) {
        trackLink.addEventListener('click', function () {
          document.querySelector('#track-positions').innerHTML = '';
          document.querySelector('#track-streams').innerHTML = '';
          // Get the track's object index from the data attribute
          const index = this.getAttribute('data-track');
          const name = response.tracks[index].trackName;
          const artist = response.tracks[index].trackArtist;
          const ID = response.tracks[index].trackID;
          const trackPositions = response.tracks[index].trackPositions;
          const trackStreams = response.tracks[index].trackStreams;
          // Output track meta information
          document.querySelector('#track-meta').innerHTML = `
            <img src='images/${ID}.jpeg' />
            <h1>${name}</h1>
            <h2>${artist}</h2>
          `;
          // Output track positions
          trackPositions.forEach(function (trackPosition) {
            const date = trackPosition.positionDate;
            const rank = trackPosition.positionRank;
            document.querySelector('#track-positions').innerHTML += `
              <li>${date}: ${rank}</li>
            `;
          });

          // Output track positions
          trackStreams.forEach(function (trackStream) {
            const date = trackStream.streamDate;
            const count = trackStream.streamCount;
            document.querySelector('#track-streams').innerHTML += `
              <li>${date}: ${count}</li>
            `;
          });
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  outputJSON();
