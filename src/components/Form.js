import React, { Component } from 'react';

class Form extends Component {
 

    render() {
        return (
            <form onSubmit={this.props.onPostSubmit}>
            <h2>Add a New Post</h2>
            <input type="text" name="post" value={this.props.post} onChange={this.props.onChangePost} placeholder="Enter post text" />
            <input type="submit" value="Post" />
            </form>
        )
    }
}


export default Form;