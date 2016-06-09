import User from '../models/user';
import Token from '../common/token';
import constants from '../constants/constants';

let userRoutes = {
    signup: (req, res) => {
      let user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      });

      let token = new Token(user).getToken();
      user.save((err) => {
        if(err) {
          res.send(err);
          return;
        }
        res.json({
          success: true,
          message: constants.CREATED_USER,
          token: token
        });
      });
    },

    login: (req, res) => {
      User.findOne({
        username: req.body.username
      }).select('name username password').exec((err, user) => {
        if(err) {
          throw err;
        }
        if(!user) {
          res.send({ message: constants.USER_NOT_EXITS });
        } else {
          let validPassword = user.comparePassword(req.body.password);
          if(!validPassword) {
            res.send({ message: constants.INVALID_PASS });
          } else {
            let token = new Token(user).getToken();
            res.json({
              success: true,
              message: constants.LOGIN_SUCCESS,
              token: token
            });
          }
        }
      });
    }
};

export default userRoutes;
