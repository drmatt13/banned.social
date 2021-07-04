import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// components
import Post from '../../components/Post'

// context
import socialContext from '../../utils/socialContext'

const index = ({ id, mobile }) => {

  const { users } = useContext(socialContext)

  const [post, setPost] = useState(null)

  const getPost = async () => {
    const res = await axios.post(`/api/eventbus`, {
      service: "get post",
      post_id: id
    })
    if (res.data.success) {
      setPost(res.data.post)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return <>
    <style jsx>{`
      .posts-container {
        margin-top: ${!mobile ? "25" : "0"}px;
        width: 95%;
        max-width: 600px;
      }
    `}</style>
    {post && <div style={{
      paddingTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="posts-container">
        <Post 
          sender_id={post.user_id}
          reciever_id={post.profile_id}
          post={post.post}
          url={post.url}
          single={true}
        />
      </div>
    </div>}
  </>
}

export default index

export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id }
  }
}