import React, { Component } from 'react';

class Comment extends Component {
    handleClick = () => {
        this.props.removeComment(this.props.pid,this.props.id);
    }
    render() {
        return (
            <span pid={this.props.pid} id={this.props.id}>{this.props.text} said by {this.props.user}
            <button type="button" onClick={this.handleClick}>Remove Comment</button>
            </span>
        );
    }
    
}

export default Comment;