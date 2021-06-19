import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import axios from 'axios'

// components
import PostButton from '../../components/PostButton'
import Posts from '../../components/Posts'

// modal components
import Modal from '../../components/Modal'
import UpdateProfileImage from '../../components/modals/UpdateProfileImage'

// context
import socialContext from '../../utils/socialContext'

const index = ({ id, router }) => {

  const { users, user_id } = useContext(socialContext)
  const [profile, setProfile] = useState()
  const [modal, setModal] = useState()

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

  return <>

    <div style={{
      paddingTop: '25px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      <style jsx>{`
        .profile-image {
          border-radius: 50%;
          margin-bottom: 10px;
        }

        .posts-container {
          width: 600px;
        }

        .temp-color {
          color: #DDD;
        }
      `}</style>
      
      <div className="profile-image">
        <Image className="avatar-image blue-border" src={`/images/avatars/${users[id].profileAvatar}.jpg`} height={250} width={250} />
      </div>

      {!profile && <>loading</>}
      {profile && <>
        <div className="temp-color">My Profile: {user_id === id ? "True" : "False"}</div>
        <div className="temp-color">User: {profile.firstName} {profile.lastName}</div>

        <br />

        {user_id === id && <button onClick={() => {setModal('update profile image')}}>Update Image</button>}
        {modal === 'update profile image' && <Modal setModal={setModal} exitBtn={false}>
          <UpdateProfileImage />
        </Modal>}

        <br />

      

        <div className="posts-container">          
          <PostButton profile_id={id} />

          {/* posts="profile || global || news" */}
          <Posts from={"profile"} profile_id={id} />
        </div>

      </>}
      
    </div>
  </>
}


export default index;

export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id }
  }
}
