const generateFavoriteHoursChart = (data) => {
  const ctx = document.getElementById("favoriteHoursChart");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
        "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
      ],
      datasets: [{
        label: "Your Favorite Hours",
        data: data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

fetch("user")
.then(response => response.json())
.then(data => generateFavoriteHoursChart(data.map(object => object.count)));

