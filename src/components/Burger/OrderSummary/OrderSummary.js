import React, { Component } from 'react'
import Auxilary from '../../../hoc/Auxillary/Auxillary'
import Button from '../../UI/Button/Button'

class OrderSumary extends Component{
    render(){
        const ingridientSummary = Object.keys(this.props.ingridients).map((igKey)=>{

            return <li key ={igKey}> <span style ={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingridients[igKey]}</span></li>});

        return(
            <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingridients:</p>
            <ul>
                {ingridientSummary}
            </ul>
            <p> <strong>Total Price of the burger : {this.props.price.toFixed(2)}</strong> </p>
            
            <p> Continue to CheckOut</p>
            <Button btnType = "Danger" clicked ={this.props.purchaseCanceled} >CANCEL</Button>
            <Button btnType = "Success" clicked ={this.props.purchaseContinued} >CONTINUE</Button>
                 
            </Auxilary>
);
}
}

export default OrderSumary;