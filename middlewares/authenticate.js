import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config';

export default (req, res, next) => {

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
};
