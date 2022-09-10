import React from 'react'

const Loading = () => {
  return (
    <div className="position-fixed w-100 h-100 text-center loading"
    style={{background:"#0008", color:"white", top: 0, left: 0, zIndex: 50}}>
        <div className='load' style={{width: "205px", height: "250px"}}>
            <div className="circle"></div>
            <div className="circle-small"></div>
            <div className="circle-big"></div>
            <div className="circle-inner-inner"></div>
            <div className="circle-inner"></div>
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default Loading