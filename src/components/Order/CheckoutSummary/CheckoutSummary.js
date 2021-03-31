import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'
const checkoutSummary =(props) =>{

    return (
        <div className ={classes.CheckOutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style ={{width:"100%",height:'300px',margin:'auto'}}>
                <Burger ingridients ={props.ingridients}/>
            </div>
            <Button clicked = {props.checkoutCancelled} btnType="Danger" >CANCEL</Button>
            <Button clicked = {props.checkoutContinued} btnType="Success" >CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;