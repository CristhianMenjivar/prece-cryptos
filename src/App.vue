<template>
  <div v-if="cryptos">
    <h1>Coin Market</h1>
    <button @click="getCryptos">Refresh</button>

    <input type="text" v-model="textSearch" />

    <table>
      <thead>
        <tr>
          <th v-for="t in titles" :key="t">{{ t }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(coin, index) in cryptos" :key="coin.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img height="30" :src="coin.image" :alt="coin.name" />

            <span>
              {{ coin.name }}
            </span>
            -
            <span>
              {{ coin.symbol }}
            </span>
          </td>

          <td>{{ coin.current_price }}</td>
          <td
            :class="[
              coin?.price_change_percentage_24h > 0
                ? 'coin-change-price'
                : 'coin-not-change-price',
            ]"
          >
            {{ coin.price_change_percentage_24h }}
          </td>
          <td>{{ coin.total_volume }}</td>
        </tr>
      </tbody>
    </table>
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
      titles: ["#", "Coin", "Price", "Price change", "24h Volume"],
      textSearch: "",
      coinsFiat: ["usd"],
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
      const cryptos = await getCryptosApi();
      this.cryptos = cryptos;
    },
  },
  created() {
    this.getCryptos();
  },
};
</script>
<style>
.coin-change-price {
  color: green;
}
.coin-not-change-price {
  color: red;
}
</style>
