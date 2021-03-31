import React from 'react'
import classes from './Order.module.css'

const order =(props) =>{

    let ingridientOutput = Object.keys(props.ingridients).map(ig=>{
        return <span key ={ig}
            style ={{
                textTransform: 'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border: '1px solid #ccc',
                padding:'5px'
            }}
        >
            {ig} ({props.ingridients[ig]})
            </span>
    })
    

    return(
        <div className ={classes.Order}>
            <p> Ingridients: {ingridientOutput} </p>
            <p><strong>Price: USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )


}

export default order;