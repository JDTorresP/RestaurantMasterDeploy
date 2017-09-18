import React, {Component} from "react";
import PropTypes from "prop-types";
import CommentsList from "./CommentsList.js";

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],   
            value:0,
            mail: '',
            rating: 0,
            text: ''
        };
    }
    refrescar() {
        this.setState({
            comments:this.props.restaurant.comments
        }) 
    }

     componentDidMount(){
    
        var quer= "/restaurant/"+this.props.restaurant.id+"/votes";
        console.log(quer);
        
    }

    onSubmit(){
        var quer= "/restaurant/"+this.props.restaurant.id+"/comment"
        fetch(quer, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_mail: this.state.mail,
              text: this.state.text,
              vote: this.state.rating
            })
          });
          this.refrescar();
    }

    handleEmailChange(e){
        this.setState({email: e.target.value});
     }

    handleText(e){
        this.setState({text: e.target.value});
     }
    handleRating(e){
        this.setState({rating: e.target.value});
    }

    render() {
        return (
            <div className="col-md-6 my-1 text-center" onLoad = {this.refrescar()}>
                <img src={this.props.restaurant.photo} alt="restaurant picture"/>
                <div className="name">{this.props.restaurant.name}</div>
                <div className="address">{this.props.restaurant.address}</div>
                <div className="product">{this.props.restaurant.product}</div>
                <div className="prodDescrip">{this.props.restaurant.prodDescrip}</div>
                <p>{this.props.value}</p>
                <form>
                    <div>
                        <label className="name">Your mail:</label>
                        <input type="text" id="mail" value={this.state.email} onChange={this.handleEmailChange} required/>
                    </div>
                    <div>
                        <label className="comment">Comment:</label>
                        <input type="text" id="comment" value={this.state.text} onChange={this.handleText} required/>
                    </div>
                    <div>
                        <label className="rating">Rating:</label>
                        <select value={this.state.rating} onChange={this.handleRating}  required>
                            <option value="1">1</option> 
                            <option value="2">2</option> 
                            <option value="3">3</option>
                            <option value="4">4</option> 
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="button">
                        <button type="submit">COMMENT & VOTE!</button>
                    </div>
                </form>
                <div>
                    <div className="card card-body">
                        <CommentsList comments={this.state.comments}/>
                    </div>
                </div>
            </div>
        );
    }
}

Restaurant.PropTypes = {
    restaurant: PropTypes.object.isRequired
}

export default Restaurant;