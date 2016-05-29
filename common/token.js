import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config.js';

export default class Token {
  constructor(user) {
    let secretKey = config.secretKey;
    this.token = jsonwebtoken.sign({
      id: user._id,
      name: user.name,
      username: user.username
    }, secretKey, {
      expiresIn: 1440
    });
  }

  getToken() {
    return this.token;
  }
}
