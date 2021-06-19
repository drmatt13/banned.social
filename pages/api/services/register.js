import colors from 'colors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// mongoose 
import connectDB from '../../../utils/connectDB'
import User from '../../../models/User'

export default connectDB(async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body)
    if (user) {
      const user_id = user._id;
      const bearer = jwt.sign({user_id}, process.env.BEARER_SECRET);
      res.json({ success: true, bearer, user_id });
    } else res.json({ success: false });
  } catch (error) {
    console.log("registration error".bold.red);
    res.json({ success: false });
  }

})

