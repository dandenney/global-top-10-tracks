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

  getJSON('https://s3-us-west-2.amazonaws.com/s.cdpn.io/140/dandenney.json')
  .then(function(response) {
    document.querySelector('.json-output').innerHTML = '<pre>' + JSON.stringify(response) + '</pre>'
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  })

}

outputJSON();
