import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

const port = process.argv[2]; // Pobiera port z argumentów linii poleceń
const pageName = process.argv[3]; // Pobiera nazwę strony z argumentów linii poleceń
const iterations = process.argv[4] || 1; // Pobiera liczbę iteracji z argumentów linii poleceń, domyślnie 1
const outputFileName = process.argv[5] || 'performance_metrics.csv'; // Pobiera nazwę pliku z argumentów linii poleceń, domyślnie 'performance_metrics.csv'

const url = `http://localhost:${port}/${pageName}`;
console.log('Run lighthouse', url);

async function runLighthouse(url, chrome) {
  const { default: lighthouse } = await import('lighthouse');
  const options = {
    port: chrome.port,
    output: 'json',
    disableStorageReset: true, // Wyłącza cache
    onlyCategories: ['performance'],
    throttling: {
      rttMs: 250, // Opóźnienie (RTT) w milisekundach
      throughputKbps: 400, // Prędkość pobierania w kilobitach na sekundę
      requestLatencyMs: 250, // Opóźnienie żądania w milisekundach
      uploadThroughputKbps: 400, // Prędkość przesyłania w kilobitach na sekundę
      cpuSlowdownMultiplier: 1, // Wielokrotność spowolnienia CPU
    },
  };

  const runnerResult = await lighthouse(url, options);

  // Zbiera czasy wydajnościowe
  return {
    SpeedIndex: runnerResult.lhr.audits['speed-index'].numericValue,
    CumulativeLayoutShift: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
    LargestContentfulPaint: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
    FirstContentfulPaint: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
    TimeToInteractive: runnerResult.lhr.audits['interactive'].numericValue,
    TotalBlockingTime: runnerResult.lhr.audits['total-blocking-time'].numericValue,
    // Dodaj inne metryki, których potrzebujesz
  };
}

(async () => {
  const allMetrics = [];

  for (let i = 0; i < iterations; i++) {
    console.log('iteration', i);
    const { launch } = await import('chrome-launcher');
    const chrome = await launch({ 
      chromeFlags: ['--disable-back-forward-cache','--disable-cache', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-extensions', '--disable-background-networking', '--disable-default-apps', '--disable-sync', '--disable-translate', '--disable-web-resources'] 
    });

    const metrics = await runLighthouse(url, chrome);
    allMetrics.push(metrics);

    await chrome.kill();
  }

  // Zapisuje dane do CSV
  const csvWriter = createObjectCsvWriter({
    path: outputFileName,
    header: [
      { id: 'iteration', title: 'Iteration' },
      { id: 'SpeedIndex', title: 'Speed Index' },
      { id: 'CumulativeLayoutShift', title: 'Cumulative Layout Shift' },
      { id: 'LargestContentfulPaint', title: 'Largest Contentful Paint' },
      { id: 'FirstContentfulPaint', title: 'First Contentful Paint' },
      { id: 'TimeToInteractive', title: 'Time to Interactive' },
      { id: 'TotalBlockingTime', title: 'Total Blocking Time' },
      // Dodaj inne metryki, których potrzebujesz
    ]
  });

  const records = allMetrics.map((metrics, index) => ({
    iteration: index + 1,
    ...metrics
  }));

  await csvWriter.writeRecords(records);
  console.log(`Dane zostały zapisane do pliku ${outputFileName}`);
})().catch(err => {
  console.error('Błąd podczas uruchamiania Lighthouse:', err);
});
