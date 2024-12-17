import { displayCoinCards } from "./displayCoinCards.js";

export function showModal(newSymbol, selectedSymbols, filteredArrUSD, filteredArrEur, filteredArrNIS) {
    $('#coinSelectionForm').empty();
    selectedSymbols.forEach(symbol => {
        $('#coinSelectionForm').append(`
            <button id="${symbol}Btn" data-bs-dismiss="modal">${symbol.toUpperCase()}</button>
            `);
        $("#selectedCoinSpan").text(newSymbol.toUpperCase());
        $(`#${symbol}Btn`).click(() => {
            selectedSymbols.delete(symbol);
            selectedSymbols.add(newSymbol);
            displayCoinCards(filteredArrUSD, filteredArrEur, filteredArrNIS, selectedSymbols);
        });
    });

    $("#coinSelectionModal").modal("show");
}