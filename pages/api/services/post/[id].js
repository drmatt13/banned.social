import colors from 'colors'

// mongoose 
import connectDB from '../../../../utils/connectDB'
import Post from '../../../../models/Post'

export default connectDB(async (req, res) => {

  const { id } = req.query

  try {
    const post = await Post.findById(id)
    if (post) res.json({ success: true, post })
    else res.status(400).json({ success: false })
  } catch (error) {
    console.log("failed to find post".bold.red)
    res.json({ success: false })
  }

})