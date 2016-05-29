import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user';
import Token from '../common/token';
import config from '../config/config';

let userRoutes = (express) => {
  let api = express.Router();

  api.post('/signup', (req, res) => {
    let user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });

    let token = new Token(user).getToken();
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

  api.post('/login', (req, res) => {
    User.findOne({
      username: req.body.username
    }).select('name username password').exec((err, user) => {
      if(err) {
        throw err;
      }
      if(!user) {
        res.send({ message: 'User doesn´t exist.' });
      } else {
        let validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.send({ message: 'Invalid Password.' });
        } else {
          let token = new Token(user).getToken();
          res.json({
            success: true,
            message: "Successfuly login!",
            token: token
          });
        }
      }
    });
  });

  //private routes
  api.use((req, res, next) => {

    let token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if(token) {
      jsonwebtoken.verify(token, config.secretKey, (err, decoded) => {
        if(err) {
          res.status(403).send({
            success: false,
            message: 'Failed to authenticate user.'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({
        success: false,
        message: 'No Token Provided.'
      });
    }
  });

  api.get('/', (req, res) => {
    res.json({
      message: 'This information is private.'
    });
  });

  return api;
}

export default userRoutes;
