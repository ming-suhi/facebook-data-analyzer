fetchRoute('/user/messages/sent-per-hour/chart-data', data => {
  const ctx = document.getElementById('favoriteHoursChart');
  const chart = new Chart(ctx, data);
});

fetchRoute('/user/messages/sent-per-year/chart-data', data => {
  const ctx = document.getElementById('yearsRankedChart');
  const chart = new Chart(ctx, data);
});