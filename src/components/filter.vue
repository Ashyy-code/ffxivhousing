<template>
  <div class="filter-wrap">
    <div class="title">
      {{ this.$store.state.selectedType?.replace("/", "") }}
    </div>
    <div class="sub-items">
      <div
        v-for="item in subItems"
        :key="item"
        class="subitem"
        :selected="item == this.$store.state.selectedSubType"
        @click="
          this.$store.state.selectedSubType = item;
          filterBySubItem(item);
        "
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loadSubItems() {
      let arrSub = ["All"];
      this.$store.state.housingItemsDataFiltered.forEach((item) => {
        if (!arrSub.includes(item.itemSubType.replace("/", ""))) {
          arrSub.push(item.itemSubType.replace("/", ""));
        }
      });
      this.subItems = arrSub;
      this.$store.state.previousSubList = arrSub;
    },

    filterBySubItem(item) {
      this.$store.state.housingItemsDataFiltered = [];
      this.$store.state.housingItemsData.forEach((hItem) => {
        if (
          (hItem.itemSubType == item &&
            hItem.itemType == this.$store.state.selectedType) ||
          (item == "All" && hItem.itemType == this.$store.state.selectedType)
        ) {
          this.$store.state.housingItemsDataFiltered.push(hItem);
        }
      });
      //this.loadSubItems();
    }
  },
  mounted() {
    if(!this.$store.state.pushedFromView == true){
      this.loadSubItems();
    } else{
      this.$store.state.pushedFromView = false;
      this.subItems = this.$store.state.previousSubList;
      //this.$store.state.previousSubList = null;
    }
    
  },
  watch: {
    "$store.state.selectedType": function () {
      this.loadSubItems();
    },
  },
  data() {
    return {
      subItems: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 200%;
  text-align: center;
  padding: 0.5rem;
}
.filter-wrap {
  color: white;
}

.sub-items {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.subitem {
  background: #4a4030;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 80%;
  transition:all 300ms ease;

  &:hover {
    background: #935f0b;
  }

  &[selected="true"] {
    background: #935f0b;
  }
}
</style>