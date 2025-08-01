// crypto-monitor.js
// Simple Crypto Monitoring Platform Example
// Fetches and displays live prices for selected cryptocurrencies from Binance API

const cryptoList = [
    { symbol: 'BTCUSDT', name: 'Bitcoin' },
    { symbol: 'ETHUSDT', name: 'Ethereum' },
    { symbol: 'BNBUSDT', name: 'Binance Coin' },
    { symbol: 'ADAUSDT', name: 'Cardano' },
    { symbol: 'XRPUSDT', name: 'XRP' }
];

async function fetchCryptoPrice(symbol) {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.price;
}

async function updateCryptoPrices() {
    const table = document.getElementById('crypto-table-body');
    table.innerHTML = '';
    for (const crypto of cryptoList) {
        const price = await fetchCryptoPrice(crypto.symbol);
        const row = `<tr><td>${crypto.name}</td><td>${crypto.symbol}</td><td>$${parseFloat(price).toLocaleString()}</td></tr>`;
        table.innerHTML += row;
    }
}

function startCryptoMonitor(interval = 10000) {
    updateCryptoPrices();
    setInterval(updateCryptoPrices, interval);
}

// To use: Add a table with id="crypto-table" and tbody id="crypto-table-body" in your HTML
// Then call startCryptoMonitor() after the page loads.
