import { displayCoinCards } from "./displayCoinCards.js";
import { fetchData } from "./fetchData.js";
import { startLiveUpdates } from "./liveChart.js";
import { hideLoading, showLoading } from "./loading.js";
import { parallax } from "./parallax.js";
import { showModal } from "./showModal.js";

$(async () => {

    parallax();

    let fetchedDataArr;
    try {
        showLoading();
        fetchedDataArr = await fetchData();
    }
    catch (err) {
        alert(err.message);
    }
    finally {
        hideLoading();
    }
    const [coinsArrUSD, coinsArrEUR, coinsArrNIS] = fetchedDataArr;
    let [filteredArrUSD, filteredArrEur, filteredArrNIS] = fetchedDataArr;
    const selectedSymbols = new Set();

    displayCoinCards(coinsArrUSD, coinsArrEUR, coinsArrNIS, selectedSymbols);

    // Home Button
    $(`a[href="#links"]`).click(() => {
        $(`#liveReports`).hide(1000);
        $(`#about`).hide(1000);
        $(`#coinsMain`).show(1000);
        $("#searchBox").show(1000);
        $("#searchBox").val(``);
        filteredArrUSD = coinsArrUSD;
        filteredArrEur = coinsArrEUR;
        filteredArrNIS = coinsArrNIS;
        displayCoinCards(coinsArrUSD, coinsArrEUR, coinsArrNIS, selectedSymbols);
    });

    // Live Reports Button
    $(`#liveReportsLink`).click(() => {
        $(`#coinsMain`).fadeOut(1000);
        $(`#searchBox`).fadeOut(1000);
        $(`#about`).fadeOut(1000);
        $(`#liveReports`).show(1000);
        startLiveUpdates(selectedSymbols);
    });

    // About Button
    $("#aboutLink").click(() => {
        $(`#coinsMain`).fadeOut(1000);
        $(`#searchBox`).fadeOut(1000);
        $(`#liveReports`).fadeOut(1000);
        $(`#about`).fadeIn(1000);
    });

    //More Info Button
    $(document).on('click', '.btn', function () {
        $(this).hide();
        const index = $(this).data("index");
        $(`#info${index}`).show(1000);
    });

    // Checkboxes Handling
    $(document).on('click', '.form-check-input', function () {
        const index = $(this).data("index");
        if (selectedSymbols.size >= 5) {
            // If clicked on selected coin:
            if (selectedSymbols.has(filteredArrUSD[index].symbol)) {
                $(this).prop("checked", false);
                selectedSymbols.delete(filteredArrUSD[index].symbol);
                return;
            }
            // If trying to select 6th coin:
            $(this).prop("checked", false);
            showModal(filteredArrUSD[index].symbol, selectedSymbols, filteredArrUSD, filteredArrEur, filteredArrNIS);
            return;
        }
        // If clicked on selected coin:
        if (selectedSymbols.has(filteredArrUSD[index].symbol)) {
            $(this).prop("checked", false);
            selectedSymbols.delete(filteredArrUSD[index].symbol);
            return;
        }
        selectedSymbols.add(filteredArrUSD[index].symbol);
    });

    // Search filter
    $("#searchBox").on("input", function () {
        const inputText = $(this).val().toLowerCase();
        filteredArrUSD = coinsArrUSD.filter(item => item.name.toLowerCase().includes(inputText) || item.symbol.includes(inputText));
        filteredArrEur = coinsArrEUR.filter(item => item.name.toLowerCase().includes(inputText) || item.symbol.includes(inputText));
        filteredArrNIS = coinsArrNIS.filter(item => item.name.toLowerCase().includes(inputText) || item.symbol.includes(inputText));
        displayCoinCards(filteredArrUSD, filteredArrEur, filteredArrNIS, selectedSymbols);
    });

    // Footer
    const year = new Date().getFullYear();
    $("footer").html(`<h5>All Rights Reserved © ${year} David Liahovitsky</h5>`);
});