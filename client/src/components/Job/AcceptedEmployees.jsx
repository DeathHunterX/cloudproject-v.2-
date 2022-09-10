import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../Avatar'

import JobEnd from './Status/JobEnd'


import RatingUserView from '../Rating/RatingUserView'
const AcceptedEmployees = ({jobStatus, auth}) => {
    
    return (
        <div className="job_card">
            {jobStatus.jobs.map(job => (
                <div className="card my-3" key={job._id}> 
                    <div className="applicant_card" key={job._id}>
                        <div className="applicant_body">
                            <div className="card_header">
                                <div className="d-flex">
                                    <Avatar src={job.userId.avatar} size="big-avatar" />
                                    <div className="card_name">
                                        <h6 className="">
                                            <Link to={`/profile/${job.userId._id}`} className="text-dark text-decoration-none" >
                                                {job.userId.username}
                                            </Link>
                                        </h6>
                                        <RatingUserView job={job} auth={auth}/>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card_content">
                                <p>Reason of applying: {job.sop} </p>
                                <p>
                                    Applied on: {moment(job.dateOfJob).fromNow()} ({moment(job.createdAt).format('MM/DD/YYYY')})
                                </p>
                                <p>
                                    Joined on: {moment(job.dateOfJoining).fromNow()} ({moment(job.createdAt).format('MM/DD/YYYY')})
                                </p>
                            </div>
                        </div>
                        <JobEnd job={job} auth={auth} />
                        


                        
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AcceptedEmployees