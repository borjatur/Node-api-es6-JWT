import mongoose from 'mongoose';
import config from '../config/config';

//https://gist.github.com/k33g/9960d96ec5f7d78a67e4

let mongodb = {
  getConnection: () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(config.database, function(err) {
        if(err) {
          reject(err);
        } else {
          resolve('Connected to mongo database.');
        }
      });
    })
  }
}

export default mongodb;
