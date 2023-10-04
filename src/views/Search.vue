<template>
  <div class="search-wrapper">
    <typeSearcher />
    <div class="search-main animate__animated animate__fadeIn">
      <div class="search-box panel">
        <div class="title">
          <i class="las la-search"></i> <span> Search for Housing Items</span>
        </div>
        <p>
          You can search by item name, description, source or type. eg:
          "instrument", "vendor", "drop", "Pillar"
        </p>
        <div class="input-wrap">
          <i class="las la-search"></i>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="start typing.."
            @keyup="checkSearch()"
            @focus="$event.target.select()"
          />
        </div>
      </div>

      <div v-if="this.$store.state.housingItemsSearch?.length > 0" class="search-results">
        
        

        <div
        v-for="housingItem in this.$store.state.housingItemsSearch"
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
import typeSearcher from "../components/typeSearcher.vue";
export default {
  components: { typeSearcher },
  data() {
    return {
      searchTerm: null,
    };
  },
  methods: {
    checkSearch() {
      this.$store.state.housingItemsSearch = [];
      if (this.searchTerm.length >= 3) {
        //add the housing items
        this.$store.state.housingItemsData.forEach((housingItem) => {
          let canPush = false;
          if (housingItem.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            canPush = true;
          }
          if (housingItem.source.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            canPush = true;
          }
          if (housingItem.itemDescription.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            canPush = true;
          }
          if (housingItem.itemType.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            canPush = true;
          }

          if (canPush) {
            this.$store.state.housingItemsSearch.push(housingItem);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  height: 100vh;

  .search-main {
    background: url("https://ashypls.com/endpoints/files/fantasia/hibg.jpg");
    background-size: cover;
    width: 100%;
    overflow-y:scroll;
    padding:1rem;

    .search-box {
      margin: 2rem auto;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;


      .input-wrap {
        position: relative;
        background: red;
        width: 100%;

        input {
          font-size: 120%;
          padding: 0.75rem 1rem;
          padding-left: 3rem;
          width: calc(100% - 4rem);
          outline: none;
          background: #8f9385;
          border: solid 3px #8f9385;
          color: #383a33;
          text-transform: uppercase;
          padding-top: 1rem;

          &:focus {
            border-color: #bfc5b1;
          }
        }

        i {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-size: 200%;
          color: #6a6f60;
        }
      }
    }
  }
}
.search-results{
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    gap:1rem;
    justify-content: center;
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
    max-width: 300px;
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