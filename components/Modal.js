import { useState } from 'react'
import { createPortal } from 'react-dom'

// components
import ExitButton from './ExitButton'

const Modal = ({ children, setModal=null, exitBtn=true, size='mini' }) => {

  const [__body] = useState(document.body)
  const [__next] = useState(document.getElementById("__next"))

  const exit = () => {
    setModal(null)
  }

  return createPortal(
    <>
    <style jsx>{`
      .modal-master-container {
        z-index: 100;
        background-color: #0005;
        position: fixed;
        height: 100vh;
        width: 100%;
        top: 0;
      }
      .modal-background-container {
        position: absolute;
        height: 100%;
        width: 100%;
      }
      .modal-container {
        position: relative;
        min-height: 325px;
        max-height: 450px;
        width: 500px;
        border-radius: 20px;
        background-color: #FFF8;
        backdrop-filter: blur(10px);
        // display: flex;
        // flex-direction: column;
      }
      
    `}</style>
      <div className="modal-master-container f-center box-shadow modal-scroll">
        {setModal ? <>
          <div className="modal-background-container" onClick={() => {setModal(null)}} />
        </> : <>
        <div className="modal-background-container" />
        </>}
        <div className="modal-container fade-in">
          <ExitButton visable={exitBtn} exit={exit} size={25} padding={10} />
          {children}
        </div>
      </div>
    </>, __next
  )
}

export default Modal
