import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateJob } from '../../../redux/actions/jobAction'
import RatingUser from '../../Rating/ratingUser'

const JobEnd = ({job, auth}) => {
    
    const dispatch = useDispatch()
    
    const initialState = {status: job.status}
    const [jobData, setJobData] = useState(initialState)
    const [onRating, setOnRating] = useState(false)

    const isFinished = () => {
        if(job.status === 'accepted'){
            return (
                <button className="btn btn-primary mb-3 w-100"
                onClick={() => setJobData({...jobData, status: 'finished'})}
                >
                    End Job
                </button>
            )
        }
        if(job.status === 'finished'){
            return (
                <div className="status-box text-white mb-3 w-100" style={{background: "#4EA5D9"}}>
                    Finished
                </div>
            )
        }
    }
   
    const handleSubmit = (e) => {
        dispatch(updateJob(jobData, job._id, auth))

    }

    return (
        <div className="card-status">
            <form onSubmit={handleSubmit}>
                {isFinished()}
                
            </form>
            <button className="btn btn-primary" onClick={() => setOnRating(true)}>Rating This Person</button>
            
            {
                onRating &&
                <RatingUser setOnRating={setOnRating} job={job} auth={auth}/>
            }
        </div>
    )
}

export default JobEnd