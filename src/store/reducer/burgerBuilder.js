import * as actionTypes from '../actions/actionTypes'

const INGRIDIENT_PRICE ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState ={
    ingridients : null,
    totalPrice: 4,
    error: false
}

const reducer =(state = initialState, action)=>{

    switch(action.type){

        case(actionTypes.ADD_INGRIDIENT):
        return{
            ...state,
            ingridients:{
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName]+1
            },
            totalPrice: state.totalPrice + INGRIDIENT_PRICE[action.ingridientName]

        };
        
        case(actionTypes.REMOVE_INGRIDIENT):
        return{
            ...state,
            ingridients:{
                ...state.ingridients,
                [action.ingridientName]: state.ingridients[action.ingridientName]-1
            },
            totalPrice: state.totalPrice - INGRIDIENT_PRICE[action.ingridientName]

        };
        case(actionTypes.SET_INGRIDIENT):
            return{
                ...state,
                ingridients: action.ingridients,
                error: false,
                totalPrice:4
            }
        case(actionTypes.FETCH_INGRIDIENT_FAILED):
            return{
                ...state,
                error: true
            }


        default:
            return state;
            
    }



}

export default reducer;