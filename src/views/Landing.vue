<template>
  <div class="app-wrap">

  

  <div v-if="this.$store.state.endpointDataLoaded" class="item-types">
    <div v-for="(type,index) in this.$store.state.housingItemTypes" :key="index" class="item-type">
     <label v-html="getTypeIcon(type)"></label> {{ type.replace('/','') }} <b>({{ getTypeCount(type) }})</b>
    </div>
  </div>


  <div class="housing-items" v-if="this.$store.state.endpointDataLoaded">
    <div 
    v-for="housingItem in this.$store.state.housingItemsDataFiltered" 
    :key="housingItem.itemID" 
    class="housing-item"
    @click="this.$router.push('/view/' + housingItem.itemID)"
    >
      <img v-if="housingItem.itemImage1" :src="'https://en.ff14housing.com' + housingItem.itemImage1?.substring(1,500)" />
      <img v-if="!housingItem.itemImage1" :src="'https://en.ff14housing.com' + housingItem.itemIconImage?.substring(1,500)" />
      <span>{{ housingItem.itemName }}</span>
    </div>
  </div>

</div>

</template>

<script>
import store from '../store';
export default {
    methods:{
      getTypeCount(type){
        let counter = 0;
        store.state.housingItemsData.forEach(housingItem =>{
          if (housingItem.itemType == type){ counter ++}
        })
        return counter;
      },
      getTypeIcon(type){
        switch (type.trim().replace('/','')){
          case "Outdoor": return '<i class="las la-tree"></i>'
          case "Table": return '<i class="las la-dumpster"></i>'
          case "Furnishing": return '<i class="las la-brush"></i>'
          case "Rug": return '<i class="las la-microchip"></i>'
          case "Interior": return '<i class="las la-key"></i>'
          case "Wall-mounted": return '<i class="las la-image"></i>'
          case "Tabletop": return '<i class="las la-chess"></i>'
          case "Exterior decoration": return '<i class="lab la-pagelines"></i>'
          case "Exterior": return '<i class="las la-home"></i>'
          case "Painting": return '<i class="las la-palette"></i>'
          case "Aquarium": return '<i class="las la-fish"></i>'
          case "Chair": return '<i class="las la-couch"></i>'
          case "Flowers": return '<i class="las la-spa"></i>'
          case "Miscellany": return '<i class="las la-football-ball"></i>'
        }
      }
    }
}
</script>

<style lang="scss" scoped>
.app-wrap{
  display:flex;

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
    }
  }
}

.housing-items{
  display:flex;
  flex-wrap:wrap;
  gap:1rem;
  padding:1rem;
  height:calc(100vh - 2rem);
  overflow-y:scroll;
  align-content: start;

}
.housing-item{
  cursor: pointer;
  width:250px;
  padding:1rem;
  border-radius: .5rem;
  background:var(--item-bg);
  //border:solid 5px var(--item-brd);
  flex-grow: 1;
  display:flex;
  flex-direction: column;
  color:white;
  max-height:350px;
  transition:all 300ms ease;


  span{
    text-align: center;
    padding:.5rem;
    font-size:120%;
  }

  img{
    border-radius: .5rem;
    max-height:300px;
    object-fit: cover;
   // border:solid 5px var(--img-brd)
  }

  &:hover{
    //border:solid 5px var(--item-brd-hv);
    background:var(--item-bg-hv);
  }
}
</style>