import React, {Component} from "react";
import PropTypes from "prop-types";
import CommentsList from "./CommentsList.js";

class Restaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            value: 0,
            mail: '',
            rating: 0,
            text: ''
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
            

    }
    refrescar() {
        this.setState({comments: this.props.restaurant.comments})
    }

    componentDidMount() {

        var quer = "/restaurant/" + this.props.restaurant.id + "/votes";
        console.log(quer);

    }

    onSubmit() {
        var quer = "/restaurant/" + this.props.restaurant.id + "/comment"
        fetch(quer, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_mail: this.state.mail, text: this.state.text, vote: this.state.rating})
        });
        this.refrescar();
    }
    

    handleSubmit() {
        var com = {
            email: document
                .getElementById("mail")
                .value,
            rating: document
                .getElementById("rat")
                .value,
            text: document
                .getElementById("comment")
                .value
        }

        this.setState({
            email: document
                .getElementById("mail")
                .value,
            rating: document
                .getElementById("rat")
                .value,
            text: document
                .getElementById("comment")
                .value,
                comments: com
        });

        var url2 = "/restaurant/" + this.props.restaurant._id + "/comment";
        var request = require('request');

        // Set the headers
        var headers = {
            'User-Agent': 'Super Agent/0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        // Configure the request
        var options = {
            url: url2,
            method: 'POST',
            headers: headers,
            form: {
                'user_mail': 'pablitoClavo@unclavito.com',
                'text': 'severa hamburguesa',
                'vote': '5'
            }
        }

        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                alert(body)
            }
        })

    }

    render() {
        return (
            <div
                className="col-md-6 my-1 text-center"
                id="formContainer"
                onLoad={this.refrescar()}>
                <img src={this.props.restaurant.photo} alt="restaurant picture"/>
                <div className="name titlehead">{this.props.restaurant.name}</div>
                <div className="address">{this.props.restaurant.address}</div>
                <div className="product">{this.props.restaurant.product}</div>
                <div className="prodDescrip">{this.props.restaurant.prodDescrip}</div>
                <p>{this.props.value}</p>
                <form>
                    <div>
                        <label className="name">Your mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email address"
                            id="mail"
                            value={this.state.email}
                            required/>
                    </div>
                    <div>
                        <label className="comment">Comment:</label>
                        <input
                            type="text"
                            className="input-md textinput textInput form-control"
                            id="comment"
                            required/>
                    </div>
                    <div>
                        <label className="rating selectpicker">Rating:</label>
                        <select value={this.state.rating} id="rat" required>
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
                            onClick={this.handleSubmit}>COMMENT & VOTE!</button>
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