

import React, {Component} from 'react'
import Layout from '../components/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import CheckOut from '../containers/Checkout/Checkout'
import {Route,Switch} from 'react-router-dom'

import Orders from './Orders/Orders'

class App extends Component{
    

  render(){
    
   return (
     <div >
       <Layout> 
         <Switch>
           <Route path="/checkout" component ={CheckOut}/>
           <Route path="/orders" component ={Orders}/>
           <Route path="/"  component ={BurgerBuilder}/>
         </Switch>
        
        
       </Layout>
      </div>
   );
  // This is the compiled version of the above code
  //return React.createElement('div',{className:'App'},React.createElement('h1',null, 'am i\' done now'));
}
}

export default App;
