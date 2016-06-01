import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config/config';
import router from './routes/index';

const port = process.env.PORT || 3000;

mongoose.connect(config.database, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to mongo database.');
  }
});

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running and listening in http://localhost:${port}`);
});
