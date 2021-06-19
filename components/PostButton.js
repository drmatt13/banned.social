import { useState, useContext } from 'react'

// components
import MiniUserImage from './MiniUserImage'

// modal components
import Modal from './Modal'
import CreatePost from './modals/CreatePost'

// context
import socialContext from '../utils/socialContext'

const PostButton = ({ profile_id }) => {

  const { user_id } = useContext(socialContext)

  const [post, setPost] = useState('')
  const [modal, setModal] = useState()

  return <>
    <style jsx>{`
      .master-container {
        background-color: rgb(51, 51, 54);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        width: 100%;
        padding: 25px 15px;
        border-radius: 10px;
      }
      .post-button {
        color: #DDD;
        background-color: rgb(80, 80, 80);
        min-height: 10px;
        border-radius: 25px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border: 1px solid rgba(90, 90, 90, 0.3);
        align-items: center;
        padding-left: 15px;
        transition: background-color 0.1s ease-in;
      }
      .post-button:hover {
        background-color: rgb(100, 100, 100);
      }
    `}</style>

    <div className="master-container f fade-in">
      <MiniUserImage profile_id={user_id} />
      <div className="post-button f f-1 pointer no-select" onClick={() => {setModal('create post')}}>{post || "CreatePost"}</div>
    </div>

    {modal === 'create post' && <Modal setModal={setModal}>
      <CreatePost profile_id={profile_id} post={post} setPost={setPost} />
    </Modal>}
  </>
}

export default PostButton
