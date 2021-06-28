import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'

import axios from 'axios'

// components
import PostButton from '../components/PostButton'
import Post from '../components/Post'
import Posts from '../components/Posts'
import Loading from '../components/Loading'

// context
import socialContext from '../utils/socialContext'

const index = () => {

  const { users, user_id, mobile } = useContext(socialContext)

  const [modal, setModal] = useState(null)
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState()

  const getUser = async () => {

    // check if user has already been obtained

    const res = await axios.post(`/api/eventbus`, {
      service: "get user",
      profile_id: user_id
    }, { withCredentials: true });

    if (res.data.success) {
      users[user_id] = res.data.user
      setProfile(res.data.user)
    }
    else router.push("/")
  }

  useEffect(() => {
    console.log(users);
    if (users[user_id]) setProfile(users[user_id])
    else getUser();
  }, [])

  return !profile ? <>
    <Loading />
  </> : <>

    <Head>
      <title>Banned.Social | Home</title>
      <meta property="og:title" content="Banned.Social" />
      <meta property="og:description" content="The most banned social media platform on earth." />
      <meta property="og:image" content="/images/banned.jpg" />
    </Head>

    <div style={{
      paddingTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      {/* Feed Options */}
      {/* friends, public, distance */}

      {/* Post container */}




      <style jsx>{`
        .posts-container {
          margin-top: ${!mobile ? "25" : "0"}px;
          width: 95%;
          max-width: 600px;
        }
      `}</style>
      <div className="posts-container">

        <PostButton profile_id={user_id} posts={posts} setPosts={setPosts} />

        {/* postbutton posts up top */}
        {posts && posts.map((post, i) => (
          <Post
            key={i}
            sender_id={post.user_id}
            reciever_id={post.profile_id}
            post={post.post}
            url={post.url}
          />
        ))}

        {/* posts="profile || friends || global || news" */}
        <Posts from={"global"} profile={user_id} />

        <div className="loading-container" style={{
          height: '200px',
          width: '100%',
          position: 'relative',
          marginBottom: '50px'
        }}>
          <Loading />
        </div>

      </div>


    </div>
  </>
}

export default index