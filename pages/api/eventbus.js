import colors from 'colors'
import axios from 'axios'
import jwt from 'jsonwebtoken'

// user_id is not expected to be sent
// if it is sent it will be over-written via verify

// FORMAT
// const res = await axios.post(`${process.env.URL}/api/eventbus`, {
//   service: "get user",
//   data
// }, { withCredentials: true });


export default async (req, res) => {

  const { body, cookies } = req;

  // verify user_id
  try {
    let verify = jwt.verify(cookies.bearer, process.env.BEARER_SECRET)
    req.body.user_id = verify.user_id
  } catch (error) {
    req.body.user_id = null
  }

  const { firstName, lastName, email, password, user_id, profile_id, profileAvatar, post, url, page, limit } = body;

  let token_id = user_id ? user_id : "No Token"
  console.log(
    `${token_id}`.bold.yellow,
    "->".bold.red,
    `"${body.service}"`.bold.green,
  )

  // Service Switch
  switch (body.service) {

    // *****************************
    // *******    MISC   ***********
    // *****************************

    // Get OG METADATA
    // Unprotected
    // returns og metadata for a link
    // {service: "get og", url}
    case "get og":

      if (!url) res.json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/ogMetadata`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }

      break;

    // *****************************
    // *******  USER DB  ***********
    // *****************************


    // Get user
    // Unprotected
    // returns myself or optional profile_id, returns if profile or not
    // {service: "get user", profile_id}
    case "get user":

      if (!profile_id) {
        const resp = await axios.post(`${process.env.URL}/api/services/user`, body)
        if (resp.data.success) res.json({ success: true, profile: true, user: resp.data.user })
        else res.json({ success: false })
      } else {
        const resp = await axios.post(`${process.env.URL}/api/services/user`, body)
        if (resp.data.success) {
          res.json({ success: true, user: resp.data.user })
        }
        else res.json({ success: false })
      }

      break;


    // Login
    // Unprotected
    // returns jwt
    // {service: "login", email, password}
    case "login":

      console.log(process.env.URL, body);

      // check proper fields sent
      if (!email || !password) res.json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/login`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }

      break;


    // Register user
    // Unprotected
    // registers a user
    // {service: "register", email, password}
    case "register":

      // check proper fields sent
      if (!firstName || !lastName || !email || !password) res.json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/register`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }

      break;


    // Delete user
    // protected
    // deletes a user
    // {service: "delete user", email, password}
    case "delete user":
      break;


    // Update User Avatar
    // protected
    // Updates a users avatar 
    // {service: "update avatar", avatar: NUMBER}
    case "update avatar":

      if (!user_id || !profileAvatar) res.status(400).json({ success: false })
      else {
        const resp = await axios.patch(`${process.env.URL}/api/services/avatar`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }


      break;


    // *****************************
    // *******  POST DB  ***********
    // *****************************

    // Create post
    // protected
    // create a post, profile_id optional
    // {service: "create post", profile_id, post}
    case "create post":
      if (!user_id || (!post && !url)) res.status(400).json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/post`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }
      break;


    // Patch post
    // protected
    // edit a post
    // {service: "patch post", post_id, post}
    case "patch post":
      break;


    // Delete post
    // protected
    // delete a post
    // {service: "delete post", post_id, post}
    case "delete post":
      break;


    // FIX THESE TO HAVE DEFAULTS FOR PAGE + LIMIT ************

    // Get global posts
    // protected
    // get posts in decending order from all users
    // {service: "global posts"}
    case "global posts":
      if (!user_id) res.status(400).json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/globalPosts`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }

      break;


    // Get profile posts
    // protected
    // get posts in decending order from current profile users
    // {service: "global posts", profile_id}
    case "profile posts":
      if (!user_id || !profile_id) res.status(400).json({ success: false })
      else {
        const resp = await axios.post(`${process.env.URL}/api/services/profilePosts`, body)
        if (resp.data.success) res.json(resp.data)
        else res.json({ success: false })
      }

      break;

    // *****************************
    // *******  NEWS DB  ***********
    // *****************************

    // Post comment
    // protected
    // posts a comment
    // {service: "delete user", email, password}
    // case "delete user":
    //   break;


    // *****************************
    // *******  DEFAULT  ***********
    // *****************************


    default:
      console.log("Incorrect Service Name".bold.red)
      res.status(200).json({ success: false })
      break;
  }

}