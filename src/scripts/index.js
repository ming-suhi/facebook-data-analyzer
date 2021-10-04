fetchRoute('/user/messages/encountered', data => {
  const ctx = document.getElementById('messagesEncountered');
  const element = document.createElement('p');
  element.innerText = `${data} messages encountered`;
  ctx.appendChild(element);
});

fetchRoute('/user/messages/received', data => {
  const ctx = document.getElementById('messagesReceived');
  const element = document.createElement('p');
  element.innerText = `${data} messages received`;
  ctx.appendChild(element);
});

fetchRoute('/user/messages/sent', data => {
  const ctx = document.getElementById('messagesSent');
  const element = document.createElement('p');
  element.innerText = `${data} messages sent`;
  ctx.appendChild(element);
});

fetchRoute('/user/words/sent', data => {
  const ctx = document.getElementById('wordsSent');
  const element = document.createElement('p');
  element.innerText = `${data} words sent`;
  ctx.appendChild(element);
});

fetchRoute('/user/messages/sent-per-year/chart-data', data => {
  const ctx = document.getElementById('yearsRankedChart');
  const chart = new Chart(ctx, data);
});

fetchRoute('/user/messages/sent-per-hour/chart-data', data => {
  const ctx = document.getElementById('favoriteHoursChart');
  const chart = new Chart(ctx, data);
});