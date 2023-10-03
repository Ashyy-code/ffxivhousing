<template>
  <router-view v-if="this.$store.state.endpointDataLoaded" />
</template>

<script>
import axios from "axios";
import store from "./store";
export default {
  mounted() {
    this.loadHousingData();
  },
  methods: {
    async loadHousingData() {
      await axios
        .get(store.state.dataEndPoint, { contentType: "application/json" })
        .then((response) => {
          //load the housing data
          store.state.housingItemsData = response.data;
          this.$store.state.housingItemsDataFiltered = [];
          this.$store.state.housingItemsData.forEach((item) => {
            if (item.itemType == store.state.selectedType) {
              this.$store.state.housingItemsDataFiltered.push(item);
            }
          });

          //manage the data

          //split into types
          response.data.forEach((item) => {
            if (!store.state.housingItemTypes.includes(item.itemType)) {
              store.state.housingItemTypes.push(item.itemType);
            }
          });

          store.state.endpointDataLoaded = true;
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
</style>