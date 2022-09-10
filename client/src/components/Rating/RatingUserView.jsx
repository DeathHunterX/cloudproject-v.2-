import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import {Rating} from '@mui/material'
import { getDataAPI } from '../../utils/fetchData'

const RatingUserView = ({job, auth}) => {
    // console.log(job.userId._id)
    const [userRating, setUserRating] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        async function ratingData() {
            try {
                const res = await getDataAPI(`getRating/user/?id=${job.userId._id}`, auth.token)
                setUserRating(res.data.rating)
            } catch (err) {
                dispatch({
                    type: GLOBALTYPES.ALERT, 
                    payload: ({
                        error: err.response.data.msg
                    })
                })
            }
        }
        ratingData()   
        
    }, [auth.token, dispatch, job.userId._id])
        
    return (
        <div>
            <Rating name="read-only" 
            value={userRating}
            precision={0.5}
            readOnly
            />
        </div>
    )
}

export default RatingUserView