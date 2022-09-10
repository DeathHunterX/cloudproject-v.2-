import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadIcon from '../../images/loading.gif'


const RightSideBar = () => {
    const {suggestionPosts} = useSelector(state => state)


    return (
        <div className="suggestion">
            <h4 style={{fontWeight: "bold"}} >Similar jobs: </h4>
            {
                suggestionPosts.loading 
                ?
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                :    
                suggestionPosts.posts.map(post => (
                    <div key={post._id}>
                    <Link to={`/post/${post._id}`} className ="text-dark">
                        <div className='suggestion_card'><span>- {post.title} ({post.salary}$/hour) </span></div>
                    </Link>
                    </div>
                ))
            }
        </div>
    
  )
}

export default RightSideBar