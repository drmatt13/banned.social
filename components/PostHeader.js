import { useContext } from 'react'
import Link from 'next/link'

// components
import MiniUserImage from './MiniUserImage'

// context
import socialContext from '../utils/socialContext'

const PostHeader = ({ sender_id, reciever_id }) => {

  const { users } = useContext(socialContext)

  return <>

    <style jsx>{`
      .master-container {
        // background-color: #FFF8;
        padding: 15px 15px 0 15px;
        align-items: flex-start;
      }
      i {
        margin: 0 7.5px;
      }
      a:hover {
        text-decoration: underline;
      }
    `}</style>
    
    <div className="master-container f">

      <MiniUserImage profile_id={sender_id} />

      <div className="links">
        <Link href={`/redirect/${sender_id}`}>
          <a>{users[sender_id].firstName} {users[sender_id].lastName}</a>
        </Link> 
        {sender_id !== reciever_id && <>
          <i className="fas fa-angle-right" />
          <Link href={`/redirect/${reciever_id}`}>
          <a>{users[reciever_id].firstName} {users[reciever_id].lastName}</a>
          </Link>
        </>}
      </div>
      

    </div>

  </>
}

export default PostHeader
