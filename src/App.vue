<template>
    <router-view v-if="this.$store.state.endpointDataLoaded" />
</template>

<script>
import axios from 'axios';
import store from './store';
export default {
    mounted(){
        this.loadHousingData();
    },
    methods:{
        async loadHousingData(){
            await axios.get(store.state.dataEndPoint,{contentType:'application/json'}).then(
                response =>{
                    //load the housing data
                    store.state.housingItemsData = response.data;
                    store.state.housingItemsDataFiltered = response.data.slice(0,10);


                    //manage the data
                    
                    //split into types
                    response.data.forEach(item =>{
                        if (!store.state.housingItemTypes.includes(item.itemType)){
                            store.state.housingItemTypes.push(item.itemType)
                        }
                    })

                    




                    store.state.endpointDataLoaded = true;
                    console.log(response.data);
                }
            )
        }
    }
}
</script>

<style>

</style>