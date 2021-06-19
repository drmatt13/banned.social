import { useState, useEffect, useContext } from 'react'

// components
import PostButton from '../components/PostButton'
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
          width: 600px;
        }
      `}</style>
      <div className="posts-container">

        <PostButton profile_id={user_id} />

        {/* posts="profile || friends || global || news" */}
        <Posts from={"global"} profile={user_id} />


      </div>


    </div>
  </>
}

export default index