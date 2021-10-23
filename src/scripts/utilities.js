const fetchRoute = async(route, callback) => {
  const response = await fetch(route);
  const data = await response.json();
  callback(data);
}