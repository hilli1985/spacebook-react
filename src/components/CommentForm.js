import React, { Component } from 'react';
import '../Comment.css';

class CommentForm extends Component {


    onSubmit = (e, postID)=>{
        this.props.onCommentSubmit(e, postID)
    }

    render() {
        return (
            <form  className={this.props.className} pid={this.props.pid} 
            onSubmit={(e) => {this.onSubmit(e, this.props.pid)}}>
            <input type="text" name="comment" value={this.props.comment} onChange={this.props.onChangeComment}
            placeholder="Comment" />
            <br />
            <input type="text" name="user" value={this.props.user} onChange={this.props.onChangeUser}
            placeholder="Name" />
            <br />
            <input type="submit" value="Post Comment" />
            </form>
        )
    }
}


export default CommentForm;