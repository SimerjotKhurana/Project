let count = 0;

const data = {
    labels: [],
    datasets: []
  };

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of employees (Units per thousand)'
      }
    }
  }
};

const S = {
"0000": "Total nonfarm","0500": "Total private","0600": "Goods-producing",
"0700": "Service-providing","0800": "Private service-providing","1000": "Mining and logging",
"2000": "Construction","3000": "Manufacturing","3100": "Durable Goods",
"3200": "Nondurable Goods","4000": "Trade, transportation, and utilities","4142": "Wholesale trade",
"4200": "Retail trade","4300": "Transportation and warehousing","4422": "Utilities",
"5000": "Information","5500": "Financial activities","6000": "Professional and business services",
"6500": "Education and health services","7000": "Leisure and hospitality","8000": "Other services",
"9000": "Government"
};
let SKeys = Object.keys(S);


const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  darkblue: 'rgb(0, 0, 204)',
  pink: 'rgb(255, 102, 178)',
  lightpink: 'rgb(0,135,147,)',
  lightblue: 'rgb(255,12,32)',
  lightgrey: 'rgb(12,143,221)',
  lightgreen: 'rgb(182, 240, 187)',
  hotpink: 'rgb(255, 0, 127)',
  neonblue: 'rgb(0, 255, 255)',
  lightyellow: 'rgb(255, 205, 86)',
  lightorange:'rgba(255, 159, 64)',
  darkpurple:'rgb(153, 102, 255)',
  maroon: 'rgb(102, 0, 51)',
  bluegreen: 'rgb(0, 255, 191)',
  yellogreen:'rgb(191, 255, 0)',
  brown: 'rgb(102, 51, 0)',


};
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
 
const CHART_COLORS_50_Percent = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)',
  darkblue: 'rgba(0, 0, 204,0.5)',
  lightpink: 'rgba(255, 102, 178,0.5)',
  white: 'rgba(0,135,147,0.5)',
  lightblue: 'rgba(255,12,32,0.5)',
  lightgrey: 'rgba(12,143,221,0.5)',
  lightgreen: 'rgba(182, 240, 187,0.5)',
  hotpink: 'rgba(255, 0, 127,0.5)',
  neonblue:'rgba(0, 255, 255,0.5)',
  lightyellow: 'rgba(255, 205, 86,0.5)',
  lightorange:'rgba(255, 159, 64, 0.5)',
  darkpurple:'rgba(153, 102, 255,0.5)',
  maroon: 'rgba(102, 0, 51,0.5)',
  bluegreen:'rgba(0, 255, 191,0.5)',
  yellogreen:'rgba(191, 255, 0,0.5)',
  brown: 'rgba(102, 51, 0, 0.5)'


};
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let flag = false;
function responseHandler() {
  if (this.status == 200) {
    let dataArray = this.response.Results.series[0].data;
let seriesID = this.response.Results.series[0].seriesID;
  let sectorline = {
    label: "",
    data:[],
    borderColor: "",
    backgroundColor: "",
    hidden:true
  }
sectorline.label = (S[seriesID.substring(3,7)]);
sectorline.borderColor = (CHART_COLORS_KEYS[count]);
sectorline.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);
if(flag == false){
  for (let i = dataArray.length -1; i >= 0; i--) {
    data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
    flag = true;
  }
}
for(let i = dataArray.length -1; i >= 0; i--) {
  sectorline.data.push(dataArray[i].value);

}

  data.datasets.push(sectorline);
  count++

  console.log(this.response);
    }
  else{
  console.log ("error");
  }
}

const myChart = new Chart(document.getElementById('myChart'),config);


for (i = 0; i < SKeys.length; i++){
    let call = new XMLHttpRequest()
      call.addEventListener("load", responseHandler);
    let a = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
    let b = "";
      if(y == ""){
        alert("Registration Key is negative, please go to script.js and assign a string value to variable 'y'")

      }
      call.open("GET", a + SKeys[i] + b);
      call.responseType = "json";
      call.send();
}
