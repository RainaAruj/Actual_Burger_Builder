import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name please'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Your E-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:"fastest", displayValue: "Fastest"},
                       {value:"cheapest", displayValue: "Cheapest"}
                   ]
                },
                value:'fastest',
                validation:{
                   
                },
                valid:true,
               
            },
        },
        formIsValid:false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        
        const formData ={};

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingridients:this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);

        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
    }

    checkValidity =(value,rules)=>{
        let isValid =true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength && rules.maxLength && isValid){
            isValid = value.length>=rules.minLength && value.length<=rules.maxLength
        }
        return isValid;

    }
    inputChangedHandler=(event,inputIdentifier)=>{
    const updatedOrderForm = {
        ...this.state.orderForm
    }
    const updatedFormElement ={
        ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    let formIsValid =true;

    
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
       

        for(let inputIdentifier in updatedOrderForm){
    
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
    
    updatedFormElement.touched = true;

   

    updatedOrderForm[inputIdentifier] =updatedFormElement;
    this.setState({orderForm : updatedOrderForm, formIsValid: formIsValid});
    
    } 

    render () {

        const FormElementArray = Object.keys(this.state.orderForm);
        
        let form = (
            <form onSubmit = {this.orderHandler}>
                {FormElementArray.map(formElement =>{
                   let config = this.state.orderForm[formElement];
                    return (<Input 
                    elementType = {config.elementType}
                    value = {config.value}
                    elementConfig = {config.elementConfig}
                    key ={formElement}
                    changed = {(event)=>this.inputChangedHandler(event,formElement)} 
                    shouldValidate = {config.validation}
                    touched ={config.touched}
                    inValid={!config.valid}/>)
                })}
                
                <Button btnType="Success" disabled = {!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (orderData)=>{dispatch(actions.purchaseBurger(orderData))},

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));