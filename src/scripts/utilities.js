const fetchRoute = (route, callback) => {
  fetch(route)
  .then(response => response.json())
  .then(data => callback(data));
}