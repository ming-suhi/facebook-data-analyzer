Chart.defaults.color = "#fff";

const progress = new Progress(8, 'loading');

fetchRoute('/user/messages/encountered', data => {
  progress.changeState("Counting Messages Encountered . . .");
  const ctx = document.getElementById('messagesEncountered');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages encountered`;
  progress.add();
});

fetchRoute('/user/messages/received', data => {
  progress.changeState("Counting Messages Received. . .");
  const ctx = document.getElementById('messagesReceived');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages received`;
  progress.add();
});

fetchRoute('/user/messages/sent', data => {
  progress.changeState("Counting Messages Sent . . .");
  const ctx = document.getElementById('messagesSent');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> messages sent`;
  progress.add();
});

fetchRoute('/user/words/sent', data => {
  progress.changeState("Counting Words Sent . . .");
  const ctx = document.getElementById('wordsSent');
  ctx.innerHTML = `<strong class="highlights">${data}</strong> words sent`;
  progress.add();
});

fetchRoute('/user/messages/sent-per-year/chart-data', data => {
  progress.changeState("Creating Messages Sent Per Year Chart . . .");
  const ctx = document.getElementById('yearsRankedChart');
  const chart = new Chart(ctx, data);
  progress.add();
});

fetchRoute('/user/messages/sent-per-hour/chart-data', data => {
  progress.changeState("Creating Messages Sent Per Hour Chart . . .");
  const ctx = document.getElementById('favoriteHoursChart');
  const chart = new Chart(ctx, data);
  progress.add();
});

fetchRoute('/user/channels/rankedByMessages', data => {
  progress.changeState("Putting Channels to Table . . .");
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
  progress.add();
});

fetchRoute('/user/words/occurences', data => {
  progress.changeState("Analyzing Word Occurences . . .");
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
  progress.add();
});