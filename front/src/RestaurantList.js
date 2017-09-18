import React, { Component } from 'react';
//import './css/bootstrap.css';
//import './css/styles.css';
import PropTypes from "prop-types";
import Restaurant from "./Restaurant.js";

class RestaurantsList extends Component {
    constructor(props){
        super(props);
    }

    renderRestaurants(){
        return this.props.restaurants.map((t,i)=>{
            return <Restaurant restaurant={t} key={i}/>;
        });
    }

    render(){
        return(
        <div>
            <div className="container row">{this.props.restaurants ? this.renderRestaurants():"No restaurants yet lol"}</div>
        </div>);
    }
}
RestaurantsList.PropTypes = {
    restaurants: PropTypes.array.isRequired
}

export default RestaurantsList;
