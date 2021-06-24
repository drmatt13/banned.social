import { useContext, useRef } from 'react'

// context
import socialContext from '../utils/socialContext'

const ExitButton = ({ visable=true, exit, size, padding, solid=false }) => {

  const { mobile } = useContext(socialContext)

  const exitRef = useRef()

  const addHighlight = (div) => div.classList.add("mobile-exit-btn-highlight")
  const removeHighlight = (div) => div.classList.remove("mobile-exit-btn-highlight")

  return !visable ? <></> : <>
    <style jsx>{`
      .exit-btn {
        position: absolute;
        top: ${padding}px;
        right: ${padding}px;
        height: ${size}px;
        width: ${size}px;
        font-size: small;

        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        transition: background-color 0.075s ease-in;
      }
      .web-exit-btn-highlight:hover {
        cursor: pointer;
        background-color: rgba(255, 99, 71, 0.85);
      }
      .mobile-exit-btn-highlight {
        background-color: rgba(255, 99, 71, 0.85);
      }
      .solid {
        background-color: rgba(255, 255, 255, 1);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 1px, rgb(25, 25, 25) 0px 0px 0px 2px;
      }
      .solid-highlight:hover {
        background-color: rgba(255, 99, 71);
      }
    `}</style>
    <div 
      onClick={exit}
      ref={exitRef}
      className={`
        exit-btn 
        f-center 
        ${!mobile ? "web-exit-btn-highlight" : ""} 
        ${solid ? "solid" : ""}
        ${!mobile && solid ? "solid-highlight" : ""}
      `}
      onTouchStart={() => addHighlight(exitRef.current)} 
      onTouchEnd={() => removeHighlight(exitRef.current)}
    >
      <i className="fas fa-times" />
    </div>
  </>
}

export default ExitButton
