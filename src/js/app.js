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
//   Usage
// -------------------------------------

// Get a URL with fetch
function get(url) {
  return fetch(url, {
    method: 'get'
  });
}

// Get JSON from a URL
function getJSON(url) {
  return get(url).then(function(response) {
    return response.json();
  });
}

// Output JSON into the dom
function outputJSON() {

  getJSON('data/global-top-10-tracks.json')
  .then(function(response) {
    document.querySelector('.json-output').innerHTML = '<pre>' + JSON.stringify(response, null, 2) + '</pre>'
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })

}

outputJSON();
