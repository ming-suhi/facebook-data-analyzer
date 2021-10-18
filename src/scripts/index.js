Chart.defaults.color = "#fff";

fetchRoute('/user/messages/encountered', data => {
  const p = new P(`<strong block>${data}</strong> messages encountered`);
  document.getElementById('profile').appendChild(p);
});

fetchRoute('/user/messages/received', data => {
  const p = new P(`<strong block>${data}</strong> messages received`);
  document.getElementById('profile').appendChild(p);
});

fetchRoute('/user/messages/sent', data => {
  const p = new P(`<strong block>${data}</strong> messages sent`);
  document.getElementById('profile').appendChild(p);
});

fetchRoute('/user/words/sent', data => {
  const p = new P(`<strong block>${data}</strong> words sent`);
  document.getElementById('profile').appendChild(p);
});

fetchRoute('/user/messages/sent-per-year/chart-data', data => {
  const canvas = document.createElement('canvas');
  document.getElementById('yearly-chart').appendChild(canvas);
  new Chart(canvas, data);
});

fetchRoute('/user/messages/sent-per-hour/chart-data', data => {
  const canvas = document.createElement('canvas');
  document.getElementById('hourly-chart').appendChild(canvas);
  new Chart(canvas, data);
});