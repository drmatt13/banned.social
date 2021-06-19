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
        background-color: #0008;
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
        min-height: 350px;
        max-height: 450px;
        width: 500px;
        border-radius: 20px;
        background-color: #FFFA;
        backdrop-filter: blur(10px);
      }
    `}</style>
      <div className="modal-master-container flex-center box-shadow">
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
