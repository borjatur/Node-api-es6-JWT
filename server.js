import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/index';
import mongodb from './database/mongodb';

const port = process.env.PORT || 3000;

mongodb.getConnection()
  .then((msg) => {
    console.log(msg);
    let app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use('/api', router);
    app.listen(port, () => {
      console.log(`Server running and listening in http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
