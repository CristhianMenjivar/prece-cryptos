<template>
  <div class="app-container">
    <h1 class="app-title">Coin Market</h1>

    <header class="header-container">
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          v-model="textSearch"
          placeholder="Buscar..."
        />

        <button
          class="refresh-button"
          :disabled="isfetching"
          @click="getCryptos"
        >
          {{ isfetching ? "Refrescando..." : "Refrescar" }}
        </button>
      </div>
    </header>

    <div v-if="cryptos">
      <main>
        <table id="cryptos">
          <thead>
            <tr>
              <th>#</th>
              <th class="text-coin-start">Coin</th>
              <th>Price</th>
              <th>Price change</th>
              <th>24h Volume</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(coin, index) in cryptos"
              :key="coin.id"
              @click="selectCrypto(coin)"
            >
              <td class="text-center-columns">{{ index + 1 }}</td>
              <td class="coin-icon-title">
                <img height="30" :src="coin.image" :alt="coin.name" />

                <span>
                  {{ coin.name }}
                </span>
                -
                <span>
                  {{ coin.symbol }}
                </span>
              </td>

              <td class="text-center-columns">
                {{ coin.current_price }} {{ monedaView }}
              </td>
              <td
                class="text-center-columns"
                :class="[
                  coin?.price_change_percentage_24h > 0
                    ? 'coin-change-price'
                    : 'coin-not-change-price',
                ]"
              >
                {{ coin.price_change_percentage_24h }} {{ monedaView }}
              </td>
              <td class="text-center-columns">{{ coin.total_volume }}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  </div>
</template>

<script>
import getCryptosApi from "./api";

export default {
  name: "App",
  components: {},
  data() {
    return {
      cryptos: [],
      isfetching: true,
      currentCrypto: null,
      titles: ["#", "Coin", "Price", "Price change", "24h Volume"],
      textSearch: "",
      monedaView: "usd",
      intervalId: null,
    };
  },
  watch: {
    textSearch() {
      this.searchCoin();
    },
  },
  methods: {
    searchCoin() {
      if (this.textSearch?.length > 0) {
        this.cryptos = this.cryptos.filter(
          (c) =>
            c.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
            c.symbol.toLowerCase().includes(this.textSearch.toLowerCase())
        );
      } else {
        this.getCryptos();
      }
    },
    async getCryptos() {
      this.isfetching = true;
      this.cryptos = await getCryptosApi();

      setTimeout(() => {
        this.isfetching = false;
      }, 1000);
    },
    initInterval() {
      this.intervalId = setInterval(() => {
        this.getCryptos();
      }, 10000);
    },
  },
  created() {
    this.getCryptos();
    this.initInterval();
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>
<style scoped>
.app-container {
  margin: 0;
  padding: 0;
}

.app-title {
  text-align: center;
  margin: 30px;
  font-family: monospace;
  font-size: 40px;
}

.header-container {
  padding-left: 8%;
  padding-right: 8%;
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
}

main {
  padding: 8%;
  padding-top: 0;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 70px;
}

.search-input {
  background-color: rgba(243, 241, 241, 0.795);
  padding: 10px 10px 10px 15px;
  width: 75%;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
  border: 1px solid rgba(243, 241, 241, 0.795);
}

.search-input:hover {
  border: 1px solid rgb(164, 164, 165);
}

.refresh-button {
  background-color: #44c767;
  border-radius: 24px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 18px;
  padding: 14px 41px;
  text-decoration: none;
  text-shadow: -1px 0px 8px #2f6627;
  border: 0;
  min-width: 200px;
}

.refresh-button:hover {
  background-color: #5cbf2a;
}
.refresh-button:active {
  position: relative;
  top: 1px;
}

.coin-change-price {
  color: green;
}
.coin-not-change-price {
  color: red;
}

#cryptos {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

#cryptos td,
#cryptos th {
  border: 1px solid #ddd;
}

#cryptos td {
  padding: 9px;
}

.coin-icon-title {
  display: flex;
  align-items: center;
}

.coin-icon-title img {
  margin-right: 15px;
}

#cryptos tr:nth-child(even) {
  background-color: #f2f2f2;
}

#cryptos tr:hover {
  background-color: #ddd;
  cursor: pointer;
}

#cryptos th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #04aa6dfb;
  color: white;
}

.text-center-columns {
  text-align: center;
}

.text-coin-start {
  text-align: start;
  padding-left: 15px;
}
</style>
