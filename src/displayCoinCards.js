export function displayCoinCards(coinsArrUSD, coinsArrEUR, coinsArrNIS, selectedSymbols) {

    $("#coinsCount").html(`Showing ${coinsArrUSD.length} Coin${coinsArrUSD.length === 1 ? "" : "s"}`);
    
    let html = "";
    for (let i = 0; i < coinsArrUSD.length; i++) {
        html += `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="coinCard" id="coinCard${i}">
                <div class="cardHead form-switch">
                    <span></span>
                    <img src="${coinsArrUSD[i].image}" alt="Coin icon has a problem loading..">
                    <input type="checkbox" class="form-check-input" data-index="${i}" ${selectedSymbols.has(coinsArrUSD[i].symbol) ? "checked" : ""}>
                </div>
                <div class="cardBody">
                    <h5>${coinsArrUSD[i].symbol.toUpperCase()}</h5>
                    <p>${coinsArrUSD[i].name}</p>
                    <div class="info" id="info${i}" style="display: none;">
                        <label>USD Price: </label>
                        <span>${coinsArrUSD[i].current_price.toLocaleString()}$</span>
                        <br>
                        <label>Euro Price: </label>
                        <span>${coinsArrEUR[i].current_price.toLocaleString()}€</span>
                        <br>
                        <label>NIS Price: </label>
                        <span>${coinsArrNIS[i].current_price.toLocaleString()}₪</span>
                    </div>
                    <a class="btn btn-primary" data-index="${i}">More Info</a>
                </div>
            </div>
        </div>
    `;
    }
    $("#coinCards").html(html);
}