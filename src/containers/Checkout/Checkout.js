import React, {Component} from 'react' 
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary' 
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import ContactData from './ContactData/ContactData';


class Checkout extends Component {


    // ********Below code is used for transfering the data from one route to another**********//

    // state = {
    //     ingridients: null,
    //     totalPrice: 0
    // }

    // componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingridients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingridients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingridients: ingridients, totalPrice: price } );
    // }
    //****************************************************************************************//

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        
        let summary = <Redirect to ="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased? <Redirect to ="/"/>:null
           summary = (
           <div>
               {purchasedRedirect}
            <CheckoutSummary
            ingridients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component ={ContactData}
             />
                </div>)

        }

        return summary;
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingridients,
        purchased: state.order.purchased

    }
}


export default connect(mapStateToProps)(Checkout);