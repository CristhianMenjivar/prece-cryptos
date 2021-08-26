import axios from "axios";

const cryptoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
});

const getCoinsGecko = async () => {
  try {
    const url =
      "/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const { data } = await cryptoApi.get(url);

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCoinsGecko;
