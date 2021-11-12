Chart.defaults.color = "#fff";


async function renderCount(route, label) {

  // Fetch route
  const data = await fetchRoute(route);

  // Create element
  const p = document.createElement('p');

  // Add content to element
  p.innerHTML = `<strong block>${data}</strong> ${label}`;

  // Append to profile
  document.getElementById('profile').appendChild(p);
}


async function renderChart(route, parentId) {

  // Fetch route
  const data = await fetchRoute(route);

  // Create element
  const canvas = document.createElement('canvas');

  // Create chart
  new Chart(canvas, data);

  // Append to parent
  document.getElementById(parentId).appendChild(canvas);
}


async function renderTable(route, parentId, tableHead) {

  // Fetch route
  const data = await fetchRoute(route);
  
  // Create table
  const table = new Table(tableHead);

  // Add data
  for(let [index, element] of data.slice(0, 10).entries()) {

    const rank = document.createElement('th');
    rank.innerHTML = `${index + 1}`;

    const name = document.createElement('td');
    name.innerHTML = element.name.length > 25 ? element.name.substring(0, 25) + "..." : element.name;

    const count = document.createElement('td');
    count.innerHTML = element.count;
    count.setAttribute("text", "center");

    table.addRow([rank, name, count]);
  }

  // Append table
  document.getElementById(parentId).appendChild(table.element);
}


(async function render() {
  const loadingModal = new LoadingModal("loading", 8);

  loadingModal.text("Counting Messages Encountered . . .");
  await renderCount('/user/messages/encountered', 'messages encountered');
  loadingModal.add();

  loadingModal.text("Counting Messages Received . . .");
  await renderCount('/user/messages/received', 'messages received');
  loadingModal.add();

  loadingModal.text("Counting Messages Sent . . .");
  await renderCount('/user/messages/sent', 'messages sent');
  loadingModal.add();

  loadingModal.text("Counting Words Sent . . .");
  await renderCount('/user/words/sent', 'words sent');
  loadingModal.add();

  loadingModal.text("Loading Yearly Chart . . .");
  await renderChart('/user/messages/sent-per-year/chart-data', 'yearly-chart');
  loadingModal.add();

  loadingModal.text("Loading Hourly Chart . . .");
  await renderChart('/user/messages/sent-per-hour/chart-data', 'hourly-chart');
  loadingModal.add();

  loadingModal.text("Loading Channels Ranked . . .");
  await renderTable('/user/channels/rankedByMessages', 'channels-table', ["#", "Channel", "Your Messages Count"]);
  loadingModal.add();

  loadingModal.text("Loading Words Occurences . . .");
  await renderTable('/user/words/occurences', 'words-table', ["#", "Words", "Occurences"]);
  loadingModal.add();
})();