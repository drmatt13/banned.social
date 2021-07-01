import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'

// components
import Loading from '../Loading'

// modal components
import SetAvatar from './SetAvatar'
// import uploadImage from './UploadImage'

// context
import socialContext from '../../utils/socialContext'

const UpdateProfileImage = () => {

  const { users, user_id, router } = useContext(socialContext)

  const [loading, setLoading] = useState(false)
  const [menuState, setMenuState] = useState(0)
  // FIX default avatar ----------------
  const [selection, setSelection] = useState(1)
  // Add later, Upload image
  const [imageUrl, setImageUrl] = useState()

  const avatarRef = useRef()
  const uploadRef = useRef()

  useEffect(() => {
    setMenuState(1)
  }, [])

  useEffect(() => {
    if (loading) processUpdate()
  }, [loading])

  const processUpdate = async () => {
    switch (menuState) {
      case 1:
        // update profileAvatar
        try {
          const res = await axios.post(`/api/eventbus`, {
            'service': "update avatar",
            'profileAvatar': selection
          }, { withCredentials: true })

          if (res.data.success) {
            users[user_id] = res.data.user
            router.push(`/redirect/${user_id}`)
          }
        } catch (error) {
          console.log(error)
        }

        break;

      case 2:
        // process upload image modal
        break;

      default:
        setLoading(false)
        break;
    }
  }

  const toggleMenu = e => {
    if (+e.target.getAttribute("value") === 1) {
      avatarRef.current.classList.add("selected");
      uploadRef.current.classList.remove("selected");
      setMenuState(1);
    } else {
      avatarRef.current.classList.remove("selected");
      uploadRef.current.classList.add("selected");

      setMenuState(2);
    }
  }

  return <>
    <style jsx>{`
      .master-container {
        // height: 450px;
        border-radius: 20px;
        flex-direction: column;
        display: flex;
      }
      
      .header {
        font-size: large;
        margin-bottom: 10px;
      }

      @media only screen and (max-width: 525px) {
        .header {
          font-size: 3.4vw;
        }
      }

      
      .header div {
        transition: background-color 0.075s ease-in;
        border-bottom: 1px solid rgba(0, 0, 0, 0.10);
        padding: 15px;
      }
      
      .header div:first-of-type {
        border-top-left-radius: 20px;
        border-right: 1px solid rgba(0, 0, 0, 0.10);
      }
      
      .header div:last-of-type {
        border-top-right-radius: 20px;
      }

      .selected {
        background-color: rgb(64, 161, 251);
        color: white
      }
    `}</style>
    {loading && <Loading />}
    {!loading && <div className="master-container f">
      <div className="header f no-select">
        <div ref={avatarRef} onClick={toggleMenu} value="1" className="f-center f-1 pointer selected">Pick Avatar</div>
        <div ref={uploadRef} onClick={toggleMenu} value="2" className="f-center f-1 pointer">Upload Image</div>
      </div>
      <>
        {+menuState === 1 && <div className="f f-1 fade-in">
          <SetAvatar selection={selection} setSelection={setSelection} loading={loading} setLoading={setLoading} />
        </div>}
        {+menuState === 2 && <div className="fade-in f-center">
          Coming Soon
        </div>}
      </>
    </div>}
  </>
}

export default UpdateProfileImage
