import React from 'react'

const PostCard = ({auth, post}) => {
    
    return (
        <div className="card my-3">
            <div className="card_body">
                <div className="card_body-content">
                    <h5 className="title">{post.title}</h5>
                    
                    <p>
                        {
                            post.description.length < 180  
                            ? post.description 
                            : post.description.slice(0, 180) + '...'
                        }
                        
                        {/* {
                        post.description.length > 180 &&
                        <span className="readMore" onClick={() => setReadMore(!readMore)}>
                            {
                                readMore ? 'Hide content' : 'Read more'
                            }
                        </span>
                        } */}
                    </p>
                    
                    <p>Skill: {post.skillRequired}</p>
                    <p>Job Type: {post.jobType}</p>
                    <p>Salary: {post.salary}$ Avg.Hour</p>
                    
                </div>
            </div>
        </div>
    )
}

export default PostCard