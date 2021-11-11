Chart.defaults.color = "#fff";

// Create loading modal manager
const loadingModal = new LoadingModal("loading", 8);


// For rendering elements on profile section
function renderCount(data, label) {

  // Create element
  const p = document.createElement('p');

  // Add content to element
  p.innerHTML = `<strong block>${data}</strong> ${label}`;

  // Append to profile
  document.getElementById('profile').appendChild(p);
}


// Messages Encountered
fetchRoute('/user/messages/encountered', data => {
  loadingModal.text("Loading Messages Encountered . . .");
  renderCount(data, "messages encountered");
  loadingModal.add();
});


// Messages Received
fetchRoute('/user/messages/received', data => {
  loadingModal.text("Loading Messages Received . . .");
  renderCount(data, "messages received");
  loadingModal.add();
});


// Messages Sent
fetchRoute('/user/messages/sent', data => {
  loadingModal.text("Loading Messages Sent . . .");
  renderCount(data, "messages sent");
  loadingModal.add();
});


// Words Sent
fetchRoute('/user/words/sent', data => {
  loadingModal.text("Loading Words Sent . . .");
  renderCount(data, "words sent");
  loadingModal.add();
});


// Yearly chart
fetchRoute('/user/messages/sent-per-year/chart-data', data => {
  loadingModal.text("Loading Yearly Chart . . .");
  const canvas = document.createElement('canvas');
  document.getElementById('yearly-chart').appendChild(canvas);
  new Chart(canvas, data);
  loadingModal.add();
});


// Hourly chart
fetchRoute('/user/messages/sent-per-hour/chart-data', data => {
  loadingModal.text("Loading Hourly Chart . . .");
  const canvas = document.createElement('canvas');
  document.getElementById('hourly-chart').appendChild(canvas);
  new Chart(canvas, data);
  loadingModal.add();
});


// Channels by messages
fetchRoute('/user/channels/rankedByMessages', data => {

  loadingModal.text("Loading Channels Ranked . . .");

  // Create table
  const table = new Table(["#", "Channel", "Your Messages Count"]);

  // Add data
  for(let [index, channel] of data.slice(0, 10).entries()) {

    const rank = document.createElement('th');
    rank.innerHTML = `${index + 1}`;

    const name = document.createElement('td');
    name.innerHTML = channel.name.length > 25 ? channel.name.substring(0, 25) + "..." : channel.name;

    const count = document.createElement('td');
    count.innerHTML = channel.count;
    count.setAttribute("text", "center");

    table.addRow([rank, name, count]);
  }

  // Append table
  document.getElementById('channels-table').appendChild(table.element);

  loadingModal.add();
});


// Words by occurences
fetchRoute('/user/words/occurences', data => {

  loadingModal.text("Loading Words Occurences . . .");

  // Create table
  const table = new Table(["#", "Words", "Occurences"]);

  // Add data
  for(let [index, word] of data.slice(0, 10).entries()) {

    const rank = document.createElement('th');
    rank.innerHTML = `${index + 1}`;

    const name = document.createElement('td');
    name.innerHTML = word.name.length > 25 ? word.name.substring(0, 25) + "..." : word.name;

    const count = document.createElement('td');
    count.innerHTML = word.count;
    count.setAttribute("text", "center");

    table.addRow([rank, name, count]);
  }

  // Append table
  document.getElementById('words-table').appendChild(table.element);

  loadingModal.add();
});