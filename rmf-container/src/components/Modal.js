import React from 'react'
import './Modal.css'

const Modal = ({ close, children }) => {
  return (
    <div className="modal-box">
      <div className="modal-content">
        <span onClick={() => close()} className="close">&times;</span>
        {children}
      </div>
    </div>
  )
}

export default Modal;