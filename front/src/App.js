import React, {Component} from 'react';
import Encabezado from "./Encabezado.js";
import RestaurantList from "./RestaurantList.js";

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            restaurants:[{}],
            rates: [{}]
        };
    }

   componentDidMount(){
        fetch("/restaurants", {method: "GET", 
        headers:{accept:"application/json"}})
        .then((res)=>{
            if(res.ok) return res.json();
        })
        .then((restaurants) => {
            this.setState({
                restaurants: restaurants
            });
        });
    }
    render(){
        return(
            <div className='container-fluid'>
                <div className='encabezado'>
                    <Encabezado />
                </div>
                <RestaurantList restaurants={this.state.restaurants}/>
            </div>
        );
    }
}

export default App;