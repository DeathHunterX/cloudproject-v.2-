import React, { useEffect } from 'react'
import PostList from '../components/Posts/PostList'

import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/actions/postAction'
import LoadIcon from '../images/loading.gif'

const Lists = () => {
  const { auth, homePosts } = useSelector(state => state)
  const dispatch = useDispatch()
    
  useEffect(() => {
      if (auth.token) dispatch(getPosts(auth.token))
  }, [dispatch, auth.token])
  return (
    <div className="post_page">
      {
        homePosts.loading 
        ? 
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" /> 
        : 
        homePosts.result === 0 
        ?
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: "50vh"}}>
          <h2 className="p-3">You don't have any posts. Create your own post to apply many applicants as you need</h2>
        </div>
        :
        <PostList /> 
      }  
    </div>
  )
}

export default Lists