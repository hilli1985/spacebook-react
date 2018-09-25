import React, { Component } from 'react';
import logo from './facebook.svg';
import './App.css';
import Form from './components/Form'
import Posts from './components/Posts'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post:'',
      comment:'',
      user:''
    };
  }
  
  async componentDidMount() {
    const response = await this.getAllPosts()
    this.setState({ posts: response.data })
  }
  
  async getAllPosts() {
    return axios.get("/posts")
  }
  
  async deletePost(id){
    return axios.delete("/post/"+id)
  }
  
  async deleteComment(pID,cID){
    return axios.delete(`/comment/${pID}/${cID}`)
  }
  
  async addPost(value) {
    const response = await axios.post('/post', {
      text: value
    })
    return response.data;
  }
  
  async addComment(postID) {
    const response = await axios.post('/comment/'+postID, {
      text: this.state.comment,
      user: this.state.user
    })
    return response.data;
  }
  
  // CR  change handleChangeX to handleChang 
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }
  
  handleChangePost = (e) => { 
    this.setState({post: e.target.value});
  }
  handleChangeComment = (e) => { 
    this.setState({comment: e.target.value});
  }
  handleChangeUser = (e) => { 
    this.setState({user: e.target.value});
  }

  // CR - spread create a shallow copy
  handlePostSubmit = async (e) => {
    e.preventDefault();
    let post = (this.state.post);
    let newPosts = [...this.state.posts];
    const data =  await this.addPost(post);
    newPosts.push({text:data.text,_id:data._id});
    this.setState({ posts: newPosts, post:''})
  }
  
  handleCommentSubmit = async (e,postID) => {
    e.preventDefault();
    let newPosts = [...this.state.posts];
    let response = await this.addComment(postID);
    for (let p in newPosts){
      if (newPosts[p]._id===postID){
        newPosts[p] = response;
        this.setState({ posts: newPosts,comment:'',user:''})
      }
    }
  }


  // CR find index check for this 
  handleremovePost = (id) => {
    this.deletePost(id);
    let newPosts = [...this.state.posts];
    for (let p in newPosts){
      if (newPosts[p]._id===id){
        newPosts.splice(p,1);
        this.setState({posts: newPosts})
        return;
      }
    } 
  }
  
  handleremoveComment =(pID, cID) =>{
    this.deleteComment(pID,cID);
    let newPosts = [...this.state.posts];
    for (let p in newPosts){
      if (newPosts[p]._id===pID){
        for (let c in newPosts[p].comments) {
          if (newPosts[p].comments[c]._id===cID){
            newPosts[p].comments.splice(c,1);
            this.setState({posts: newPosts})
            return;
          }
        }
      }
    }
  }
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to (F*)acebook</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      <div className="App-intro">
        <Form post={this.state.post} onChangePost={this.handleChangePost}
        onPostSubmit={this.handlePostSubmit}/>
        <br />
        <Posts 
        onCommentSubmit={this.handleCommentSubmit} 
        onChangeUser={this.handleChangeUser}
        onChangeComment={this.handleChangeComment}
        posts = {this.state.posts} 
        removePost={this.handleremovePost}
        removeComment={this.handleremoveComment}/>
      </div>  
      </div>
    );
  }
}
export default App;
