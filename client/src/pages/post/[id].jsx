import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getPost } from '../../redux/actions/postAction'


import LoadIcon from '../../images/loading.gif'
import PostInfo from '../../components/Posts/PostInfo'
import { getSuggestion } from '../../redux/actions/suggestionPostsAction'


const PostProfile = () => {
    const { id } = useParams()
    const { auth, detailPost } = useSelector(state => state)
    const dispatch = useDispatch()

    const [post, setPost] = useState([])

    useEffect(() => {
        dispatch(getPost({detailPost, id, auth}))
        if(detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
        dispatch(getSuggestion(auth.token))
    }, [detailPost, dispatch, id, auth])
    return (
        <div className="post">
            {
                post.length === 0 && <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
            }

            {
                post.map(item => (
                    // <PostCard key={item._id} post={item} />
                    <PostInfo key={item._id} post={item} />
                ))
            }

           
        </div>
    )
}

export default PostProfile