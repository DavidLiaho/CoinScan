let chart;
let timerID;
const dataSeries = {};

// Initialize Chart:
function initializeChart(selectedSymbols) {
    const chartData = [];

    selectedSymbols.forEach((symbol) => {
        dataSeries[symbol] = {
            type: "line",
            name: symbol.toUpperCase(),
            showInLegend: true,
            dataPoints: []
        };
        chartData.push(dataSeries[symbol]);
    });

    chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Live Price for Selected Coins"
        },
        axisY: {
            title: "Price (USD)",
            prefix: "$"
        },
        axisX: {
            title: "Time",
            valueFormatString: "HH:mm:ss",
            labelAngle: 0,
            interval: 2,
            intervalType: "second"
        },
        data: chartData
    });

    chart.render();
}

// Fetch live prices from CryptoCompare API:
async function fetchLivePrices(selectedSymbols) {
    const symbols = [...selectedSymbols].join(',');
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        alert("Error fetching data from CryptoCompare API:", err.message);
        return;
    }
}

// Update the chart with live data:
async function updateChart(selectedSymbols) {
    const livePrices = await fetchLivePrices(selectedSymbols);
    const currentTime = new Date();

    selectedSymbols.forEach(symbol => {
        const upperSymbol = symbol.toUpperCase();
        if (livePrices[upperSymbol] && dataSeries[symbol]) {
            dataSeries[symbol].dataPoints.push({
                x: currentTime,
                y: livePrices[upperSymbol].USD,
                label: currentTime.toLocaleTimeString()
            });

            // Every 10 points, push the chart forward:
            if (dataSeries[symbol].dataPoints.length > 10) {
                dataSeries[symbol].dataPoints.shift();
            }
        }
    });

    chart.render();
}

export function startLiveUpdates(selectedSymbols) {
    if (selectedSymbols.size === 0) {
        $("#chartContainer").html("<h3>You haven't selected any coins!</h3>");
        return;
    }
    clearInterval(timerID);
    initializeChart(selectedSymbols);
    timerID = setInterval(() => updateChart(selectedSymbols), 2000);
}
