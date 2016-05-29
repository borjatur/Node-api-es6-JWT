import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import config from './config/config';

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

let api = userRoutes(express);

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server running and listening in http://localhost:${port}`);
});
