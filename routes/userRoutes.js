import User from '../models/user';
import Token from '../common/token';

let userRoutes = (express) => {
  let api = express.Router();

  api.post('/signup', (req, res) => {
    let user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    let token = new Token(user);
    user.save((err) => {
      if(err) {
        res.send(err);
        return;
      }
      res.json({
        success: true,
        message: 'User has been created!',
        token: token
      });
    });
  });

  return api;
}

export default userRoutes;
