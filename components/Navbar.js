import { useState, useContext } from 'react'
import Link from 'next/link'

// components
import Modal from './Modal'
import Settings from './modals/Settings'

// context
import socialContext from '../utils/socialContext'

const Navbar = () => {

  const { user_id, setUser_id, mobile } = useContext(socialContext)

  const [modal, setModal] = useState()

  const openSettings = () => {
    setModal("settings")
  }

  return <>
    {user_id && <>

      {/* cut this down */}
      <style jsx global>{`
        body {
          overflow-y: scroll;
        }
        nav {
          position: sticky;
          z-index: 10;
          top: 0;
          height: 5vw;
          min-height: 50px;
          max-height: 75px;
          width: 100%;
          background-image: linear-gradient(to right, #ffa2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        nav div {
          border-radius: 50%;
          background-color: #fff6;
          color: black;
          height: 2.5vw;
          min-height: 40px;
          max-height: 60px;
          width: 2.5vw;
          min-width: 40px;
          max-width: 60px;
          margin: 0 1.5vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        nav div:hover {
          background-color: rgba(68, 204, 68, 0.726);
          cursor: pointer;
        }
      `}</style>

      {/* Desktop Nav */}
      {/* {!mobile && <>
        <nav className="fade-in">
          <Link href={`/redirect/${user_id}`}>Profile</Link>
          <Link href="/redirect/feed">Feed</Link>
          <Link href="/redirect/news">News</Link>
          <div>Messages</div>
          <div>Notifications</div>
          <div onClick={openSettings}>Settings</div>
        </nav>
      </>} */}

      {/* Mobile Nav */}
      {true && <>
        <nav className="fade-in">
          <Link href={`/redirect/${user_id}`}><div><i className="fas fa-home"></i></div></Link>
          <Link href="/redirect/feed"><div><i className="fas fa-globe-americas"></i></div></Link>
          <Link href="/redirect/news"><div><i className="far fa-newspaper"></i></div></Link>
          <div><i className="fas fa-search"></i></div>
          <div><i className="far fa-comment"></i></div>
          <div><i className="far fa-bell"></i></div>
          <div onClick={openSettings}><i className="fas fa-cog"></i></div>
        </nav>
      </>}


      {modal === "settings" && <Modal setModal={setModal}>
        <Settings user_id={user_id} setUser_id={setUser_id} setModal={setModal} />
      </Modal>}
    </>}
  </>
}

export default Navbar
