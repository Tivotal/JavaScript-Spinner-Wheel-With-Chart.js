/* Created by Tivotal */

let wheel = document.querySelector(".wheel");

let myChart = new Chart(wheel, {
  //chart type
  type: "pie",
  data: {
    //setting for dataset
    datasets: [
      {
        data: [16, 16, 16, 16, 16, 16],
        backgroundColor: [
          "#4070f4",
          "#0b8c4c",
          "#4070f4",
          "#0b8c4c",
          "#4070f4",
          "#0b8c4c",
        ],
      },
    ],

    //labels to display on chart
    labels: [1, 2, 3, 4, 5, 6],
  },

  //plugin to display text over chart
  plugins: [ChartDataLabels],

  options: {
    plugins: {
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 30 },
      },

      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
    },

    //rotation animation
    animation: { duration: 0 },
  },
});

let btn = document.querySelector(".btn");
let valueTxt = document.querySelector(".value");

let count = 0;
let resVal = 101;

btn.addEventListener("click", () => {
  btn.disabled = true;

  valueTxt.innerHTML = `<p>Good Luck!</p>`;

  let ranDegree = Math.floor(Math.random() * 356);

  let interval = setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resVal;

    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;
      resVal -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == ranDegree) {
      valueGenerator(ranDegree);
      clearInterval(interval);
      count = 0;
      resVal = 101;
    }
  }, 10);
});

let rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];

let valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      valueTxt.innerHTML = `<p>Value: ${i.value}</p>`;
      btn.disabled = false;
      break;
    }
  }
};
