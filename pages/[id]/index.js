import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'

import axios from 'axios'

// components
import PostButton from '../../components/PostButton'
import Post from '../../components/Post'
import Posts from '../../components/Posts'
import Loading from '../../components/Loading'

// modal components
import Modal from '../../components/Modal'
import UpdateProfileImage from '../../components/modals/UpdateProfileImage'

// context
import socialContext from '../../utils/socialContext'

const index = ({ id, router, mobile }) => {

  const { users, user_id } = useContext(socialContext)
  const [profile, setProfile] = useState()
  const [modal, setModal] = useState()
  const [posts, setPosts] = useState([])

  const getUser = async () => {

    // check if user has already been obtained

    const res = await axios.post(`/api/eventbus`, {
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

  useEffect(() => {
    console.log(posts);
  }, [posts])

  return <>

    <style jsx>{`

      .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .profile-image {
        max-height: 250px;
        width: 30vw;
        max-width: 250px;
        border-radius: 50%;
        margin-top: 40px;
        margin-bottom: 25px;
      }

      img {
        height: 100%;
        width: 100%;
        box-shadow: rgb(25, 144, 255) 0px 0px 0px 4px;
        border-radius: 50%;
      }

      .posts-container {
        width: 95%;
        max-width: 600px;
      }

      .profile-header {
        color: #DDD;
        font-family: 'Lato', sans-serif;
        font-size: 50px;
        font-weight: bold;
      }
    `}</style>

    <div className="profile-container">

      {!profile && <>
        <Head>
          <title>Banned.Social | loading</title>
        </Head>
        <Loading />
      </>}
      {profile && <>

        <Head>
          <title>Banned.Social | {profile.firstName} {profile.lastName}</title>
        </Head>


        <div className="profile-image fade-in">
          <img src={`/images/avatars/${users[id].profileAvatar}.jpg`} />
        </div>


        <div className="profile-header fade-in">{profile.firstName} {profile.lastName}</div>

        <br />

        {user_id === id && <button onClick={() => { setModal('update profile image') }}>Update Image</button>}
        {modal === 'update profile image' && <Modal setModal={setModal} exitBtn={false}>
          <UpdateProfileImage />
        </Modal>}

        <br />



        <div className="posts-container">
          <PostButton profile_id={id} posts={posts} setPosts={setPosts} />

          {/* postbutton posts up top */}
          {posts && posts.map(post => (
            <Post
              key={post.post + post.url}
              sender_id={post.user_id}
              reciever_id={post.profile_id}
              post={post.post}
              url={post.url}
            />
          ))}

          {/* Next fetch posts */}

          {/* posts="profile || global || news" */}
          <Posts from={"profile"} profile_id={id} />

          <div className="loading-container" style={{
            height: '200px',
            width: '100%',
            position: 'relative'
          }}>
            <Loading />
          </div>

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
