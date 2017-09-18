import React, {Component} from "react";
//import './css/bootstrap.css';
//import './css/styles.css';
import Comment from "./Comment.js";

class CommentsList extends Component {
    constructor(props){
        super(props);
    }

    renderComments(){
        return this.props.comments.map((t,i)=>{
        return (<Comment comment={t} key={i} />);
        });
    }

    render(){
        return(
        <div>
            <div className="container row">{this.props.comments ? this.renderComments():"No comments Yet lol"}</div>
        </div>);
    }
}
export default CommentsList;
