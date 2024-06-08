import path from 'path';
import csvParser from 'csv-parser';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from "fs";

// Pliki CSV do połączenia
const csvFiles = [
  'Gatsby - SSG.csv',
  'Gatsby - SSR.csv',
  'Next.js - SSG.csv',
  'Next.js - SSR.csv',
  'Remix - SSR.csv'
];

const metrics = [
  'Speed Index',
  'Cumulative Layout Shift',
  'Largest Contentful Paint',
  'First Contentful Paint',
  'Time to Interactive',
  'Total Blocking Time'
];


const metricsUnits = [
    's',
    's',
    's',
    's',
    's',
    'ms'
  ];

  
// Kolory dla każdego pliku
const fileColors = [
  'rgba(75, 192, 192)',
  'rgba(255, 99, 132)',
  'rgba(54, 162, 235)',
  'rgba(255, 206, 86)',
  'rgba(153, 102, 255)'
];

// Funkcja do odczytywania CSV
async function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Funkcja do obliczania średnich wartości metryk
function calculateAverages(data, metric, metricUnit) {
  const sum = data.reduce((acc, row) => acc + parseFloat(row[metric]), 0);
  const avg = sum / (data.length * (metricUnit === 'ms' ? 1 : 1000));
    return Math.round(avg * 100) / 100
}

// Funkcja do generowania wykresu
async function generateChart(chartName, metric, data, metricUnit) {
  console.log('Data for metric', metric, ':', data); // Debugging

  try {
    const width = 800;
    const height = 600;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });

    const configuration = {
      type: 'bar',
      data: {
        labels: Object.keys(data).map(file => file.replace('.csv', '')),
        datasets: [{
          label: metric, // Metric as label
          data: Object.values(data), // Values for the metric
          backgroundColor: fileColors, // Assign different colors based on file index
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14 // Zwiększony rozmiar czcionki skali Y
                    },
                    color: '#000' // Czarny kolor skali X
                }
            },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) { return value +''+ metricUnit; }, 
              font: {
                  size: 14 // Zwiększony rozmiar czcionki skali Y
              },
              color: '#000' // Czarny kolor skali X
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: chartName,
            font: {
                size: 24
            },
            color: '#000' // Czarny kolor tytułu
          },
          legend: {
            display: false // Remove legend
          },
          annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y',
              value: 0,
              borderColor: 'black',
              borderWidth: 2,
              label: {
                enabled: true,
                position: 'right'
              }
            }]
          }
        }
      }
    };

    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    const fileName = `${metric.replace(/ /g, "_")}.png`;
    const filePath = path.join('charts', fileName);
    fs.writeFileSync(filePath, buffer);
    console.log(`Chart saved to: ${filePath}`);
  } catch (error) {
    console.error('Error generating chart:', error);
  }
}

(async () => {
  if (!fs.existsSync('charts')) {
    fs.mkdirSync('charts');
  }

  const allData = {};

  for (const file of csvFiles) {
    const data = await readCsv(path.join('data', file)); // assuming your CSV files are in the 'data' folder
    allData[file] = {};

    let i = 0;
    for (const metric of metrics) {
      allData[file][metric] = calculateAverages(data, metric, metricsUnits[i]);
      i+=1;
    }
  }
  let i = 0;
  for (const metric of metrics) {
    const metricData = {};

    for (const [file, values] of Object.entries(allData)) {
      metricData[file] = values[metric];
    }

    await generateChart('Średni czas dla metryki: ' + metric, metric, metricData, metricsUnits[i]); // Chart name in Polish
    i+=1;
  }

  console.log('Wykresy zostały zapisane do folderu charts');
})().catch(err => {
  console.error('Błąd:', err);
});
