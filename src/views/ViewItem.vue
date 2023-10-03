<template>
  <div class="view-item-wrap">
    <typeSearcher />
    <div v-if="housingItem" class="view-item animate__animated animate__fadeIn">
      <div class="panel">
        <button @click="this.$router.push('/')">
          <i class="las la-chevron-left"></i><span>Back to items</span>
        </button>
      </div>

      <div class="gallery panel">
        <div v-if="housingItem.itemImage1" class="image1">
          <img
            :src="
              'https://en.ff14housing.com' +
              housingItem.itemImage1?.substring(1, 500)
            "
          />
        </div>
        <div v-if="housingItem.itemImage2" class="image1">
          <img
            :src="
              'https://en.ff14housing.com' +
              housingItem.itemImage2?.substring(1, 500)
            "
          />
        </div>
      </div>

      <div class="item-details panel">
        <div class="item-icon">
          <img
            v-if="housingItem.itemIconImage"
            :src="
              'https://en.ff14housing.com' +
              housingItem.itemIconImage?.substring(1, 500)
            "
          />
        </div>
        <div class="item-detail">
          <span ttl>{{ housingItem.itemName }}</span>
          <span>Type : {{ housingItem.itemType }}</span>
          <span>Sub Type : {{ housingItem.itemSubType }}</span>
          <span>Source : {{ housingItem.source }}</span>
          <span dsc>{{ housingItem.itemDescription }}</span>
          <span sl>Sells for: {{ housingItem.sellValue }}</span>
        </div>
      </div>

      <div v-if="housingItem.source == 'vendor'" class="item-source panel">
        <div class="title">
          <i class="las la-coins"></i><span>Sold by vendor</span>
        </div>
        <table>
          <thead>
            <tr>
              <td>Vendor Name</td>
              <td>Vendor Location</td>
              <td>Required Item/Currency</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tr
            v-for="(vendorInfo, index) in housingItem.itemVendors"
            :key="index"
          >
            <td>{{ vendorInfo.vendorName }}</td>
            <td>{{ vendorInfo.vendorLocation }}</td>
            <td>{{ vendorInfo.requiredItemName }}</td>
            <td>{{ vendorInfo.requiredItemAmount }}</td>
          </tr>
        </table>
      </div>

      <div v-if="housingItem.source == 'crafting'" class="item-source panel">
        <div class="title">
          <i class="las la-hammer"></i><span>Crafted by <b>{{ housingItem.craftedBy }}</b> ({{ housingItem.craftedByRequiredLevel }})</span>
        </div>
        <table v-if="housingItem.craftItems">
          <thead>
            <tr>
              <td>Item Name</td>
              <td>Amount Required</td>
            </tr>
          </thead>
          <tr
            v-for="(craftingMat, index) in housingItem.craftItems"
            :key="index"
          >
            <td>{{ craftingMat.itemName }}</td>
            <td>{{ craftingMat.ammountRequired }}</td>
          </tr>
        </table>
        <table v-if="housingItem.crystals">
          <thead>
            <tr>
              <td>Item Name</td>
              <td>Amount Required</td>
            </tr>
          </thead>
          <tr
            v-for="(craftingMat, index) in housingItem.crystals"
            :key="index"
          >
            <td>{{ craftingMat.itemName }}</td>
            <td>{{ craftingMat.ammountRequired }}</td>
          </tr>
        </table>
      </div>

      <div v-if="housingItem.source == 'drop'" class="panel">
        <div class="title"><i class="las la-cookie"></i><span>This item is a drop/store item</span></div>
        <div class="info">Info on where this item drops is not available, but I can <a :href="googleTerm + housingItem.itemName" target="_blank">Google</a> it for you. </div>
      </div>

    
    </div>
  </div>
</template>

<script>
import store from "../store";
import typeSearcher from "../components/typeSearcher.vue";
export default {
  components: { typeSearcher },
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
      googleTerm:'https://www.google.com/search?q=',
    };
  },
};
</script>

<style lang="scss" scoped>
.item-details{
  display: flex;
  gap:1rem;
  .item-detail{
    display: flex;
    flex-direction: column;
    gap:.25rem;

    span{
      &[ttl]{
        font-size:150%;
      }
      &[sl]{
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      &[dsc]{
        padding:.5rem;
        padding-left:0;
        font-style: italic;
        color:#e4e9b5;
      }
    }
  }
}
.view-item-wrap {
  color: white;
  display: flex;
  height: 100vh;
}

button {
  padding: 0.75rem 2rem;
  background: #935f0b;
  color: white;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  gap: 0.5rem;

  &:hover {
    background: #b87a18;
  }
}

.view-item {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width:100%;
  overflow-y: auto;
}

.panel {
  background: #1e1c17;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: calc(1000px + 1rem);

  .title {
    display: flex;
    gap: 0.5rem;
    font-size: 150%;
    align-items: center;
    padding:.5rem;
  }

  table {
    width: 100%;
    tr {
      background:#424137;
      &:nth-child(even){
        background:#2d2c25;
      }
    }
    thead tr{
      background:#675432;
    }
    thead td{
      width:10%;
    }
    td{
      padding: 0.5rem;
    }
  }
}

.gallery {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;

  img {
    width: 100%;
  }
}
</style>