import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { applyJob } from '../../redux/actions/jobAction'

const ApplyJob = ({setOnApply}) => {
    const initialState = {sop: ''}
    const [jobData, setJobData] = useState(initialState)
    const { sop } = jobData

    const {auth, status} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleChangeInput = e => {
        const {name, value} = e.target
        setJobData({...jobData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(applyJob(jobData, auth, status))

    }

    return (
        <div className="jobApply">
            <form onSubmit={handleSubmit}>
                <button className="btn btn-danger" onClick={() => setOnApply(false)}>Close</button>
                <div className="mb-3">
                    <label htmlFor="description">Reason for applying this job</label>
                    <textarea className="form-control" id="sop" name="sop" cols="30" rows ="10" style={{resize: 'none'}}
                    onChange={handleChangeInput} value={sop}/>
                </div>
                <button className="btn btn-primary">Apply</button>
            </form>
        </div>
    )
}

export default ApplyJob