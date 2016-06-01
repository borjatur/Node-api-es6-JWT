import User from '../models/user';
import Token from '../common/token';

let userRoutes = {
    signup: (req, res) => {
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
    },

    login: (req, res) => {
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
    }
};

export default userRoutes;
