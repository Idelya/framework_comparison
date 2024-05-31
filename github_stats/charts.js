import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from "fs";

const frameworkColors = {
    'Remix': 'rgba(75, 192, 192, 1)',
    'Gatsby': 'rgba(255, 99, 132, 1)',
    'Next.js': 'rgba(54, 162, 235, 1)',
};

export const generateChart = async (data, propName, title) => {
    const width = 800; // Szerokość wykresu
    const height = 600; // Wysokość wykresu
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white'  });

    const backgroundColors = data.map(item => frameworkColors[item.frameworkName] || 'rgba(201, 203, 207, 0.2)');
    const borderColors = backgroundColors.map(color => color.replace('0.2', '1'));

    const configuration = {
        type: 'bar',
        data: {
            labels: data.map(item => item.frameworkName),
            datasets: [{
                data: data.map(item => item[propName]),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 24
                    },
                    color: '#000' // Czarny kolor tytułu
                },
                legend: {
                    display: false // Usunięcie legendy
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 14 // Zwiększony rozmiar czcionki skali Y
                        },
                        color: '#000' // Czarny kolor skali Y
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14 // Zwiększony rozmiar czcionki skali Y
                        },
                        color: '#000' // Czarny kolor skali X
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    fs.writeFileSync(`images/${propName}.png`, image);
};

const generateRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.8)`;
};

export const generateMultiColumnChart = async (data, propNameArray, title, legendArray) => {
    const width = 800; // Width of the chart
    const height = 600; // Height of the chart
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });

    // Generate a random color for each propName
    const propColors = {};
    propNameArray.forEach(propName => {
        propColors[propName] = generateRandomColor();
    });

    // Create datasets for each propName
    const datasets = propNameArray.map((propName, index) => ({
        label: legendArray[index],
        data: data.map(item => item[propName]),
        backgroundColor: propColors[propName],
        borderColor: propColors[propName].replace('0.8', '1'),
        borderWidth: 1
    }));

    const configuration = {
        type: 'bar',
        data: {
            labels: data.map(item => item.frameworkName),
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 24
                    },
                    color: '#000' // Black color for title
                },
                legend: {
                    display: true // Show legend
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 14 // Increased font size for Y axis
                        },
                        color: '#000' // Black color for Y axis
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 14 // Increased font size for X axis
                        },
                        color: '#000' // Black color for X axis
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    fs.writeFileSync(`images/${propNameArray.join('_')}.png`, image);
};