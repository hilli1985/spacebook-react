// route for posting data into the database

//route for getting the data from the database

//route for deleting data from the database

const express = require('express');
const router = express.Router();
// destruct
let {Post,Comment} = require('../models/postModel');

const wrap = require("../middleware/wrap");

// return all the posts
router.get('/posts', (req, res,err) =>{
  if (err) {
    console.log(err);
  }
  Post.find().exec(function(err, posts){
    if (err){
      console.log('err to return posts: '+err);
    }
    res.send(posts);
  });  
}); 

// add new post
router.post('/post',(req, res,err) =>{
  if(err) {
    console.log(err);
  };
  let newPost = new Post({
    text: req.body.text ,
    comments: []
  });
  newPost.save((err,data)=>{
    if (err) {
      console.log(err);
    }
    res.json(data);
  }); 
});

// delete post
router.delete('/post/:postID', wrap(async (req, res) =>{
  let {postID} = req.params;
  Post.findByIdAndRemove(postID)
  .then((data)=>{
    console.log("deleted");
    res.send(data);
  })
  .catch((err)=>{
    console.log(err);
  })
}));

// add a comment to post
router.post('/comment/:postID', (req, res ) => {
  console.log(req.params.postID);
  Post.findByIdAndUpdate(req.params.postID, 
    {$push: 
      { comments: 
        {
          text: req.body.text,
          user: req.body.user
        }
      }
    }, {new: true}, (err, post) => {
      if (err) throw err;
      else {res.send(post)}
    })
  })
  
  // delete a comment in a post
  router.delete('/comment/:postID/:commentID', (req, res) => {
    Post.findByIdAndUpdate(req.params.postID, 
      {$pull: 
        {comments: {
          _id:req.params.commentID}
        }
      }, {new: true}, (err, post) => {
        if (err) throw err;
        else res.send(post)
      })
    })


    

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // create dummy data
  
  //create post 1
  let post1 = new Post({
    text: 'I am post 1',
    comments: []
    
  });
  
  // create comment to post 1
  let comment11 = new Comment({
    text: 'I am the comment of post 1',
    user: 'Hilla'
  });
  
  
  //push the comment to post 1 array
  post1.comments.push(comment11);
  
  //save it to the DB
  // post1.save((err,data)=>{
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("post:"+data);
  // });
  
  // same for port 2
  let post2 = new Post({
    text: 'I am post 2',
    comments: []
    
  });
  
  let comment21 = new Comment({
    text: 'I am the comment of post 2',
    user: 'Kate'
  });
  
  post2.comments.push(comment21);
  
  // post2.save((err,data)=>{
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("post2:"+data);
  // });
  
  
  module.exports = router;