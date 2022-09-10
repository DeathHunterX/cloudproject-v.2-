import React from 'react'
import Education from './Education/Education'
import Experience from './Experience/Experience'

const Posts = ({id, auth}) => {

  return (
    <div>
      <Experience id={id} auth={auth} />
      <Education id={id} auth={auth} />
      {/* <p>Review</p> */}
    </div>
  )
}

export default Posts