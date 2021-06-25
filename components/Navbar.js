import { useState, useContext } from 'react'
import Link from 'next/link'

// components
import Modal from './Modal'
import Settings from './modals/Settings'

// context
import socialContext from '../utils/socialContext'

const Navbar = () => {

  const { user_id, setUser_id } = useContext(socialContext)

  const [modal, setModal] = useState()

  const openSettings = () => {
    setModal("settings")
  }

  return <>
    {user_id && <nav className="fade-in">
      <style jsx global>{`
        body {
          overflow-y: scroll;
        }
        nav {
          position: sticky;
          z-index: 10;
          top: 0;
          height: 50px;
          width: 100%;
          background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
          color: white;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
      <Link href={`/redirect/${user_id}`}>Profile</Link>
      <Link href="/redirect/feed">Feed</Link>
      <Link href="/redirect/news">News</Link>
      <div>Messages</div>
      <div>Notifications</div>
      <div onClick={openSettings}>Settings</div>
    </nav>}
    {/* {!user_id && <nav className="fade-in">
      <Link href="/login">Login</Link>
      <Link href="/register">Sign up</Link>
    </nav>} */}
    {modal === "settings" && <Modal setModal={setModal}>
      <Settings user_id={user_id} setUser_id={setUser_id} setModal={setModal} />
    </Modal>}
  </>
}

export default Navbar
