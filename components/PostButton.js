import { useState, useEffect, useContext } from 'react'

// components
import MiniUserImage from './MiniUserImage'

// modal components
import Modal from './Modal'
import CreatePost from './modals/CreatePost'

// context
import socialContext from '../utils/socialContext'

const PostButton = ({ profile_id, posts, setPosts }) => {

  const { user_id } = useContext(socialContext)

  const [post, setPost] = useState('')
  const [modal, setModal] = useState()
  const [metadata, setMetadata] = useState()

  useEffect(() => {
    // console.log(post);
  }, [post])

  return <>
    <style jsx>{`
      .post-button-container {
        background-color: rgb(51, 51, 54);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        width: 100%;
        padding: 25px 15px;
        border-radius: 10px;
        align-items: center;
      }
      .post-button {
        height: 50px;
        color: #DDD;
        background-color: rgb(80, 80, 80);
        min-height: 10px;
        border-radius: 25px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border: 1px solid rgba(90, 90, 90, 0.3);
        align-items: center;
        padding-left: 15px;
        transition: background-color 0.1s ease-in;
        overflow-x: hidden;
      }
      .post-button:hover {
        background-color: rgb(100, 100, 100);
      }
    `}</style>

    <div className="post-button-container f fade-in">
      <MiniUserImage profile_id={user_id} />
      <div className="post-button f f-1 pointer no-select" onClick={() => { setModal('create post') }}>
        {post.replace(/\r?\n|\r/g, " ") || "CreatePost"}
      </div>
    </div>

    {modal === 'create post' && <Modal setModal={setModal}>
      <CreatePost
        profile_id={profile_id}
        post={post}
        setPost={setPost}
        posts={posts}
        setPosts={setPosts}
        metadata={metadata}
        setMetadata={setMetadata}
        setModal={setModal}
      />
    </Modal>}
  </>
}

export default PostButton
