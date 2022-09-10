import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'


const PostList = () => {
    const { homePosts }  = useSelector(state => state)
    return (
        
        <div className="posts">
            {
                homePosts.posts.map(post => (
                    <Link to={`/post/${post._id}`} className ="text-dark" key={post._id}>
                        <PostCard post={post} />
                    </Link>
                    
                ))
            }

        </div>
        
    )
}

export default PostList