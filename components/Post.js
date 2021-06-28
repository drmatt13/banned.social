import { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'

// components
import PostHeader from './PostHeader'
import Loading from './Loading'

// modals
import Modal from './Modal'
import Settings from './modals/Settings'

// context
import socialContext from '../utils/socialContext'

const Post = ({ sender_id, reciever_id, post, url }) => {

  const { user_id, setUser_id, mobile } = useContext(socialContext)

  const [modal, setModal] = useState()
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState()

  const likeRef = useRef()
  const commentRef = useRef()
  const shareRef = useRef()

  const openSettings = () => {
    setModal("settings")
  }

  useEffect(() => {
    if (url) getMetadata()
  }, [])

  const getMetadata = async () => {
    setLoading(true)

    const res = await axios.post(`/api/eventbus`, {
      service: "get og",
      url
    }, { withCredentials: true })

    console.log(res.data);

    if (res.data.success) setMetadata(res.data.ogMetadata)

    setLoading(false)
  }

  const openOg = () => {
    window.open(metadata.ogUrl, '_blank').focus();
  }

  const startTouch = div => {
    div.classList.add("mobile_hover")
  }

  const endTouch = div => {
    div.classList.remove("mobile_hover")
  }

  return <>
    <style jsx>{`
      .post-container {
        color: #DDD;
        background-color: rgb(51, 51, 54);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin-top: 20px;
        padding-top: 15px;
        border-radius: 10px;
        
      }
      .post-contents {
        padding: 15px;
        font-size: large;
        word-wrap: break-word;
      }
      hr {
        margin-top: 0;
        margin-bottom: 0;
        width: 95%;
        height: 1px;
        border-width: 0;
        color: #555C;
        background-color: #555C;
      }
      .post-og-loading-container {
        height: 150px;
        width: 100%;
        position: relative;
      }

      .post-og-container {
        width: 100%;
      }
      .post-og-container:hover {
        cursor: pointer;
      }
      .post-og-image {
        width: 100%;
        
      }
      .post-og-image img {
        display: block;
        width: 100%;
        max-height: 350px;
        object-fit: cover;
      }
      .post-og-info {
        min-height: 70px;
        background-color: #555C;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .post-og-info > div {
        padding-bottom: 2.5px;
      }
      .post-og-sitename {
        font-size: small;
        color: #FFF7;
      }
      .post-og-title {
        color: #FFFB;
      }


      .post-footer {
        padding: 5px 0;
        justify-content: space-evenly;
        align-items: center;
        height: 60px;
        margin: 2.5px 10px 5px 5px;

        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      @media only screen and (max-width: 600px) {
        .post-footer {
          height: 10vw;
          font-size: 2.5vw;
        }
      }


      .post-footer div {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2.5px;
        transition: background-color 0.075s ease-in;
      }
      
      .web-footer div:hover {
        cursor: pointer;
        background-color: rgb(25, 144, 255, 0.75);
      }

      .mobile_hover {
        background-color: rgb(25, 144, 255, 0.75);
      }
    `}</style>
    <div className="post-container fade-in">
      <div style={{ position: 'relative' }}>

        <PostHeader sender_id={sender_id} reciever_id={reciever_id} />

        {/* EDIT POST */}
        {user_id === sender_id && <i onClick={openSettings} className="far fa-edit pointer" style={{ position: 'absolute', top: '0', right: '15px' }} />}

        {/* Edit post modal --- temp placeholder */}
        {modal === "settings" && <Modal setModal={setModal}>
          <Settings user_id={user_id} setUser_id={setUser_id} setModal={setModal} />
        </Modal>}

      </div>

      <div className="post-contents">
        {post}
      </div>

      {!metadata && <hr />}
      {(loading && !metadata) && <>
        <div className="post-og-loading-container">
          <Loading />
        </div>
      </>}
      {metadata && <>
        <div className="post-og-container no-select" onClick={openOg}>
          {metadata.ogImage && <div className="post-og-image">
            <img src={metadata.ogImage.url} alt="og-image" />
          </div>}
          <div className="post-og-info">
            <div className="post-og-sitename">{metadata.ogSiteName}</div>
            <div className="post-og-title">{metadata.ogTitle}</div>
          </div>
        </div>
      </>}

      {/* lIKE, COMMENT SHARE BTNS */}
      <div className={`${!mobile ? "web-footer" : ""} post-footer f no-select`}>
        <div
          ref={likeRef}
          onTouchStart={() => startTouch(likeRef.current)}
          onTouchEnd={() => endTouch(likeRef.current)}
        >
          <i className="far fa-thumbs-up" />⠀Like</div>
        <div
          ref={commentRef}
          onTouchStart={() => startTouch(commentRef.current)}
          onTouchEnd={() => endTouch(commentRef.current)}
        >
          <i className="far fa-comment" />⠀Comment</div>
        <div
          ref={shareRef}
          onTouchStart={() => startTouch(shareRef.current)}
          onTouchEnd={() => endTouch(shareRef.current)}
        >
          <i className="fas fa-share" />⠀Share</div>
      </div>

    </div>
  </>
}

export default Post
