import React from 'react'
import {FaCheckCircle, FaTimes} from "react-icons/fa"

const Toast = ({msg, handleShow, bgColor}) => {
    return (
      <div id="toast" onAuxClick={handleShow}>
        <div className={`toast show toast--${bgColor}`}>
            <div className="toast__icon">
              <FaCheckCircle />
            </div>
            <div className="toast__body">
              <h3 className="toast__title">{msg.title}</h3>
              <p className="toast__msg">{msg.body}</p>
            </div>
            <div className="toast__close" onClick={handleShow}>
              <FaTimes />
            </div>
        </div>
      </div>
      // <div className={`toast show position-fixed text-light ${bgColor}`}
      // style={{top: "5px", right: "5px", width: "250px", minWidth: "200px", zIndex: 50}}>
      //     <div className={`toast-header text-light ${bgColor}`}>
      //           <strong className="text-light me-auto" >{msg.title}</strong>
      //           <button className="ml-2 mb-1 btn-close"
      //           data-dismiss="toast" style={{outline: 'no'}}
      //           onClick={handleShow}>
                
      //           </button>
      //     </div>
      //     <div className='toast-body'>
      //         {msg.body}
      //     </div>
      // </div>
    )
  }

export default Toast          