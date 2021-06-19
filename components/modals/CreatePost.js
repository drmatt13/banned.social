import { useState } from 'react' 
import axios from 'axios'

const CreatePost = ({ profile_id, post, setPost }) => {

  const submitPost = async e => {
    e.preventDefault();
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "create post",
      profile_id,
      post
    }, { withCredentials: true });

    console.log(res.data);
    // if success shift post to []
    // else error
  }


  return <>
    <form onSubmit={submitPost}>
      <input type="text" value={post} onChange={e => setPost(e.target.value)} />
      <input type="submit" value="post" />
    </form>
  </>

}

export default CreatePost
