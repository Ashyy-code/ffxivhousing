import { createStore } from "vuex";
export default createStore({
    state(){
        return{
            dataEndPoint:'https://ashypls.com/endpoints/apis/ffxivhousingdata.aspx',
            endpointDataLoaded:false,
            housingItemsData:null,
            housingItemsDataFiltered:null,
            housingItemsSearch:null,
            housingItemTypes:[],
            selectedType:'Furnishing',
            selectedSubType:'All',
            pushedFromView:false,
            previousSubList:null,
        }
    }
})