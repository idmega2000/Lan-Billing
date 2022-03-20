import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongooseConnect from 'database/config/mongooseConnect';
import envData from './configs/envData';
import v1Routes from './routes';
import { generalErrorHandler, notFoundHander } from './utilities/errorHandler';

const app = express();

const corsOptions = {
  credentials: true,
  methods: 'GET,PUT,PATCH,POST,DELETE',
};

mongooseConnect();

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false,
}));

app.use(express.json({
  limit: envData.MAX_FILE_SIZE
}));

app.use(v1Routes);

app.use(notFoundHander);
app.use(generalErrorHandler);

app.listen(envData.PORT, () => console.log(`App Listening on port ${envData.PORT}`));
export default app;
