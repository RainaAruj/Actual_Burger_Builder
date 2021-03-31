import React, { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js'

class BurgerBuilder extends Component{

    state ={
        purchasing: false,
    
    }

    componentDidMount () {
        // axios.get( 'https://react-my-burger-71760-default-rtdb.firebaseio.com/ingridients.json' )
        //     .then( response => {
        //         this.setState( { ingridients: response.data } );
        //     } ).catch( error => {
        //         this.setState( { error: true } );
        //     } );

        this.props.OnInitIngridient();
    }

    purchaseHandler =() =>{

        this.setState({purchasing:true});
    }

    purchaseCancelHandler =() =>{
        
        this.setState({purchasing:false});

    }

    purchaseContinueHandler =() =>{

        // This code below were used we need to send the ingridient to another page but now we can pass it through redux

        // const queryParam =[];

        // for(let key in this.state.ingridients){
        //     queryParam.push(encodeURIComponent(key)+ '=' + encodeURIComponent(this.state.ingridients[key]))
        // }
        // queryParam.push('price='+this.state.totalPrice);
        // const queryString =queryParam.join('&');


        // this.props.history.push({
        //     pathname:'/checkout',
        //     search : '?' +queryString 
        // });
                this.props.onInitPurchase();
                this.props.history.push('/checkout');



        // ***** This code below was used when we were posting data to server on clicking Order Button 

        // this.setState({loading:true});

        // const order ={
        //     ingridients: this.state.ingridients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Aruj Raina',
        //         adress:{
        //             street : 'Gullati Gali',
        //             zipCode: '4661213',
        //             country: 'India'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'

        // }
        // axios.post('/orders.json',order).then(response=>{
        //     this.setState({loading:false, purchasing:false});
        // }).catch(error => {
        //     this.setState({loading:false, purchasing:false});
        // })
    
    }

    updatePurchaseState= (ingridient) =>{
        const sum = Object.values(ingridient).reduce((accumulator,currentValue) =>{
            return accumulator+currentValue;
        },0) ;

        return sum>0;
        
    }

    // addIngridientHandler= (type) => {
    //     const oldCount = this.state.ingridients[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngridient = {...this.state.ingridients};

    //     updatedIngridient[type] = updatedCount;

    //     const priceAddition = INGRIDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+priceAddition;
        
    //     this.setState({ingridients:updatedIngridient, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngridient);

    // }

    // removeIngridientHandler = (type) =>{

    //     const oldCount = this.state.ingridients[type];

    //     if(oldCount<=0){
    //         return; 
    //     }
    //     const updatedCount = oldCount-1;
    //     const updatedIngridient = {...this.state.ingridients};

    //     updatedIngridient[type] = updatedCount;

    //     const priceDeduction = INGRIDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice-priceDeduction;
        
    //     this.setState({ingridients:updatedIngridient, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngridient);
    // }

  

    render(){
        const disableIngridient = {
            ...this.props.ings
        }

        for( let key in disableIngridient){

            disableIngridient[key] = disableIngridient[key]<=0;
        }

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        let orderSummary = null;

        if(this.props.ings){
            burger =(
                <Auxillary>
                     <Burger ingridients ={this.props.ings}></Burger>  
                        <BuildControls 
                        ingridientAdded ={this.props.OnIngridientAdded} 
                        ingridientRemoved ={this.props.OnIngridientRemoved}
                        disabled = {disableIngridient}
                        purchasable ={this.updatePurchaseState(this.props.ings)}
                        price ={this.props.price}   
                        ordered ={this.purchaseHandler}/>
                </Auxillary>
            );
            orderSummary =(
                <OrderSummary purchaseCanceled ={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}
                ingridients ={this.props.ings}
                price ={this.props.price}></OrderSummary>);
        }
       
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return(
            <Auxillary>
                    <Modal show ={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                   
                    </Modal>
                    {burger}
                   
            </Auxillary>
        )


    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        OnIngridientAdded: (ingridientName)=>dispatch(actions.addIngridient(ingridientName)),
        OnIngridientRemoved: (ingridientName)=>dispatch(actions.removeIngridient(ingridientName)),
        OnInitIngridient: ()=>{dispatch(actions.initIngridient())},
        onInitPurchase : ()=>{dispatch(actions.purchaseInit())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));