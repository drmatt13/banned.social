import colors from 'colors'

// mongoose 
import connectDB from '../../../utils/connectDB'
import User from '../../../models/User'

export default connectDB(async (req, res) => {

  const {user_id, profile_id} = req.body

  try {
    if (profile_id) {
      const user = await User.findById(profile_id)
      if (user) res.json({success: true, user})
      else res.json({success: false})
    } else {
      // console.log(user_id);
      const user = await User.findById(user_id);
      if (user) res.json({success: true, user})
      else res.json({success: false})
    }
    
  } catch (error) {
    console.log("user not found".bold.red);
    res.json({success: false});
  }

})