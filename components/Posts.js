import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

// components
import Post from './Post'

// context
import socialContext from '../utils/socialContext'

const Posts = ({ from, profile_id }) => {

  const { users, user_id } = useContext(socialContext)

  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (from === "profile") fetchProfilePosts();
    else if (from === "global") fetchGlobalPosts();
    else if (from === "news") fetchNewsPosts();
  }, [])

  useEffect(() => {
    // console.log(posts);
  }, [posts])

  const updateUsers = async (fetchedPosts) => {
    const promiseUsers = {}
    await Promise.all(fetchedPosts.map(async post => {
      if (!users[post.user_id] && !promiseUsers[post.user_id]) {
        promiseUsers[post.user_id] = true
        await updateUser(post.user_id);
      }
      if (!users[post.profile_id] && !promiseUsers[post.profile_id]) {
        promiseUsers[post.profile_id] = true
        await updateUser(post.profile_id);
      }
    }))

    setPosts(posts.concat(fetchedPosts));
    setPage(page + 1)
  }

  const updateUser = async id => {
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "get user",
      profile_id: id
    }, { withCredentials: true });

    if (res.data.success) users[id] = res.data.user
  }

  const fetchNewsPosts = async () => { }


  const fetchGlobalPosts = async () => {
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "global posts",
      page,
      limit: 10
    }, { withCredentials: true });

    // console.log(res.data.posts);

    updateUsers(res.data.posts)





  }


  const fetchProfilePosts = async () => {
    const res = await axios.post(`${process.env.URL}/api/eventbus`, {
      service: "profile posts",
      profile_id,
      page,
      limit: 10
    }, { withCredentials: true });


    updateUsers(res.data.posts)


    // setPosts(posts.concat(res.data.posts));
    // setPage(page+1)

  }


  return <>
    {posts && posts.map((post, i) => (
      <Post
        key={i}
        sender_id={post.user_id}
        reciever_id={post.profile_id}
        post={post.post}
        url={post.url}
      />
    ))}
  </>
}

export default Posts
