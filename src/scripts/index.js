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

fetchRoute('/user/channels/rankedByMessages', data => {
  const ctx = document.getElementById('rankedByMessages');
  for(let channelRank in data.slice(0, 10)) {
    const channel = data[channelRank];
    const row = document.createElement('tr');
    row.innerHTML = `
    <th scope="row">${parseInt(channelRank) + 1}</th>
    <td>${channel.name.length > 25 ? channel.name.substring(0, 25) + "..." : channel.name}</td>
    <td>${channel.count}</td>
    `
    ctx.getElementsByTagName("tbody")[0].appendChild(row);
  }
});

fetchRoute('/user/words/occurences', data => {
  const ctx = document.getElementById('rankedByOccurences');
  for(let wordRank in data.slice(0, 10)) {
    const word = data[wordRank];
    const row = document.createElement('tr');
    row.innerHTML = `
    <th scope="row">${parseInt(wordRank) + 1}</th>
    <td>${word.name}</td>
    <td>${word.count}</td>
    `
    ctx.getElementsByTagName("tbody")[0].appendChild(row);
  }
});