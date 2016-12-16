// *************************************
//
//   Track Life
//   -> App JS
//
// *************************************

  // -------------------------------------
  //   Register a Service Worker
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
          <a class='tracks-link' data-track='${i}' href='#track-container'>
            <div>
              <img class='tracks-img' src='images/${ID}.jpeg' />
            </div>
            <div class='sb-pl-05'>
              <h4 class='tracks-title'>${name}</h4>
              <h5 class='tracks-artist'>${artist}</h5>
            </div>
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

        // Variables
        const index = this.getAttribute('data-track');
        const name = response.tracks[index].trackName;
        const artist = response.tracks[index].trackArtist;
        const ID = response.tracks[index].trackID;
        const trackPositions = response.tracks[index].trackPositions;
        const trackStreams = response.tracks[index].trackStreams;
        const trackPositionsDates = trackPositions.map( (a) => a.positionDate );
        const trackPositionsRanks = trackPositions.map( (a) => a.positionRank );
        const trackStreamsDates = trackStreams.map( (a) => a.streamDate );
        const trackStreamsCounts = trackStreams.map( (a) => Number(a.streamCount) );

        // Output track meta information
        document.querySelector('#track-meta').innerHTML = `
          <img class='track-img' src='images/${ID}.jpeg' />
          <div class='meta'>
            <h1 class='track-title'>${name}</h1>
            <h2 class='track-artist'>${artist}</h2>
          </div>
        `;

        // Calculate number of times ranked
        const rankedFilter = trackPositionsRanks.filter( trackPositionRank => trackPositionRank !== null);
        const rankedCount = rankedFilter.length

        // Get initial rank
        const rankedInitial = trackPositionsRanks[0];

        // Find highest rank (Hint: it's opposite day)
        const rankedHighest = Math.min(...rankedFilter);

        // Calculate streams total
        const streamsTotal = trackStreamsCounts.reduce((a, b) => a + b, 0);
        const streamsTotalFormatted = numberWithCommas(streamsTotal);

        // Calculate average streams per day
        const streamsFilter = trackStreamsCounts.filter( trackStreamsCount => trackStreamsCount > 0);
        const streamsAverage = Math.round(streamsTotal / streamsFilter.length);
        const streamsAverageFormatted = numberWithCommas(streamsAverage);

        // Find highest stream count
        const streamsHighest = Math.max(...streamsFilter);
        const streamsHighestFormatted = numberWithCommas(streamsHighest);

        // Find index of highest stream count
        const streamsHighestIndex = trackStreamsCounts.indexOf(streamsHighest);

        // Get date of highest stream count
        const streamsHighestDate = trackStreamsDates[streamsHighestIndex];

        // Find lowest stream count
        const streamsLowest = Math.min(...streamsFilter);
        const streamsLowestFormatted = numberWithCommas(streamsLowest);

        // Find index of lowest stream count
        const streamsLowestIndex = trackStreamsCounts.indexOf(streamsLowest);

        // Get date of highest stream count
        const streamsLowestDate = trackStreamsDates[streamsLowestIndex];

        // Output track performance information
        document.querySelector('#track-performance').innerHTML = `
          <p class='track-performance'>
            <span>${name}</span> has been in <a href='https://spotifycharts.com/regional'>Spotify's Global Top Ten</a> <span>${rankedCount}</span> times since 12/1/16, debuting at number ${rankedInitial} and reaching as high as number ${rankedHighest}.
          </p>
          <p>
            Those ${rankedCount} times combine for a total of ${streamsTotalFormatted} streams, averaging ${streamsAverageFormatted} streams per day. The most streams were ${streamsHighestFormatted} on ${streamsHighestDate} and the least were ${streamsLowestFormatted} on ${streamsLowestDate}.
          </p>
        `

        // Create a line chart using ranking dates and positions
        chartPosition(trackPositionsDates, trackPositionsRanks);

      });
    });

  }

  // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function chartPosition(trackPositionsDates, trackPositionsRanks) {

    const ctx = document.querySelector("#chart-position");
    const data = {
      labels: trackPositionsDates,
      datasets: [
        {
          label: "Top 10 Position",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(215,112,138, 0.2)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointRadius: 4,
          pointBorderColor: 'rgba(215,112,138, 0.2)',
          pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
          pointBorderWidth: '6',
          data: trackPositionsRanks,
          spanGaps: false
        }
      ]
    };
    let myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        legend: {
          labels: {
            fontColor: 'rgba(255, 255, 255, 0.4)',
            fontSize: 14
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.4)',
              max: 10,
              min: 1,
              reverse: true
            },
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: 'rgba(255, 255, 255, 0.4)'
            },
            gridLines: {
              color: "rgba(255, 255, 255, 0.025)"
            }
          }]
        }
      }
    });

  }

  // -------------------------------------
  //   Initialize
  // -------------------------------------

  outputJSON();
