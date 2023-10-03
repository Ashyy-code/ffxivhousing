import { createStore } from "vuex";
export default createStore({
    state(){
        return{
            dataEndPoint:'https://ashypls.com/endpoints/apis/ffxivhousingdata.aspx',
            endpointDataLoaded:false,
            housingItemsData:null,
            housingItemsDataFiltered:null,
            housingItemTypes:[],
            selectedType:'Furnishing',
            selectedSubType:'All',
        }
    }
})