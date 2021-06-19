import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

// components
import Posts from '../../components/Posts'

// modal components
import Modal from '../../components/Modal'
import CreatePost from '../../components/modals/CreatePost'
import UpdateProfileImage from '../../components/modals/UpdateProfileImage'

// context
import socialContext from '../../utils/socialContext'

const index = ({ id }) => {

  const { users, user_id } = useContext(socialContext)

  const [profile, setProfile] = useState()

  const [modal, setModal] = useState()
  const [post, setPost] = useState('')

  const router = useRouter();

  const getUser = async () => {

    // check if user has already been obtained
    
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "get user",
      profile_id: id
    }, { withCredentials: true });
    
    if (res.data.success) {
      users[id] = res.data.user
      setProfile(res.data.user)
    }
    else router.push("/")
  }

  useEffect(() => {
    if (users[id]) setProfile(users[id])
    else getUser();
  }, [])

  return (
    <div style={{textAlign: 'center', paddingTop: '20px'}}>

      {!profile && <>loading</>}
      {profile && <>
        <div>My Profile: {user_id === id ? "True" : "False"}</div>
        <div>User: {profile.firstName} {profile.lastName}</div>

        {user_id === id && <button onClick={() => {setModal('update profile image')}}>Update Image</button>}
        {modal === 'update profile image' && <Modal setModal={setModal} exitBtn={false}>
          <UpdateProfileImage />
        </Modal>}

        {/* Post container */}
        <div>{post}</div><button onClick={() => {setModal('create post')}}>Create Post</button>

        {modal === 'create post' && <Modal setModal={setModal}>
          <CreatePost profile_id={id} post={post} setPost={setPost} />
        </Modal>}

        <div className="posts-container">
          {/* posts="profile || global || news" */}
          <Posts from={"profile"} profile_id={id} />
        </div>

      </>}
      
    </div>
  )
}


export default index;

export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id }
  }
}
