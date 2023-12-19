
const arbitrageTab = document.getElementById('arbitrageTab');
const liveStocksTab = document.getElementById('liveStocksTab');
const savedStocksTab = document.getElementById('savedStocksTab');
const opportunitiesTab= document.getElementById('opportunitiesTab');
const homepageTab = document.getElementById('homepageTab');
function printData() {
window.print(this.getAttribute('table-container'));
}

function setActiveTab(tab) {
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tabElement => {
    if (tabElement === tab) {
        tabElement.classList.add('active-tab');
    } else {
        tabElement.classList.remove('active-tab');
    }
});
}

function showHomePage(){
    const arbitrageContent = document.getElementById('arbitrage-content');
    const liveStocksContent = document.getElementById('livestocks-content');
    const savedStocksContent = document.getElementById('savedstocks-content');
    const opportunitiesTableContent = document.getElementById('opportunities-content');
    /*RASHMI*/  const searchContainer = document.querySelector('.search-container');
    const homepageTableContent = document.getElementById('homepage-content');
    const showTop5Button = document.getElementById('showTop5Button'); // Get reference to Show Top 5 button
    const showTop10Button = document.getElementById('showTop10Button');
    homepageTableContent.style.display='block';
    /*RASHMI*/  searchContainer.style.display = 'none';
    arbitrageContent.style.display = 'none';
    liveStocksContent.style.display = 'none';
    savedStocksContent.style.display = 'none';
    opportunitiesTableContent.style.display = 'none'; // Show the opportunities table
    showTop5Button.style.display = 'none';
    showTop10Button.style.display = 'none';

    // Add active class to the clicked tab and remove it from other tabs

    opportunitiesTab.classList.remove('active-tab');
    arbitrageTab.classList.remove('active-tab');
    liveStocksTab.classList.remove('active-tab');
    savedStocksTab.classList.remove('active-tab');
    homepageTab.classList.add('active-tab');
}

function showArbitrageTable() {
    const arbitrageContent = document.getElementById('arbitrage-content');
    const liveStocksContent = document.getElementById('livestocks-content');
    const savedStocksContent = document.getElementById('savedstocks-content');
    const opportunitiesTableContent = document.getElementById('opportunities-content');
    /*RASHMI*/  const searchContainer = document.querySelector('.search-container');
    const homepageTableContent = document.getElementById('homepage-content');
    homepageTableContent.style.display='none';
    /*RASHMI*/  searchContainer.style.display = 'none';
    arbitrageContent.style.display = 'block';
    liveStocksContent.style.display = 'none';
    savedStocksContent.style.display = 'none';
    opportunitiesTableContent.style.display = 'none'; // Show the opportunities table

    // Add active class to the clicked tab and remove it from other tabs

    opportunitiesTab.classList.remove('active-tab');
    arbitrageTab.classList.add('active-tab');
    liveStocksTab.classList.remove('active-tab');
    savedStocksTab.classList.remove('active-tab');
    homepageTab.classList.remove('active-tab');
    updateArbitrageTable();
    showTop10Stocks();
}

// New function to handle showing the "Live Stocks" table
function showLiveStocksTable() {
    const liveStocksContent = document.getElementById('livestocks-content');
    const savedStocksContent = document.getElementById('savedstocks-content');
    const arbitrageContent = document.getElementById('arbitrage-content');
    const opportunitiesTableContent = document.getElementById('opportunities-content');
    const homepageTableContent = document.getElementById('homepage-content');
    homepageTableContent.style.display='none';
    liveStocksContent.style.display = 'block'; // Show the liveStocks table
    savedStocksContent.style.display = 'none'; // Hide the savedStocks table
    arbitrageContent.style.display = 'none'; // Hide the arbitrage table
    opportunitiesTableContent.style.display = 'none'; // Show the opportunities table

    opportunitiesTab.classList.remove('active-tab');
    arbitrageTab.classList.remove('active-tab');
    liveStocksTab.classList.add('active-tab');
    savedStocksTab.classList.remove('active-tab');
    homepageTab.classList.remove('active-tab');

    updateLiveStockTable(); // Update the "Live Stocks" table with data


}

// New function to handle showing the "Saved Stocks" table
function showSavedStocksTable() {
    const liveStocksContent = document.getElementById('livestocks-content');
    const savedStocksContent = document.getElementById('savedstocks-content');
    const arbitrageContent = document.getElementById('arbitrage-content');
    const opportunitiesTableContent = document.getElementById('opportunities-content');
    /*RASHMI*/  const searchContainer = document.querySelector('.search-container');
    const homepageTableContent = document.getElementById('homepage-content');
    homepageTableContent.style.display='none';
    /*RASHMI*/  searchContainer.style.display = 'none';
    liveStocksContent.style.display = 'none'; // Hide the liveStocks table
    savedStocksContent.style.display = 'block'; // Show the savedStocks table
    arbitrageContent.style.display = 'none'; // Hide the arbitrage table
    opportunitiesTableContent.style.display = 'none'; // Show the opportunities table

    opportunitiesTab.classList.add('active-tab');
    arbitrageTab.classList.remove('active-tab');
    liveStocksTab.classList.remove('active-tab');
    savedStocksTab.classList.remove('active-tab');
    homepageTab.classList.remove('active-tab');

    updateSavedStocksTable();
}

function showopportunitiesTable() {
    const liveStocksContent = document.getElementById('livestocks-content');
    const savedStocksContent = document.getElementById('savedstocks-content');
    const arbitrageContent = document.getElementById('arbitrage-content');
    const opportunitiesTableContent = document.getElementById('opportunities-content');
    /*RASHMI*/  const searchContainer = document.querySelector('.search-container');
    /*RASHMI*/  searchContainer.style.display = 'none';
    const homepageTableContent = document.getElementById('homepage-content');
    homepageTableContent.style.display='none';
    liveStocksContent.style.display = 'none'; // Hide the liveStocks table
    savedStocksContent.style.display = 'none'; // Show the savedStocks table
    arbitrageContent.style.display = 'none'; // Hide the arbitrage table
    opportunitiesTableContent.style.display = 'block'; // Show the opportunities table

    opportunitiesTab.classList.add('active-tab');
    arbitrageTab.classList.remove('active-tab');
    liveStocksTab.classList.remove('active-tab');
    savedStocksTab.classList.remove('active-tab');
    homepageTab.classList.remove('active-tab');

    updateOpportunitiesTable();

}


async function updateSavedStocksTable(){
        let name;
        getLoggedInUser().then((loggedInName) => {
            name = loggedInName;
            console.log('Stored name:', name);
            }).catch((error) => {
                console.error('Error in getLoggedInUser:', error);
            });
        try {
                const response = await fetch('/saveddata'); // Fetch data from the server
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json(); // Parse the JSON response
                const tableContainer = document.getElementById('savedstocks-content');

                let tableHTML = '<div class="table-container"><table>' +
                                '<thead><tr><th>Saved Date<th>Symbol</th><th>NSE Price</th><th>BSE Price</th><th>Difference (Rs)</th><th>Buy At</th><th>Quantity</th><th>Buy</th><th>Unsave</th></tr></thead>' +
                                '<tbody>';

                // Loop through the data and add rows to the table
                for (const item of data) {
                    if(name === item.user) {
                    tableHTML += `
                        <tr>
                            <td>${item.savedate.split("T")[0]}</td>
                            <td>${item.symbol}</td>
                            <td>${item.nseprice}</td>
                            <td>${item.bseprice}</td>  
                            <td>${item.difference}</td>
                            <td>${item.buyat}</td>
                            <td><input type="number" id="quantity_${item.symbol}" min="1" max="1000" value="${item.buy ? item.quantity : "1"}"></td>
                            <td><button type="button" class="button-5" onclick="disableUnsaveButton('${item.symbol}');this.disabled=true;buyStock('${item.symbol}','${item.nseprice}')" ${item.buy ? "disabled" : ""}>Buy</button></td>
                            <td><button id = "unsaveButton_${item.symbol}" type="button" class="button-4" onclick="unsaveStock('${item.symbol}')" ${item.buy ? "disabled" : ""}>Unsave</button></td>
                            <!-- Add more table cells for other fields -->
                        </tr>
                    `;
                }else{
                    
                }
            }

            tableHTML += '</tbody></table></div>';
            tableContainer.innerHTML = tableHTML;
        } catch (error) {
        console.error('Error updating savedstocks table:', error);
        }

}
function disableUnsaveButton(symbol) {
    var unsaveButton = document.getElementById('unsaveButton_'+symbol);
    if (unsaveButton) {
        unsaveButton.disabled = true;
    }
}

function getLoggedInUser() {
    return new Promise((resolve, reject) => {
        fetch('/getLoggedInUser', {
            method: 'GET',
            credentials: 'include', // This ensures the browser sends the session cookie
        })
        .then((response) => response.json())
        .then((data) => {
        if (data.name) {
            // Display the logged-in user information or perform other actions
            console.log('Logged in user:', data.name);
            resolve(data.name); // Resolve the Promise with the name value
        } else {
        // Handle the case when the user is not logged in
            console.log('User not logged in.');
            resolve(null); // Resolve the Promise with null when the user is not logged in
        }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
            reject(error); // Reject the Promise if an error occurs during the fetch
        });
    });
}


// async function updateLiveStockTable() {
//     /*RASHMI*/ const searchTerm = searchInput.value.trim(); // Get the search term and trim any leading/trailing spaces

//  try {
//      let tableHTML = '<div class="table-container"><table>' +
//                  '<thead><tr><th>Stock</th><th>Open</th><th>Current Price</th><th>Previous High</th><th>Previous low</th><th>LastUpdatedTime</th></tr></thead>' +
//                      '<tbody>' ;
//      const stockData = await fetchLiveStockData();
//      const tableContainer = document.getElementById('livestocks-content');
         
                
//  /*RASHMI*/  const filteredStockData = stockData.filter(stock => {
//              const symbol = stock.symbol.toLowerCase();
//              return symbol.includes(searchTerm.toLowerCase());
//          });
//      for (const stock of filteredStockData) {
//      tableHTML += `<tr>
//                      <td>${stock.symbol}</td>
//                      <td>${parseFloat(stock.open).toFixed(2)}</td>
//                      <td style="color: ${parseFloat(stock.pChange) >= 0 ? 'green' : 'red'}">${parseFloat(stock.lastPrice).toFixed(2)}</td>
//                      <td>${parseFloat(stock.dayHigh).toFixed(2)}</td>
//                      <td>${parseFloat(stock.dayLow).toFixed(2)}</td>
//                      <td>${stock.lastUpdateTime}</td>
//                      </tr>`;
//      }
//      tableHTML +='</tbody></table>';
//      tableContainer.innerHTML = tableHTML;
//          /*RASHMI*/ searchInput.value = '';

//  } catch (error) {
//      console.error('Error updating table:', error);
//  }
// }

// <!--edited by preksha ********************************************************-->
// let stockChart;

// async function updateLiveStockTable() {
//         /*RASHMI*/ const searchTerm = searchInput.value.trim(); // Get the search term and trim any leading/trailing spaces

// try {
// const stockData = await fetchLiveStockData();
// const tableBody = document.querySelector('#stockTable tbody');
// tableBody.innerHTML = ''; // Clear the existing content
//     /*RASHMI*/  const filteredStockData = stockData.filter(stock => {
//         const symbol = stock.symbol.toLowerCase();
//         return symbol.includes(searchTerm.toLowerCase());
//     });
// // Add rows to the table
// for (const stock of filteredStockData) {
// const row = document.createElement('tr');
// row.innerHTML = `
//     <td>${stock.symbol}</td>
//     <td>${parseFloat(stock.open).toFixed(2)}</td>
//     <td style="color: ${parseFloat(stock.pChange) >= 0 ? 'green' : 'red'}">${parseFloat(stock.lastPrice).toFixed(2)}</td>
//     <td>${parseFloat(stock.dayHigh).toFixed(2)}</td>
//     <td>${parseFloat(stock.dayLow).toFixed(2)}</td>
//     <td>${stock.lastUpdateTime}</td>
// `;
// tableBody.appendChild(row);
//     /*RASHMI*/ searchInput.value = '';
//  }

// // Update or create the line chart
// if (stockChart) {
//     console.log("inside chart");
// stockChart.data.labels = stockData.map(stock => stock.lastUpdateTime);
// stockChart.data.datasets[0].data = stockData.map(stock => parseFloat(stock.lastPrice).toFixed(2));
// stockChart.update();
// } else {
// const ctx = document.getElementById('stockChart').getContext('2d');
// console.log(ctx);
// stockChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: stockData.map(stock => stock.lastUpdateTime),
//         datasets: [{
//             label: 'Stock Price',
//             data: stockData.map(stock => parseFloat(stock.lastPrice).toFixed(2)),
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//             fill: true,
//         }],
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: 'Time',
//                 },
//             },
//             y: {
//                 display: true,
//                 title: {
//                     display: true,
//                     text: 'Price',
//                 },
//             },
//         },
//     },
// });
// }
// console.log(stockChart);
// } catch (error) {
// console.error('Error updating table:', error);
// }
// }

//<!--edited by preksha ********************************************************-->

let stockChart;

async function updateLiveStockTable() {
        /*RASHMI*/ const searchTerm = searchInput.value.trim(); // Get the search term and trim any leading/trailing spaces

try {
const stockData = await fetchLiveStockData();
const tableBody = document.querySelector('#stockTable tbody');
tableBody.innerHTML = ''; // Clear the existing content
    /*RASHMI*/  const filteredStockData = stockData.filter(stock => {
        const symbol = stock.symbol.toLowerCase();
        return symbol.includes(searchTerm.toLowerCase());
    });
// Add rows to the table
for (const stock of filteredStockData) {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${stock.symbol}</td>
    <td>${parseFloat(stock.open).toFixed(2)}</td>
    <td style="color: ${parseFloat(stock.pChange) >= 0 ? 'green' : 'red'}">${parseFloat(stock.lastPrice).toFixed(2)}</td>
    <td>${parseFloat(stock.dayHigh).toFixed(2)}</td>
    <td>${parseFloat(stock.dayLow).toFixed(2)}</td>
    <td>${stock.lastUpdateTime}</td>
`;
tableBody.appendChild(row);
    /*RASHMI*/ searchInput.value = '';
 }
 const thSortable = document.querySelectorAll('#stockTable th[data-sortable]');
 console.log("hgjgjh",thSortable);
 let sortOrder = 'descending';
 thSortable.forEach(th => {
    th.addEventListener('click', () => {
        console.log("iside ckick");
        const index = th.cellIndex;
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            const valueA = parseFloat(rowA.cells[index].textContent);
            const valueB = parseFloat(rowB.cells[index].textContent);

            return sortOrder === 'ascending' ? valueA - valueB : valueB - valueA;
        });

        tableBody.innerHTML = '';
        rows.forEach(row => {
            tableBody.appendChild(row);
        });

        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';

        thSortable.forEach(otherTh => {
            otherTh.removeAttribute('aria-sort');
        });
        th.setAttribute('aria-sort', sortOrder);
    });
});

// Update or create the line chart
if (stockChart) {
stockChart.data.labels = stockData.map(stock => stock.symbol);
stockChart.data.datasets[0].data = stockData.map(stock => parseFloat(stock.lastPrice).toFixed(2));
stockChart.update();
} else {
const ctx = document.getElementById('stockChart').getContext('2d');
stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: stockData.map(stock => stock.lastUpdateTime),
        datasets: [{
            label:'Stock Prices',
            data: stockData.map(stock => parseFloat(stock.lastPrice).toFixed(2)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Stock Symbol',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Price',
                },
            },
        },
    },
});
}
console.log(stockChart);
} catch (error) {
console.error('Error updating table:', error);
}
}



function updateStockChart(data) {
const ctx = document.getElementById('stockChart').getContext('2d');
const labels = data.map(item => item.symbol);
const nsePrices = data.map(item => item.nsePrice);
const bsePrices = data.map(item => item.bsePrice);

if (stockChart) {
stockChart.data.labels = labels;
stockChart.data.datasets[0].data = nsePrices;
stockChart.data.datasets[1].data = bsePrices;
stockChart.update();
} else {
stockChart = new Chart(ctx, {
type: 'line',
data: {
    labels: labels,
    datasets: [
        {
            label: 'NSE Price',
            data: nsePrices,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
        },
        {
            label: 'BSE Price',
            data: bsePrices,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: true,
        }
    ],
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Symbol',
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Price',
            },
        },
    },
},
});
}
}


function unsaveStock(symbol) {

    const data = {symbol};
    fetch('/unsaveStock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => {
    if (response.ok) {
        console.log(`Stock with symbol '${symbol}' has been unsaved.`);
    } else if (response.status === 404) {
        console.log(`Stock with symbol '${symbol}' not found in the saved stocks.`);
    } else {
        console.error(`Failed to mark stock with symbol '${symbol}' as unsaved.`);
    }
    })
    updateSavedStocksTable();
}
      // @@@@@@@@@@@@@@@@@@@@@@@@@ ANUSHKA
function showTop10Stocks() {
        try {
            const tableContainer = document.getElementById('arbitrage-content').querySelector('table');
            const rows = Array.from(tableContainer.querySelectorAll('tbody tr'));
            rows.sort((row1, row2) => {
                const difference1 = parseFloat(row1.cells[3].textContent);
                const difference2 = parseFloat(row2.cells[3].textContent);
                return difference2 - difference1; // Sort in descending order based on difference
            });

            // Reset the display property of all rows
            rows.forEach(row => {
                row.style.display = 'table-row';
            });

            // Show only the top 10 rows
            rows.slice(0, 10).forEach(row => {
                tableContainer.querySelector('tbody').appendChild(row);
            });

            // Hide other rows
            rows.slice(10).forEach(row => {
                row.style.display = 'none';
            });
        } catch (error) {
            console.error('Error showing top 10 stocks:', error);
        }
    }


function showTop5Stocks() {
        try {
            const tableContainer = document.getElementById('arbitrage-content').querySelector('table');
            const rows = Array.from(tableContainer.querySelectorAll('tbody tr'));
            rows.sort((row1, row2) => {
                const difference1 = parseFloat(row1.cells[3].textContent);
                const difference2 = parseFloat(row2.cells[3].textContent);
                return difference2 - difference1; // Sort in descending order based on difference
            });

            // Show only the top 10 rows
            rows.slice(0, 5).forEach(row => {
                tableContainer.querySelector('tbody').appendChild(row);
            });

            // Hide other rows
            rows.slice(5).forEach(row => {
                row.style.display = 'none';
            });
        } catch (error) {
            console.error('Error showing top 5 stocks:', error);
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@ ANUSHKA



function sellStock(symbol) {

    const data = {symbol};
    fetch('/sellStock', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
    },
     body: JSON.stringify(data),
    })
    .then((response) => {
    if (response.ok) {
        console.log(`Stock with symbol '${symbol}' has been sold.`);
    } else if (response.status === 404) {
        console.log(`Stock with symbol '${symbol}' not found in the saved stocks.`);
    } else {
        console.error(`Failed to mark stock with symbol '${symbol}' as sold.`);
    }
    })
    updateOpportunitiesTable();
}


// function buyStock(symbol) {
//     const quantityInput = document.getElementById(`quantity_${symbol}`);
//     const quantity = parseInt(quantityInput.value, 10);

//     if (isNaN(quantity) || quantity <= 0) {
//     console.error('Invalid quantity value. Please enter a valid number greater than 0.');
//     return;
//     }

//     const data = {
//     symbol,
//     quantity,
//     };

//     fetch('/updateBuyStatus', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//     })
//     .then((response) => {
//     if (response.ok) {
//     console.log(`Stock with symbol '${symbol}' has been marked as bought.`);
//     } else if (response.status === 404) {
//     console.log(`Stock with symbol '${symbol}' not found in the saved stocks.`);
//     } else {
//     console.error(`Failed to mark stock with symbol '${symbol}' as bought.`);
//     }
//     })
//     .catch((error) => {
//     console.error('Error marking stock as bought:', error);
//     });
// }


async function updateOpportunitiesTable(){
    let name;
    getLoggedInUser().then((loggedInName) => {
        name = loggedInName;
        console.log('Stored name:', name);
    }).catch((error) => {
        console.error('Error in getLoggedInUser:', error);
    });
    try {
        const response = await fetch('/saveddata'); // Fetch data from the server
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json(); // Parse the JSON response
        const tableContainer = document.getElementById('opportunities-content');

        let tableHTML = '<div class="table-container"><table>' +
                        '<thead><tr><th>Symbol</th><th>Your Buy Price</th><th>Last Price</th><th>Diff (Rs)</th><th>Quantity</th><th>Approx Profit(quan x diff)</th><th>Last UpdatedTime</th><th>Sell Stock</th></tr></thead>' +
                        '<tbody>';

        // Loop through the data and add rows to the table
        currentDate= new Date();
        currentDate.setHours(0, 0, 0, 0);
        const stockData = await fetchLiveStockData();
        let buyprice="0";
        let currentprice="0";
        for (const item of data) {
            if(name==item.user){
            const stock = stockData.find(stock => stock.symbol === item.symbol);
            const buyDate = new Date(item.buyDate);
            if(item.buyat==="NSE"){
                buyprice=item.nseprice;
            }
            else{
                buyprice=item.bseprice;
            }
            buyDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
            const timeDifferenceInDays = Math.floor((currentDate - buyDate) / (1000 * 60 * 60 * 24));
            console.log("time",timeDifferenceInDays, currentDate, buyDate);
        // Check if the difference is greater than or equal to 1 and the buy status is true
            if (timeDifferenceInDays >= 1 && item.buy) {
                const stock = stockData.find(stock => stock.symbol === item.symbol);
                console.log(stock);
                tableHTML += `
                    <tr>
                        <td>${item.symbol}</td>
                        <td>${buyprice}</td>  
                        <td>${stock.lastPrice}</td>
                        <td>${(parseFloat(stock.lastPrice) - buyprice).toFixed(2)}</td>
                        <td>${(parseFloat(item.quantity))}</td>
                        <td style="background-color: ${parseFloat(stock.lastPrice - buyprice) >= 0 ? 'lightgreen' : 'lightcoral'};">
                        ${((parseFloat(stock.lastPrice) - buyprice) * item.quantity).toFixed(2)} </td>
                        <td>${stock.lastUpdateTime}</td>
                        <td><button type="button" class="button-4" onclick="sellStock('${item.symbol}')">Sell</button></td>

                        <!-- Add more table cells for other fields -->
                    </tr>
                `;
            }
        }}
        tableHTML += '</tbody></table></div>';
        tableContainer.innerHTML = tableHTML;
    } catch (error) {
    console.error('Error updating savedstocks table:', error);
    }
}


async function fetchLiveStockData(){
    const url = 'https://latest-stock-price.p.rapidapi.com/price?Indices=NIFTY%2050';
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '46d24645f7msh236dc5218286abep119881jsn00d9450b5bca',
        'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
        }
};

try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    const stockDataArray = result.map(entry => ({
        symbol: entry.symbol,
        open: parseFloat(entry.open),
        dayHigh: parseFloat(entry.dayHigh),
        dayLow: parseFloat(entry.dayLow),
        lastPrice: parseFloat(entry.lastPrice),
        pChange: parseFloat(entry.pChange),
        lastUpdateTime: entry.lastUpdateTime
    }));

    // Extract the stock data array from the response object
    console.log("array"+stockDataArray);
    return stockDataArray;
} catch (error) {
    console.error(error);
    return [];
}

}


function buyStock(symbol,nseprice) {
        const quantityInput = document.getElementById(`quantity_${symbol}`);
        const quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity <= 0) {
            console.error('Invalid quantity value. Please enter a valid number greater than 0.');
            return;
        }

        const data = {
        symbol,
        quantity,
        nseprice
};


    fetch('/updateBuyStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
            console.log(`Stock with symbol '${symbol}' has been marked as bought.`);
        } else if (response.status === 404) {
            console.log(`Stock with symbol '${symbol}' not found in the saved stocks.`);
        } else {
            console.error(`Failed to mark stock with symbol '${symbol}' as bought.`);
        }
    })
    .catch((error) => {
        console.error('Error marking stock as bought:', error);
    });
}



async function updateArbitrageTable() {

try {
const response = await fetch('/arbitragedata'); // Fetch data from the server
if (!response.ok) {
    throw new Error('Failed to fetch data');
}
const data = await response.json(); // Parse the JSON response
const tableContainer = document.getElementById('arbitrage-content');

/*RASHMI*/ data.sort((a, b) => b.difference - a.difference);

let tableHTML = '<div class="table-container"><table>' +
                '<thead><tr><th>Symbol</th><th>NSE Price</th><th>BSE Price</th><th>Difference</th><th>Buy At</th><th>Save</th></tr></thead>' +
                '<tbody>';

// Loop through the data and add rows to the table
for (const item of data) {
    console.log(item.nsePrice, item.bsEPrice);
    tableHTML += `
        <tr>
            <td>${item.symbol}</td>
            <td>${item.nseprice}</td>
            <td>${item.bseprice}</td>  
            <td>${item.difference}</td>
            <td>${item.buyat}</td>
            <td><button type="button" class="button-5" onclick="saveEntry('${item.symbol}', '${item.nseprice}', '${item.bseprice}', '${item.difference}', '${item.buyat}', event)">Save</button></td>
            <!-- Add more table cells for other fields -->
        </tr>
    `;
}

tableHTML += '</tbody></table></div>';
tableContainer.innerHTML = tableHTML;
} catch (error) {
console.error('Error updating arbitrage table:', error);
}
}

async function saveEntry(symbol, nseprice, bseprice, difference, buyat, event) {
        const data = {
            symbol,
            nseprice,
            bseprice,
            difference,
            buyat
        };

        try {
            const response = await fetch('/saveEntry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Entry saved successfully.');
        } else {
            console.error('Failed to save entry.');
        }
        } catch (error) {
            console.error('Error saving entry:', error);
        }
        const button = event.target;

        // Check if the button is already green and frozen
        if (button.classList.contains('button-5:disabled')) {
        return; // Do nothing if already frozen
        }

        // Set the button to green and frozen state
        button.classList.add('button-5:disabled');

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the remaining time until 11:59 PM of the same day
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 0, 0);
        const remainingTime = endOfDay - currentDate;
        button.disabled = true;
        // Set a timeout to unfreeze the button after the remaining time elapses
        setTimeout(() => {
            button.disabled = false;
            button.classList.remove('button-5:disable'); // Remove green-button class to unfreeze the button
        }, remainingTime);
}


fetch('/getLoggedInUser', {
method: 'GET',
credentials: 'include', // This ensures the browser sends the session cookie
})
.then((response) => response.json())
.then((data) => {
if (data.name) {
// Display the logged-in user information or perform other actions
console.log('Logged in user:', data.name);
} else {
// Handle the case when the user is not logged in
console.log('User not logged in.');
}
})
.catch((error) => console.error('Error fetching user data:', error));

/*RASHMI*/  const searchInput = document.getElementById('searchInput');
/*RASHMI*/  const searchButton = document.getElementById('searchButton');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded');
    const liveStocksTab = document.getElementById('liveStocksTab');
    const arbitrageTab = document.getElementById('arbitrageTab');
    const savedStocksTab = document.getElementById('savedStocksTab'); // Get reference to Saved Stocks tab
    const opportunitiesTab=document.getElementById('opportunitiesTab');
    const homepageTab = document.getElementById('homepageTab');
    /*RASHMI*/  const searchContainer = document.querySelector('.search-container');
    // @@@@@@@@@@@@@@@@@@@@@@@@@ ANUSHKA
    const showTop5Button = document.getElementById('showTop5Button'); // Get reference to Show Top 5 button
    const showTop10Button = document.getElementById('showTop10Button'); // Get reference to Show Top 10 button
    // @@@@@@@@@@@@@@@@@@@@@@@@@ ANUSHKA
    const tip = document.getElementById('tip'); 

    homepageTab.addEventListener('click',function () {
       showHomePage();
       setActiveTab(homepageTab); // Set the Arbitrage tab as active
       showTop5Button.style.display = 'none'; // Hide the Show Top 5 button
        showTop10Button.style.display = 'none';
        searchContainer.style.display = 'none';
        tip.style.display = 'none';
    })

    liveStocksTab.addEventListener('click', function () {
        showLiveStocksTable();
        setActiveTab(liveStocksTab); // Set the Live Stocks tab as active
        /*RASHMI*/ searchContainer.style.display = 'flex'; // Show the search input and button in the Live Stocks tab
        /*RASHMI*/ updateLiveStockTable(searchInput, searchButton); // Update the "Live Stocks" table with data
        showTop5Button.style.display = 'none'; // Hide the Show Top 5 button
        showTop10Button.style.display = 'none';
        tip.style.display = 'none';
    });

    arbitrageTab.addEventListener('click', function () {
        showArbitrageTable();
        setActiveTab(arbitrageTab); // Set the Arbitrage tab as active
        /*RASHMI*/ searchContainer.style.display = 'none'; // Hide the search input and button in the Arbitrage tab
        showTop10Button.addEventListener('click', showTop10Stocks); // Attach the event listener to the button
        showTop5Button.addEventListener('click', showTop5Stocks);
        showTop5Button.style.display = 'block'; // Hide the Show Top 5 button
        showTop10Button.style.display = 'block';
        tip.style.display = 'block';

    });

    savedStocksTab.addEventListener('click', function () {
        showSavedStocksTable();
        setActiveTab(savedStocksTab); // Set the Saved Stocks tab as active
        /*RASHMI*/  searchContainer.style.display = 'none'; // Hide the search input and button in the Arbitrage tab
        showTop5Button.style.display = 'none'; // Hide the Show Top 5 button
        showTop10Button.style.display = 'none';
        tip.style.display = 'none';

    });
    opportunitiesTab.addEventListener('click', function () {
        showopportunitiesTable();
        setActiveTab(opportunitiesTab); // Set the Saved Stocks tab as active    
        showTop5Button.style.display = 'none'; // Hide the Show Top 5 button
        showTop10Button.style.display = 'none';
        tip.style.display = 'none';

    });
    printDataBtn.addEventListener('click', printData);
    tip.style.display = 'none';

    showHomePage();
    /************RASHMIIIIIIIIIIIIIII********************/
    searchButton.addEventListener('click', function () {
        updateLiveStockTable(searchInput, searchButton); // Call the function to update the table with the search term           
    });
    document.getElementById("reloadButton").addEventListener("click", function() {
            showLiveStocksTable();
    });
        const logoutButton = document.getElementById('logout');
        logoutButton.addEventListener('click', function () {

            // 1. Clear any session/local storage data related to the user's authentication.
            localStorage.removeItem('userToken'); // Remove the user token from local storage
            
            // 2. Redirect the user to the login page.
            window.location.href = 'http://localhost:3000'; // Redirect to the login page

        });

/************RASHMIIIIIIIIIIIIIII********************/
});