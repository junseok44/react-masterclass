export async function CoinFetcher() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}

export async function CoinInfo(CoinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${CoinId}`).then(
    (response) => response.json()
  );
}

export async function CoinPrice(CoinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${CoinId}`).then(
    (response) => response.json()
  );
}

export async function CoinOHLC(CoinId: string) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - 7 * 24 * 60 * 60;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${CoinId}/ohlcv/historical?start=${start}&end=${end}`
  ).then((response) => response.json());
}
