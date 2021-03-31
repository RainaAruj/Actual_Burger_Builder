import React from 'react'
import classes from './Burger.module.css'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'

const burger =(props) =>{
    let transformedIngridient = Object.keys(props.ingridients).map((igKey)=>{

        return [...Array(props.ingridients[igKey])].map((_,index)=>{

                return <BurgerIngridient key={igKey+index} type ={igKey}> </BurgerIngridient>
        })
    }).reduce((accumulator,currentValue)=>{
        return accumulator.concat(currentValue);
    },[]);

    if(transformedIngridient.length ===0){
        transformedIngridient = <p>Please start adding ingridients!</p>
    }

    return(
        <div className = {classes.Burger}>
            <BurgerIngridient type ="bread-top"> </BurgerIngridient>
            {transformedIngridient}
            <BurgerIngridient type ="bread-bottom"> </BurgerIngridient>
        </div>
    );
}

export default burger;