import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngridient =(ingridientName)=>{

    return{
        type:actionTypes.ADD_INGRIDIENT, 
        ingridientName:ingridientName

    }
}

export const removeIngridient =(ingridientName)=>{

    return{
        type:actionTypes.REMOVE_INGRIDIENT, 
        ingridientName:ingridientName

    }
}
const setIngridient =(ingridients) =>{
    return {
        type: actionTypes.SET_INGRIDIENT,
        ingridients: ingridients
    }
}

export const fetchIngridientFailed =()=>{
    return{
        type: actionTypes.FETCH_INGRIDIENT_FAILED
    }
}

export const initIngridient = ()=>{
    return dispatch =>{
        axios.get( 'https://react-my-burger-71760-default-rtdb.firebaseio.com/ingridients.json' )
            .then( response => {
                dispatch(setIngridient(response.data));
            } ).catch( error => {
                dispatch(fetchIngridientFailed())
            } );
    }
}