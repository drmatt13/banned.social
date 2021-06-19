import { useContext } from 'react'
import Link from 'next/link'

// context
import socialContext from '../utils/socialContext'

const Post = ({ sender_id, reciever_id, post }) => {

  const { users, user_id } = useContext(socialContext)

  const comment = e => {
    e.preventDefault()
  } 

  return <>
    <div className="post" style={{backgroundColor: '#0004', marginTop: '20px'}}>
      
      <div style={{position: 'relative'}}>

        <div style={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >
          <Link href={`/redirect/${sender_id}`}>
            <a>{users[sender_id].firstName} {users[sender_id].lastName}</a>
          </Link> 
          <div style={{margin: '0 10px'}}>-></div>
          <Link href={`/redirect/${reciever_id}`}>
          <a>{users[reciever_id].firstName} {users[reciever_id].lastName}</a>
          </Link>
        </div>

      {user_id === sender_id && <button style={{position: 'absolute', top: '5px', right: '5px'}}>edit post</button>}

      </div>

      <div>{post}</div>
      <div className="coment-container">
        <div>comments...</div>
        <div>comments...</div>
        <div>comments...</div>
      </div>
      <form onSubmit={comment}>
        <input type="text" />
        <input type="submit" value="comment" />
      </form>
    </div>
  </>
}

export default Post
