<template>
  <div class="app-wrap">
    <typeSearcherVue />

    <div class="main-wrap">

      <filterVue />
      
      <div class="housing-items" v-if="this.$store.state.endpointDataLoaded">
      <div
        v-for="housingItem in this.$store.state.housingItemsDataFiltered"
        :key="housingItem.itemID"
        class="housing-item animate__animated animate__fadeIn"
        @click="this.$router.push('/view/' + housingItem.itemID)"
      >
        <img
          v-if="housingItem.itemImage1 && housingItem.itemImage1.includes('.jpg')"
          :src="
            'https://en.ff14housing.com' +
            housingItem.itemImage1?.substring(1, 500)
          "
        />
        <img
          v-if="!housingItem.itemImage1 || housingItem.itemImage1.includes('.png')"
          :src="
            'https://en.ff14housing.com' +
            housingItem.itemIconImage?.substring(1, 500)
          "
        />
        <img
          v-if="!housingItem.itemImage1 && !housingItem.itemIconImage"
          :src="
            'https://ashypls.com/endpoints/files/fantasia/angy.png'
          "
        />
        <span>{{ housingItem.itemName }}</span>
        <span v-if="housingItem.source == 'crafting'" cr
          ><i class="las la-hammer"></i>
          {{ housingItem.craftedBy }} -
          {{ housingItem.craftedByRequiredLevel }}</span
        >
        <span v-if="housingItem.source == 'vendor'" cr
          ><i class="las la-coins"></i>Vendor</span
        >
        <span v-if="housingItem.source == 'drop'" cr
          ><i class="las la-cookie"></i>Drop</span
        >
        <span v-if="housingItem.source == 'unknown'" cr
          ><i class="las la-question"></i>Unknown</span
        >
      </div>
    </div>

    </div>


    
  </div>
</template>

<script>
import store from "../store";
import typeSearcherVue from "../components/typeSearcher.vue";
import filterVue from "../components/filter.vue";
export default {
  components: { typeSearcherVue, filterVue },
  
};
</script>

<style lang="scss" scoped>
.app-wrap {
  display: flex;
}
.main-wrap {
  display: flex;
  flex-direction: column;
  height:100vh;
  width:100vw;
}

.housing-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  padding-top:0;
  justify-content: center;
  flex-grow: 1;
  width:calc(100% - 2rem);
  overflow-y: scroll;
  align-content: start;
  background:url('https://ashypls.com/endpoints/files/fantasia/hibg.jpg');
  background-size: cover;
}
.housing-item {
  cursor: pointer;
  width: 250px;
  background: var(--item-bg);
  border:solid 5px #131313;

  display: flex;
  flex-direction: column;
  color: white;
  max-height: 375px;
  transition: all 300ms ease;

  span {
    text-align: center;
    display: grid;
    place-items:center;
    padding: 0.5rem;
    font-size: 130%;
    height: 65px;

    &[cr] {
      font-size: 110%;
      background: var(--craft-bg);
      padding: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
      height: unset;
    }
  }

  img {
    width:100%;
    max-width:300px;
    object-fit: cover;
    margin: auto;
    // border:solid 5px var(--img-brd)
  }

  &:hover {
    border:solid 5px var(--item-brd-hv);
    background: var(--item-bg-hv);
  }
}
</style>