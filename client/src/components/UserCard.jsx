import React from 'react'
import { Link } from 'react-router-dom'

import {FaImage} from 'react-icons/fa'
import Avatar from './Avatar'


import { useSelector } from 'react-redux'

const UserCard = ({user, msg}) => {
  const {theme} = useSelector(state => state)
  return (
    <div className={`d-flex p-2 justify-content-between align-items-center w-100`}>
        <Link to={`/profile/${user._id}`}className="d-flex align-items-center">
          <Avatar src={user.avatar} size="big-avatar"/>
          <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
              <span className="d-block">{user.username}</span>
              <small style={{opacity: 0.7}}>
                {
                  msg
                  ?
                  <>
                    <div style={{filter: theme ? 'invert(1)' : 'invert(0)'}}>{user.text}</div>
                    {
                      user.media.length > 0 &&
                      <div>
                        {user.media.length} <FaImage />
                      </div>
                    }
                  </> 
                  : user.fullname
                }
              </small>
          </div>
        </Link>
    </div>
  )
}

export default UserCard