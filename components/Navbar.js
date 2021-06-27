import { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'

// components
import Modal from './Modal'
import Settings from './modals/Settings'

// context
import socialContext from '../utils/socialContext'

const Navbar = () => {

  const { user_id, setUser_id, mobile } = useContext(socialContext)

  const [modal, setModal] = useState()

  const homeRef = useRef()
  const feedRef = useRef()
  const newsRef = useRef()
  const searchRef = useRef()
  const messageRef = useRef()
  const notificationRef = useRef()
  const settingsRef = useRef()

  const startTouch = div => {
    div.classList.add("mobile_hover")
  }

  const endTouch = div => {
    div.classList.remove("mobile_hover")
  }

  const openSettings = () => {
    setModal("settings")
  }

  return !user_id ? <></> : <>
    {/* cut this down */}
    <style jsx global>{`
      body {
        overflow-y: scroll;
      }

      nav {
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        position: fixed;
        z-index: 10;
        bottom: 0;
        left: calc(50%);
        transform: translateX(calc(-50% - 8.5px));
        height: 65px;
        width: 450px;
        background-image: linear-gradient(to right, #ffa2a29a 0%, #bbc1bf9a 19%, #57c6e19a 42%, #b49fda9a 79%, #7ac5d89a 100%);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 20px;
        font-size: x-large;
      }

      nav div {
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color .025s ease-in;
        height: 50px;
        width: 50px;
        
      }

      .web div:hover {
        background-color: rgb(43, 228, 114);
        cursor: pointer;
      }
      .mobile_hover {
        background-color: rgb(43, 228, 114);
      }

      @media screen and (max-width: 575px) {
        nav {
          border-radius: 0;
          padding: 0;
          left: 0;
          transform: translateX(0);
          width: 100%; 
          height: 8.5vw;
          font-size: 2.6vw;
        }
        .web {
          width: calc(100% - 17px);
        }
        nav div {
          height: 100%;
          border-radius: 0;
          flex: 1;
          color: black;
          background-color: inherit;
          border-right: solid 1px rgba(0, 0, 0, 0.1);
          transition: background-color .05s ease-in;
        }
      }
      @media screen and (max-width: 525px) {
        nav {
          height: 45px;
          font-size: small;
        }
      }

    `}</style>

    <nav className={`${!mobile ? "web" : "mobile"} fade-in no-select`}>
      <Link href={`/redirect/${user_id}`}>
        <div
          ref={homeRef}
          onTouchStart={() => startTouch(homeRef.current)}
          onTouchEnd={() => endTouch(homeRef.current)}>
          <i className="fas fa-home" />
        </div>
      </Link>
      <Link href="/redirect/feed">
        <div
          ref={feedRef}
          onTouchStart={() => startTouch(feedRef.current)}
          onTouchEnd={() => endTouch(feedRef.current)}
        >
          <i className="fas fa-globe-americas" />
        </div>
      </Link>
      <Link href="/redirect/news">
        <div
          ref={newsRef}
          onTouchStart={() => startTouch(newsRef.current)}
          onTouchEnd={() => endTouch(newsRef.current)}
        >
          <i className="far fa-newspaper" />
        </div>
      </Link>
      <div
        ref={searchRef}
        onTouchStart={() => startTouch(searchRef.current)}
        onTouchEnd={() => endTouch(searchRef.current)}
      >
        <i className="fas fa-search" />
      </div>
      <div
        ref={messageRef}
        onTouchStart={() => startTouch(messageRef.current)}
        onTouchEnd={() => endTouch(messageRef.current)}
      >
        <i className="far fa-comment" />
      </div>
      <div
        ref={notificationRef}
        onTouchStart={() => startTouch(notificationRef.current)}
        onTouchEnd={() => endTouch(notificationRef.current)}
      >
        <i className="far fa-bell" />
      </div>
      <div
        ref={settingsRef}
        onTouchStart={() => startTouch(settingsRef.current)}
        onTouchEnd={() => endTouch(settingsRef.current)}
        onClick={openSettings}
      >
        <i className="fas fa-cog" />
      </div>
    </nav>


    {/* Modals */}

    {/* Search */}
    {/* ****** */}
    {/* Search */}

    {/* Message */}
    {/* ******* */}
    {/* Message */}

    {/* Notifications */}
    {/* ************* */}
    {/* Notifications */}

    {/* Settings */}
    {modal === "settings" && <Modal setModal={setModal}>
      <Settings user_id={user_id} setUser_id={setUser_id} setModal={setModal} />
    </Modal>}
    {/* Settings */}

    {/* Modals */}
  </>
}

export default Navbar
