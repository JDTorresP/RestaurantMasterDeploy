import React, {Component} from "react";
import PropTypes from "prop-types";
import CommentsList from "./CommentsList.js";
import axios from 'axios';

class Restaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            rating: 0,
            text: '',
            value:0
        };

    }

    handleSubmit() {
        const mail = this.state.mail;
        const text = this.state.text;
        const val = this.state.value;
        console.log(mail,text,val)

        console.log('entre funcion');
        var url2 = "/restaurant/" + this.props.restaurant._id + "/comment";
      
        axios.post(url2,{'user_mail': mail,
                'text': text,
                'vote': ""+val})
                .then(response =>{
                    this.props.refrescar()
                });  
    }
    handleOnChageMail(email){  
        this.setState({
            mail:email
        })
        console.log(this.state.mail)
    }
    handleOnChageText(text){
        this.setState({
            text:text
        })
        console.log(this.state.text)
    }
    handleOnChageValue(val){
        this.setState({
            value:val
        })
        console.log(this.state.value)
    }

    render() {
        return (
            <div
                className="col-md-6 my-1 text-center"
                id="formContainer">
                <img src={this.props.restaurant.photo} alt="restaurant picture"/>
                <div className="name titlehead">{this.props.restaurant.name}</div>
                <div className="address">{this.props.restaurant.address}</div>
                <div className="product">{this.props.restaurant.product}</div>
                <div className="prodDescrip">{this.props.restaurant.prodDescrip}</div>
                <p>{this.props.value}</p>
                <form>
                    <div>
                        <label className="name">Your mail:</label>
                        <input type="email" className="form-control"
                            placeholder="Email address"
                            id="mail" onChange={(e)=>{
                                this.handleOnChageMail(e.target.value)
                            }}
                            required/>
                    </div>
                    <div>
                        <label className="comment">Comment:</label>
                        <input
                            type="text"
                            className="input-md textinput textInput form-control"
                            id="comment" onChange={(e)=>{
                                this.handleOnChageText(e.target.value)
                            }}
                            required/>
                    </div>
                    <div>
                        <label className="rating selectpicker">Rating:</label>
                        <select id="rat" onChange={(e)=>{
                            this.handleOnChageValue(e.target.value)
                            }} required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <button
                            className="btn btn-lg btn-primary btn-block"
                            type="submit"
                            onClick={()=>this.handleSubmit()}>COMMENT & VOTE!</button>
                    </div>
                </form>
                <div>
                    <div className="card card-body">
                        <CommentsList comments={this.props.restaurant.comments}/>
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