import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateJob } from '../../../redux/actions/jobAction'

const JobStatus = ({job}) => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    
    const initialState = {status: job.status, dateOfJoining: ' '}
    const [jobData, setJobData] = useState(initialState)

    const isStatus = () => {
        if(job.status === 'applied'){
            return (
                <button className="btn btn-warning w-100 mb-2"
                onClick={() => setJobData({...jobData, status: 'shortlisted'})}
                >
                    Shortlist
                </button>
            )
        } 
        if (job.status === 'shortlisted'){
            return (
                <button className="btn btn-success w-100 mb-2"
                onClick={() => setJobData({...jobData, status: 'accepted', dateOfJoining: new Date().toISOString()})}
                >
                    Accept
                </button>
            )
        }
        
        if (job.status === 'accepted'){
            return (
                <div className="status-box text-white mb-3" style={{background: "#4EA5D9"}}>
                    Accept
                </div>
                
            )
        }

        if (job.status === 'finished'){
            return (
                <div className="status-box text-white mb-3" style={{background: "#4EA5D9"}}>
                    Finish
                </div>
                
            )
        }
    }

    const handleUpdateStatus = (e) => {
        e.preventDefault()
        dispatch(updateJob(jobData, job._id, auth))
    }
    
    return (
        <div className="card-status">
            <form onSubmit={handleUpdateStatus} style={{width: "120px"}}>
                <div>
                {
                    jobData.status === 'rejected' ?
                    <></>
                    :
                    isStatus()
                }
                </div>
                <div>
                {
                    jobData.status === 'accepted' || 
                    jobData.status === 'finished'?
                    <></>
                    :
                    <button className="btn btn-danger w-100" 
                    onClick={() =>  setJobData({...jobData, status: "rejected"})}
                    >
                        Reject
                    </button>
                }
                </div>

                {/* <p>{jobData.status}</p> */}
                
            </form>
            
        </div>
    )
}

export default JobStatus