import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCandidate } from '../../redux/actions/jobAction'
import LoadIcon from '../../images/loading.gif'

import AcceptedEmployees from '../../components/Job/AcceptedEmployees'

const Employees = () => {
    const { id } = useParams()
    const {auth, jobStatus } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth.token) {
            dispatch(getCandidate(id, auth.token))
        }
    }, [dispatch, id, auth.token])
    return (
        <div>
            {
                jobStatus.loading 
                ?
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                :
                    jobStatus.result === 0 
                    ? 
                        <h2 className='text-center'>No Posts</h2> 
                    :
                        <AcceptedEmployees jobStatus={jobStatus} auth={auth}/>
            }   
            
        </div>
    )
}

export default Employees