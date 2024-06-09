import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

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
    onlyCategories: ['performance'],
    throttling: {
        // These values partially align with WebPageTest's definition of "Regular 3G".
        // These values are meant to roughly align with Chrome UX report's 3G definition which are based
        // on HTTP RTT of 300-1400ms and downlink throughput of <700kbps.
        rttMs: 300,
        throughputKbps: 700,
        requestLatencyMs: 300 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
        downloadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        uploadThroughputKbps: 700 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        cpuSlowdownMultiplier: 4,
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
