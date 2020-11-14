import React, { useEffect, useState } from 'react'
import './Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import axios from '../axios'
import Pusher from 'pusher-js'

const pusher = new Pusher('ac071da2a6fbb027c55a', {
    cluster: 'us2'
});

const Feed = () => {
   
    const [postsData, setPostsData] = useState([])

    const getFeed = () => {
        axios.get('/retrieve/posts').then((res) => {
            console.log(res.data)
            setPostsData(res.data)
        })
    }
    useEffect(() => {
        getFeed()
    }, [])
    useEffect(() => {
        const channel = pusher.subscribe('posts');
        channel.bind('inserted', function(data) {
            getFeed()
        });
    },[])
    return (
        <div className='feed' >
            <StoryReel />
            <MessageSender />

            {postsData?.map((post) => (
                <Post 
                    key = {post._id}
                    postId = {post._id}
                    timestamp={post.timestamp}
                    text={post.text}
                    username = {post.username}
                    imgName={post.imgName}
                />
            ))}
        </div>
    )
}

export default Feed
