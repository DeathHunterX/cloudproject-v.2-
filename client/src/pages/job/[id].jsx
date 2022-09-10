import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import JobApplicant from '../../components/Job/JobApplicant'
import { getDetailJob } from '../../redux/actions/jobAction'
import LoadIcon from '../../images/loading.gif'

const Applicant = () => {
  const { id } = useParams()
  const {auth, jobStatus} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.token) dispatch(getDetailJob(id, auth.token))
  }, [dispatch, id, auth.token])

  return (
    
    <div className="job_container">
      {/* <img src={LoadIcon} alt="loading" className="d-block mx-auto" /> */}
      {
      jobStatus.loading ?
        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        : 
        <JobApplicant jobStatus={jobStatus} />
      }  
    </div>
  )
  
}

export default Applicant