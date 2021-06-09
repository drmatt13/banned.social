import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async (req, res) => {

  await dbConnect();

  const { method, body } = req;

  switch (method) {

    case 'GET':

      try {
        const users = await User.find();
        res.status(200).json({ users });
      } catch (error) {
        res.status(400).json({ success: false})
      }

      break;

    case 'POST':

      try {
        const user = await User.create(body)
        res.status(200).json({ success: true, user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      
      break;

    default:
      res.status(400).json({ success: false });
      break;

  }
}