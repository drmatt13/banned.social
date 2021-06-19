import { useContext } from 'react'

// components
import PostHeader from './PostHeader'

// context
import socialContext from '../utils/socialContext'

const Post = ({ sender_id, reciever_id, post }) => {

  const { user_id } = useContext(socialContext)

  const comment = e => {
    e.preventDefault()
  } 

  return <>
    <style jsx>{`
      .post-container {
        color: #DDD;
        background-color: rgb(51, 51, 54);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        // min-height: 120px;
        max-height: 400px;
        margin-top: 20px;
        border-radius: 10px;
      }
      .post-contents {
        padding: 15px;
        font-size: large;
      }
    `}</style>
    <div className="post-container fade-in">
      <div style={{position: 'relative'}}>

        <PostHeader sender_id={sender_id} reciever_id={reciever_id} />

        {/* EDIT POST */}
        {user_id === sender_id && <i className="far fa-edit pointer" style={{position: 'absolute', top: '15px', right: '15px'}} />}

      </div>

      <div className="post-contents">
        {post}
      </div>

      <div className="post-og">

      </div>

      <div className="post-footer">

      </div>

      {/* <form onSubmit={comment}>
        <input type="text" />
        <input type="submit" value="comment" />
      </form> */}

    </div>
  </>
}

export default Post
