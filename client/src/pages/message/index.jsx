import React from 'react'
import LeftSide from '../../components/Message/LeftSide'
import {FaFacebookMessenger} from 'react-icons/fa'

const Message = () => {

  return (
    <div className="message">
      <div className="col-md-4 border px-0">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0 right_mess">
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          
          <FaFacebookMessenger className="text-primary" style={{fontSize: '5rem'}}/>
          <h4>Chat-box Messenger</h4>
        </div>
      </div>
    </div>
  )
}

export default Message