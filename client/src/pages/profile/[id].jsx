import React, { useEffect } from 'react'
import Info from '../../components/Profile/Info'
import Posts from '../../components/Profile/Posts'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getProfileUsers } from '../../redux/actions/profileAction'

import LoadIcon from '../../images/loading.gif'

const Profile = () => {

  const { id } = useParams()
  const { auth, profile } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(profile.ids.every(item => item !== id)){
      dispatch(getProfileUsers({id, auth}))
    }
  },[id, auth, dispatch, profile.ids])


  return (
    <div className="profile">
      {
        profile.loading
        ?
        <img className="d-block mx-auto my-4" src={LoadIcon} alt="loading" />
        : 
        <Info id={id} auth={auth} dispatch={dispatch} profile={profile} />
      }
        <Posts id={id} auth={auth} />
        
    </div>
  )
}

export default Profile