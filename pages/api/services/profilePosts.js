import colors from 'colors'

// mongoose 
import connectDB from '../../../utils/connectDB'
import Post from '../../../models/Post'

export default connectDB(async (req, res) => {

  // account for these plz !page || !limit

  const { body } = req
  const { profile_id, page, limit } = body

  try {
    // FILTER ______

    const posts = await Post.find({ $or:[ {user_id: profile_id}, {profile_id} ]})
      // .select()
      .sort('-createdAt')
      .limit(+limit)
      .skip(+limit * +page)
    if (posts) res.json({success: true, posts})
    else res.json({success: false})
  } catch (error) {
    console.log("failed to get global posts".bold.red);
    res.json({success: false})
  }

  

})