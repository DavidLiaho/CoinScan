export async function fetchData() {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&vs_currency=usd");
        const coinsDataUSD = response.data;
        const responseEuro = await axios.get("https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&vs_currency=eur");
        const coinsDataEur = responseEuro.data;
        const responseNIS = await axios.get("https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&vs_currency=ils");
        const coinsDataNIS = responseNIS.data;

        const jsonUSD = JSON.stringify(coinsDataUSD);
        const jsonEUR = JSON.stringify(coinsDataEur);
        const jsonNIS = JSON.stringify(coinsDataNIS);
        localStorage.setItem("coinsUSD", jsonUSD);
        localStorage.setItem("coinsEUR", jsonEUR);
        localStorage.setItem("coinsNIS", jsonNIS);

        return [coinsDataUSD, coinsDataEur, coinsDataNIS];
    }
    catch {
        const jsonUSD = localStorage.getItem("coinsUSD");
        const coinsUSD = JSON.parse(jsonUSD);
        const jsonEUR = localStorage.getItem("coinsEUR");
        const coinsEUR = JSON.parse(jsonEUR);
        const jsonNIS = localStorage.getItem("coinsNIS");
        const coinsNIS = JSON.parse(jsonNIS);
        if (!coinsUSD || !coinsEUR || !coinsNIS)
            throw new Error("Error fetching data from API");
        return [coinsUSD, coinsEUR, coinsNIS]
    }
}