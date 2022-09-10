import React from 'react'
import LeftSide from '../../components/Message/LeftSide'
import RightSide from '../../components/Message/RightSide'

const Conversation = () => {

  return (
    <div className="message">
      <div className="col-md-4 border px-0 left_mess">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0">
        <RightSide />
      </div>
    </div>
  )
}

export default Conversation