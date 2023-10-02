<template>Viewing item: {{ housingItem }}</template>

<script>
import store from "../store";
export default {
  mounted() {
      this.itemID = this.$route.params.id;
      //load this item
      this.$store.state.housingItemsData.forEach((housingItem) => {
        if (housingItem.itemID == this.itemID) {
          this.housingItem = housingItem;
         
        }
      });
  },
  data() {
    return {
      itemID: null,
      housingItem: null,
    };
  },
};
</script>

<style>
</style>