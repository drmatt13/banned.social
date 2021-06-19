import colors from 'colors'

// mongoose 
import connectDB from '../../../utils/connectDB'
import Post from '../../../models/Post'

export default connectDB(async (req, res) => {

  const { body, method } = req; 

  switch (method) {

    case "POST":

      try {

        // who is user_id posting to? themselves or someone else
        body.profile_id = body.profile_id || body.user_id

        // if profile_id check if it exists
        // ********
        // 
        // 
        //  *********

        const post = await Post.create(body);

        if (post) res.json({ success: true, post });
        else res.status(400).json({ success: false });

        } catch (error) {
          console.log("failed to create post".bold.red);
          res.json({ success: false });
        }
      break;

    case "PATCH":
      break;

    case "DELETE":
      break;

    default:
      res.json({success: false});
      break;
  }

})