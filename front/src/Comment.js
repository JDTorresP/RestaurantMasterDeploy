import React, {Component} from "react";

class Comment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className="text-center">
            <div>{this.props.comment.user_mail}</div>
          <div> {this.props.comment.text}</div>
          <div>{this.props.comment.vote}</div>
        </div>);
    }
}

export default Comment;