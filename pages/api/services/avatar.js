import colors from 'colors'

// mongoose 
import connectDB from '../../../utils/connectDB'
import User from '../../../models/User'

export default connectDB(async (req, res) => {

  const { user_id, profileAvatar } = req.body;

  console.log(profileAvatar);

  try {
    const user = await User.findOneAndUpdate({_id: user_id}, {profileAvatar}, {new: true});

    console.log(user);

    if (user) res.json({ success: true, user });
    else res.status(400).json({ success: false });

    } catch (error) {
      console.log("failed to update avatar".bold.red);
      res.json({ success: false });
    }

})