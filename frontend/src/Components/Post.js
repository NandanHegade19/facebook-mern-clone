import { Avatar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './Post.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import NearMeIcon from '@material-ui/icons/NearMe';
import axios from '../axios';
import Pusher from 'pusher-js'
import { useStateValue } from '../StateProvider';

const pusher = new Pusher('ac071da2a6fbb027c55a', {
    cluster: 'us2'
});

const Post = ({ postId, imgName, username, timestamp, text }) => {
    
    const [{ user }, dispatch] = useStateValue()
    const randmLikes = Math.floor(Math.random() * 200)
    const [thisLike, setThisLike] = useState(randmLikes);
    const [thisComment, setThisComment] = useState([]);
    const [allComments, setAllComments] = useState([]);

    const getAllComments = () => {
        axios.get(`/get/allcomments?id=${postId}`).then((res) => {
            setAllComments(res.data[0].comments)
        })
    }

    useEffect(() => {
       if(postId){
           getAllComments();
           //pusher
           const channel = pusher.subscribe('comments');
           channel.bind('newComment', function(data) {
            getAllComments()
        });
       }  
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        if(postId){
            axios.post(`/new/comment?id=${postId}`, {
                comment: thisComment,
                commentBy: user.displayName
            })
        }
        setThisComment("");
    }
    return (
        <div className='post' >
            <div className="post__top">
                <Avatar src={user.photoURL} className='post__avatar' />
                <div className="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(parseInt(timestamp)).toUTCString()}</p>
                </div>
            </div>
            <div className="post__bottom">
                <p>{text}</p>
            </div>

            {
                imgName ? (
                    <div className="post__image">
                        <img src={`http://localhost:8000/retrieve/image/single?name=${imgName}`} />
                    </div>
                ) : (
                        console.log('DEBUG >>> no image here')
                    )
            }
            <div className = "counters">
                <div className = "counter_likes">
                    Likes: {thisLike}
                </div>
                <div className = "counter_comments">
                     {allComments.length} Comments
                </div>
            </div>
            <div className="post__options">
                <div className="post__option" >
                    <ThumbUpIcon />
                    <button onClick = {e => setThisLike(thisLike+1)} className = "postbtn">Like</button>
                </div>
                <div className="post__option">
                    <ChatBubbleOutlineIcon />
                    <button className = "postbtn">Comment</button>
                </div>
                <div className="post__option">
                    <NearMeIcon />
                    <button className = "postbtn">Share</button>
                </div>
            </div>
            {
                user && (
                    <div className = "post__commentBox">
                    <form >
                        <input type = "text" value = {thisComment} onChange = {e => setThisComment(e.target.value)} placeholder = "Write a comment..." className = "post__comment-input"/>
                        <button type = "submit" disabled = {!thisComment} onClick = {postComment} className = "post__comment-button">Post</button>
                    </form></div>
                )
            }
            {
                <div className = "post__comments">
                    {allComments.map((comm) => (
                        <p><strong> {comm.commentBy} </strong> {comm.comment} </p>
                    ))}
                </div> 
            
            }
        </div>
    )
}

export default Post
