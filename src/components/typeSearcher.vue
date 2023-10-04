<template>
  
  <div v-if="this.$store.state.endpointDataLoaded" class="item-types">
    <div class="item-type src" @click="this.$router.push('/search'); this.$store.state.selectedType = null">
      <label for=""><i class="las la-search"></i></label> Search
    </div>
    <div 
    v-for="(type,index) in this.$store.state.housingItemTypes" 
    :key="index" 
    class="item-type"
    :selected="this.$store.state.selectedType == type"
    @click="filterByType(type); this.$store.state.selectedType = type; this.$store.state.selectedSubType = 'All';checkPageRoute();"
    >
     <label v-html="getTypeIcon(type)"></label> {{ type.replace('/','') }} <b>({{ getTypeCount(type) }})</b>
    </div>
  </div>

</template>

<script>
import store from '../store';
export default {
    methods: {
    getTypeCount(type) {
      let counter = 0;
      store.state.housingItemsData.forEach((housingItem) => {
        if (housingItem.itemType == type) {
          counter++;
        }
      });
      return counter;
    },
    getTypeIcon(type) {
      switch (type.trim().replace("/", "")) {
        case "Outdoor":
          return '<i class="las la-tree"></i>';
        case "Table":
          return '<i class="las la-dumpster"></i>';
        case "Furnishing":
          return '<i class="las la-brush"></i>';
        case "Rug":
          return '<i class="las la-microchip"></i>';
        case "Interior":
          return '<i class="las la-key"></i>';
        case "Wall-mounted":
          return '<i class="las la-image"></i>';
        case "Tabletop":
          return '<i class="las la-chess"></i>';
        case "Exterior decoration":
          return '<i class="lab la-pagelines"></i>';
        case "Exterior":
          return '<i class="las la-home"></i>';
        case "Painting":
          return '<i class="las la-palette"></i>';
        case "Aquarium":
          return '<i class="las la-fish"></i>';
        case "Chair":
          return '<i class="las la-couch"></i>';
        case "Flowers":
          return '<i class="las la-spa"></i>';
        case "Miscellany":
          return '<i class="las la-football-ball"></i>';
      }
    },
    checkPageRoute(){
        this.$router.push('/');
        console.log('pushed')
    },
    filterByType(type) {
      this.$store.state.housingItemsDataFiltered = [];
      this.$store.state.housingItemsData.forEach((item) => {
        if (item.itemType == type) {
          this.$store.state.housingItemsDataFiltered.push(item);
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>

.item-types{
    background:var(--type-bg);
    width:min-content;
    white-space: nowrap;

    .item-type{
      padding:1rem;
      cursor: pointer;
      border-bottom:solid 3px var(--type-button-sep);
      text-transform: uppercase;
      transition: all 300ms ease;
      color:white;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      gap:.5rem;

      label{
        font-size:150%;
      }

      &:hover{
        background:var(--type-button-hv);
        color:white;
      }

      &[selected="true"]{
        background:var(--type-button-hv);
        color:white;
      }
    }
}
.src{
  background:#484941;
  color:#bcc585 !important;
  &:hover{
    color:white !important;
  }
}
</style>