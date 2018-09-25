import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
    generatePosts(posts){
          return posts.map(l=>{ //for each key do this
            return (<Post 
                id={l._id} 
                key={l._id} 
                text={l.text}
                comments={l.comments} 
                removePost = {this.removePost}
                removeComment = {this.props.removeComment}
                onCommentSubmit = {this.props.onCommentSubmit}
                onChangeUser = {this.props.onChangeUser}
                onChangeComment = {this.props.onChangeComment}
                />);
        });
    } 
    removePost= (id) =>{
        this.props.removePost(id);
    }    
    render() {
        return (
            <div>
            <div>All the Posts:</div>
            {this.generatePosts(this.props.posts)}
            </div>
        );
    }
}

export default Posts;