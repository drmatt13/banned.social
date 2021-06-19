import { useState, useEffect, useContext } from 'react'

// components
import Modal from '../components/Modal'
import CreatePost from '../components/modals/CreatePost'
import Posts from '../components/Posts'

// context
import socialContext from '../utils/socialContext'

const index = () => {

  const { users, user_id } = useContext(socialContext)

  const [modal, setModal] = useState(null)
  const [post, setPost] = useState('')

  useEffect(() => {
    console.log(users);
  }, [])

  return <>
    <div style={{textAlign: 'center', paddingTop: '20px'}}>

      {/* Feed Options */}
      {/* friends, public, distance */}

      {/* Post container */}
      <div>{post}</div><button onClick={() => {setModal(true)}}>Create Post</button>

      {modal && <Modal setModal={setModal}>
        <CreatePost profile_id={user_id} post={post} setPost={setPost} />
      </Modal>}



      <div className="post-container">
        {/* posts="profile || friends || global || news" */}


        <Posts from={"global"} profile={user_id} />


      </div>


    </div>
  </>
}

export default index