import React, {useEffect} from 'react'
import JobCard from '../components/Job/JobCard'

import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../redux/actions/jobAction'

import LoadIcon from '../images/loading.gif'

const Jobs = () => {
  
  const {auth, jobStatus} = useSelector(state => state)
  const dispatch = useDispatch()


  
  useEffect(() => {
    if (auth.token) dispatch(getJobs(auth.token))
  }, [dispatch, auth.token])
  // console.log(auth.token)

  return ( 
     
    <div>

      {
      jobStatus.loading ?
        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        : 
        jobStatus.result === 0 
        ?
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: "50vh"}}>
          <h2 className="p-3">You don't apply any job. Go to browse to find suitable job for you</h2>
        </div>
        
        :
        <div className="job_card">
          {
            jobStatus.jobs.map(job => (
                <JobCard job={job} key={job._id}/>
            ))
          }
        </div>
        
      }
        
        
    </div>
    
  )
}

export default Jobs