import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import RatingPost from '../Rating/ratingPost'

const JobCard = ({job}) => {
    const {auth} = useSelector(state =>  state)
    const [onRating, setOnRating] = useState(false)

    const isStatus = () => {
        if (job.status === "applied") return "bg-primary"
        if (job.status === "shortlisted") return "bg-warning"
        if (job.status === "accepted") return "bg-success"
    }
    return (
            <div className="card my-3">
                <div className="card_body">
                    <div className="card_body-content">
                        <div className="card_body_header">
                            <h5>{job.postId.title}</h5> 
                            <p>ID: {job._id}</p>
                        </div>
                        

                        {/* Debugged */}
                        <p> Description: 
                        {job.postId.description.length < 180  
                            ? job.postId.description
                            : job.postId.description.slice(0, 180) + '...'}
                        </p>
                        <p>Skill: {job.postId.skillRequired}</p>
                        <p>Job Type: {job.postId.jobType}</p>
                        <p>Salary: {job.postId.salary}$ Avg.Hour</p>
                        
                    </div>

                    <div className="status_card">
                        <div className={`status-box ${isStatus()} mb-2`}>
                            <span>{job.status}</span>
                            
                        </div>
                        {
                            (job.status === "accepted" || job.status === "finished") && (
                                <button className="btn btn-outline-primary w-100"
                                onClick={() => setOnRating(true)}>
                                    Rate This Job
                                </button>
                                
                            )
                            
                        }
                        {
                            onRating &&
                            <RatingPost setOnRating={setOnRating} job={job} auth={auth}/>
                        }
                    </div>
                    
                </div>
            </div>
          
          
        
    )
}

export default JobCard