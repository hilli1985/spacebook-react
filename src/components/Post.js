import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComments: false
        };
    }
    
    generateComments(comments){
        if (!comments){
            return;
        }
        return comments.map(l=>{ //for each key do this
            return (<li key={l._id} ><Comment 
                id={l._id} 
                pid={this.props.id}
                text={l.text.replace(/\s/g, '')}
                user={l.user.replace(/\s/g, '')}
                removeComment = {this.props.removeComment}/></li>);
            });
        } 
        handleClick = () => {
            this.props.removePost(this.props.id);
        }
        
        
        toggleCommentForm =()=>{
            this.setState({showComments:!this.state.showComments})
        }
        
        // CR - don't use href and <a> in react 
        render() {
            return (
                <div id={this.props.id}> 
                {this.props.text} <a href='#' onClick={this.toggleCommentForm} >Comments</a> 
                <button type="button" onClick={this.handleClick}>Remove Post</button>
                <ul>{this.generateComments(this.props.comments)}</ul>
                { this.state.showComments && <CommentForm pid={this.props.id}
                comment={this.state.comment} 
                user={this.state.user} 
                onCommentSubmit={this.props.onCommentSubmit}
                onChangeUser = {this.props.onChangeUser}
                onChangeComment = {this.props.onChangeComment}
            /> }
                </div>
            );
        }
        
    }
    
    
    export default Post;