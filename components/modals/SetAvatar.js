import { useState, useEffect, useRef } from 'react'
// import Image from 'next/image'

const images = []
for (let i = 1; i <= 31; i++) images.push(i)

const SetAvatar = ({ selection, setSelection, loading, setLoading }) => {


  const gridRef = useRef()

  useEffect(() => {
    gridRef.current.children[selection - 1].classList.add("selected");
  }, [])

  const toggleSelection = e => {
    const select = +e.target.getAttribute("alt")
    console.log(select);
    gridRef.current.children[select - 1].classList.add("selected")
    gridRef.current.children[selection - 1].classList.remove("selected")
    setSelection(select)
  }

  const updateAvatar = () => {
    setLoading(true)
  }

  return <>
    <style jsx>{`
      .master-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 385px;
      }

      .avatar-container {
        overflow-y: scroll;
        // width: 100%;
        flex: 1;

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding-top: 5px;
        // padding-bottom: 5px;
        padding-right: 5px;
        padding-left: 25px;
        margin-right: 10px;
      }
      .avatar {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        height: 125px;
        width: 125px;
        display: block;
        text-align: center;
        margin: 10px;
        transition: box-shadow .075s ease-in;
      }
      .selected {
        box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px !important;
      }
      .avatar:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .avatar img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
      .SOCIAL-avatar-selection-submit {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        height: 40px;
        width: calc(100% - 20px);
        background-color: rgb(25, 144, 255);
        color: #FFF;
        border-radius: 20px;
        font-size: large;
      }
      .SOCIAL-avatar-selection-submit:hover {
        background-color: rgb(64, 161, 251);
        cursor: pointer;
      }
    `}</style>
    <div className="master-container">
      <div className="avatar-container" ref={gridRef}>
        {images.map(image => (
          <div key={image} className="avatar pointer no-select" onClick={toggleSelection}>
            <img src={`/images/avatars/${image}.jpg`} alt={`${image}`} draggable={false} />
          </div>
        ))}
      </div>
      <div onClick={updateAvatar} className="SOCIAL-avatar-selection-submit no-select">Submit</div>
    </div>

  </>

}

export default SetAvatar
