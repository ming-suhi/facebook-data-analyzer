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

fetchRoute('/user/channels/rankedByMessages', data => {
  const table = document.createElement("table");
  const thead = table.createTHead();
  thead.innerHTML = `
  <tr>
    <th scope="col">#</th>
    <th scope="col">Channel</th>
    <th scope="col">Your Messages Count</th>
  </tr>
  `
  const tbody = table.createTBody();
  for(let channelRank in data.slice(0, 10)) {
    const channel = data[channelRank];
    const row = document.createElement('tr');
    row.innerHTML = `
    <th><strong>${parseInt(channelRank) + 1}</strong></th>
    <td>${channel.name.length > 25 ? channel.name.substring(0, 25) + "..." : channel.name}</td>
    <td>${channel.count}</td>
    `
    tbody.appendChild(row);
  }
  document.getElementById('channels-table').appendChild(table);
});

fetchRoute('/user/words/occurences', data => {
  const table = document.createElement("table");
  const thead = table.createTHead();
  thead.innerHTML = `
  <tr>
    <th scope="col">#</th>
    <th scope="col">Words</th>
    <th scope="col">Occurences</th>
  </tr>
  `
  const tbody = table.createTBody();
  for(let wordRank in data.slice(0, 10)) {
    const word = data[wordRank];
    const row = document.createElement('tr');
    row.innerHTML = `
    <th><strong>${parseInt(wordRank) + 1}</strong></th>
    <td>${word.name.length > 25 ? word.name.substring(0, 25) + "..." : word.name}</td>
    <td>${word.count}</td>
    `
    tbody.appendChild(row);
  }
  document.getElementById('words-table').appendChild(table);
});