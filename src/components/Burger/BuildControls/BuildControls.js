import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls =    [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]
const buildControls =(props)=>{

    return(
        
        <div className ={classes.BuildControls}>
            <p> Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>{
                return <BuildControl disabled ={props.disabled[ctrl.type]} type ={ctrl.type} removed ={()=> props.ingridientRemoved(ctrl.type)} added = {() => props.ingridientAdded(ctrl.type)} key ={ctrl.label} label ={ctrl.label}></BuildControl>

            })}
        <button  onClick ={props.ordered} disabled={!props.purchasable} className ={classes.OrderButton}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;