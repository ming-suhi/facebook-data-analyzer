Chart.defaults.color = "#fff";

fetchRoute('/user/messages/encountered', data => {
  const ctx = document.getElementById('messagesEncountered');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages encountered`;
});

fetchRoute('/user/messages/received', data => {
  const ctx = document.getElementById('messagesReceived');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages received`;
});

fetchRoute('/user/messages/sent', data => {
  const ctx = document.getElementById('messagesSent');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages sent`;
});

fetchRoute('/user/words/sent', data => {
  const ctx = document.getElementById('wordsSent');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> words sent`;
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
    <th scope="row" ${channelRank < 3 ? `class="highlights shade-${parseInt(channelRank) + 1}"` : ""}>${parseInt(channelRank) + 1}</th>
    <td ${channelRank < 3 ? `class="highlights shade-${parseInt(channelRank) + 1}"` : ""}>${channel.name.length > 25 ? channel.name.substring(0, 25) + "..." : channel.name}</td>
    <td ${channelRank < 3 ? `class="highlights shade-${parseInt(channelRank) + 1}"` : ""}>${channel.count}</td>
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
    <th scope="row" ${wordRank < 3 ? `class="highlights shade-${parseInt(wordRank) + 1}"` : ""}>${parseInt(wordRank) + 1}</th>
    <td ${wordRank < 3 ? `class="highlights shade-${parseInt(wordRank) + 1}"` : ""}>${word.name}</td>
    <td ${wordRank < 3 ? `class="highlights shade-${parseInt(wordRank) + 1}"` : ""}>${word.count}</td>
    `
    ctx.getElementsByTagName("tbody")[0].appendChild(row);
  }
});