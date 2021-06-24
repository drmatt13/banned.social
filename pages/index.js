import { useState, useEffect, useContext } from 'react'
import Head from 'next/head'

// components
import PostButton from '../components/PostButton'
import Post from '../components/Post'
import Posts from '../components/Posts'

// context
import socialContext from '../utils/socialContext'

const index = () => {

  const { users, user_id } = useContext(socialContext)

  const [modal, setModal] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log(users);
  }, [])

  return <>

    <Head>
      <title>Banned.Social | Home</title>
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
          margin-top: 50px;
          margin-bottom: 250px;
          width: 600px;
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


      </div>


    </div>
  </>
}

export default index